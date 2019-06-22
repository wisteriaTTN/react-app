import React, { Component } from 'react';
import '../../App.scss';
import { isEmpty } from '../../Common/common-ui';
import { URL } from '../../Common/constant';


function ArticlesList(list) {

  if (!isEmpty(list)) {
    return list.articles.map((item) => (
      <div key={item.slug} className="profile-listArticle-item">
        <div className="profile-article-title">{item.title}</div>
        <div className="profile-article-desc">"{item.description}"</div>
        <div className="profile-article-body">{item.body}</div>
      </div>
    )
    );
  }
  else {
    return (<div></div>);
  }
}

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      profile: props.profile
    }
    this.changeValueInput = this.changeValueInput.bind(this);
  }

  changeValueInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return { profile: { ...this.state.profile, [name]: value } };
      }
    )
  }

  render() {
    if (!isEmpty(this.state.profile)) {
      return (
        <div className={`modal ${this.state.show === true ? 'modal-active': ''}`}>
          <form id="update-profile">
            <h2>Update User Profile</h2>
            <div className="form-input">
              <label>Username</label>
              <input placeholder="Username" name="username" value={this.state.profile.username} onChange={this.changeValueInput} />
            </div>
            <div className="form-input">
              <label>Email</label>
              <input placeholder="Email" name="email" value={this.state.profile.email} onChange={this.changeValueInput} />
            </div>
          </form>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

var username = '';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      articlesList: {},
      showModal: false
    }
    username = this.props.match.params.username;
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      };

      if (username) {
        Promise.all([
          fetch(URL + `/profiles/${username}`, requestOptions),
          fetch(URL + `/articles?author=${username}`)
        ])
          .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
          .then(([data1, data2]) => this.setState({
            user: data1.profile,
            articlesList: data2
          }))
          .catch((error) => {
            console.log(error.message);
          });
      }
      else {
        Promise.all([
          fetch(URL + `/user`, requestOptions),
          fetch(URL + `/articles?author=${localStorage.getItem('username')}`)
        ])
          .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
          .then(([data1, data2]) => this.setState({
            user: data1.user,
            articlesList: data2
          }));
      }
    }
    else {
      this.props.history.push('/');
    }
  }

  updateUser(event) {
    this.setState({
      showModal: true
    });
    console.log(this.state.showModal);
  }

  render() {
    if (!isEmpty(this.state.user)) {
      return (
        <div className="container">
          <div className="profile">
            <div className="profile-cover">
              <div className="profile-cover-infor">
                <div className="profile-cover-image">
                  <img alt="" src={this.state.user.image} />
                </div>
                <div className="profile-cover-user">
                  <span>{this.state.user.username}</span>
                </div>
              </div>
              <div className="profile-cover-editButton">
                <button>
                  <i className="fa fa-heart"></i>
                  <span>Like</span>
                </button>
                <button>
                  <i className="fa fa-hand-o-right"></i>
                  <span>Follow</span>
                </button>
                <button onClick={this.updateUser}>
                  <i className="fa fa-edit"></i>
                  <span>Edit Profile Setting</span>
                </button>
              </div>
            </div>
            <div className="profile-listArticle">
              <div className="profile-listArticle-title">Articles({this.state.articlesList && this.state.articlesList.articlesCount})</div>
              <ArticlesList articles={this.state.articlesList.articles}></ArticlesList>
            </div>
          </div>
          <Modal show={this.state.showModal} profile={this.state.user}></Modal>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

export default Profile;
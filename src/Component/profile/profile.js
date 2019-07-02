import React, { Component } from 'react';
import '../../App.scss';
import { isEmpty } from '../../Common/common-ui';
import { URL } from '../../Common/constant';
import { callAPI } from '../../Common/common-ui';


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

var username = '';
// var body = {
//   user: {
//     email: "",
//     bio: "",
//     image: "",
//     username: "",
//     password: ""
//   }
// }
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      articlesList: {},
      body: {}
    }
    username = this.props.match.params.username;
    this.changeValueInput = this.changeValueInput.bind(this);
    this.updateUser = this.updateUser.bind(this);
    //this.getDataToUpdate = this.getDataToUpdate.bind(this);
    this.cancel = this.cancel.bind(this);
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
            body: data1,
            articlesList: data2,
          }));
      }
    }
    else {
      this.props.history.push('/');
    }
  }

  changeValueInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return { body: {user : { ...this.state.user, [name]: value } }};
    }
    )
  }

  cancel(event) {
    this.setState({
      body: {user: {...this.state.user}}
    }
    )
  }

  updateUser(event) {
    event.preventDefault();

    callAPI('PUT', this.state.body, `${URL}/user`)
      .then(data => {
        this.setState({
          user: data.user
        });
        this.cancel();
      });
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
                <button data-toggle="modal" data-target="#openUpdateProfile" onClick={this.getDataToUpdate}>
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

          <div className="modal fade" id="openUpdateProfile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form id="update-profile" onSubmit={this.updateUser}>
                    <div className="form-group">
                      <label className="col-form-label">Username</label>
                      <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.body.user.username} onChange={this.changeValueInput} />
                    </div>
                    <div className="form-group">
                      <label className="col-form-label">Email</label>
                      <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.body.user.email} onChange={this.changeValueInput} />
                    </div>
                    <div className="form-group">
                      <label className="col-form-label">Password</label>
                      <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.body.user.password} onChange={this.changeValueInput} />
                    </div>
                    <div className="form-group">
                      <label className="col-form-label">Short bio about you</label>
                      <textarea className="form-control" placeholder="Tell something yourself" name="bio" value={this.state.body.user.bio} onChange={this.changeValueInput}></textarea>
                    </div>
                    <div className="form-group">
                      <label className="col-form-label">Image link</label>
                      <input type="text" className="form-control" placeholder="Image Link" name="image" value={this.state.body.user.image} onChange={this.changeValueInput} />
                    </div>
                    <div className="btn-group-right">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.cancel}>Cancel</button>
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

export default Profile;
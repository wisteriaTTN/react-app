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
var username = '';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      articlesList: {}
    }
    username = this.props.match.params.username;
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
          fetch(URL + `/${username}`, requestOptions),
          fetch(URL + `/articles?author=${username}`)
        ])
          .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
          .then(([data1, data2]) => this.setState({
            user: data1.user,
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

  render() {
    if (!isEmpty(this.state.user)) {
      return (
        <div className="container">
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
              <button>
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
      );
    }
    else {
      return (<div></div>);
    }
  }
}

export default Profile;
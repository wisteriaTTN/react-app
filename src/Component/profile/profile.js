import React, { Component } from 'react';
import '../../App.scss';
import { callAPI } from '../../Common/common-ui';
import { URL } from '../../Common/constant';

var username = '';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    username = this.props.match.params.username;
  }

  componentDidMount() {
    if(username){

    }
    else {
      callAPI('GET', null, `${URL}/user`)
      .then(profile => {
        this.setState({
          user: profile.user
        });
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="profile-cover">
          <div className="profile-cover-infor">
            <div className="profile-cover-image">
              <img alt="" src={this.state.user.image}/>
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
        <div className="profile-listArticle"></div>
      </div>
    );
  }
}

export default Profile;
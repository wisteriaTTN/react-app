import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../App.scss';

function logout() {
  localStorage.clear();
  window.location.reload();
}

class Navigation extends Component {
  render() {
    if(localStorage.getItem("token")){
      return (
        <nav>
          <ul>
            <li>
              <div className="nav-dropdown">
                <span> 
                  <i className="fa fa-cog fa-lg"></i>
                </span>
                <div className="nav-dropdown-content">
                  <a href="#profile">Profile</a>
                  <a href="#logout" onClick={logout}>Log out</a>
                </div>
              </div> 
            </li>
            <li>
              <Link to={`/article`}>NEW ARTICLE</Link>
            </li>
            <li>
            <Link to={`/home`}>HOME</Link>
            </li>
          </ul>
        </nav>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

export default Navigation;
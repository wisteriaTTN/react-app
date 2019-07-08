import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../App.scss';

function logout() {
  localStorage.clear();
  window.location.reload();
}

class Navigation extends Component {
  render() {
    if (localStorage.getItem('token')) {
      return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#brand">Blog Real World</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={`/home`}>Home<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/article/createNew`}>New Article</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#dropdown" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={`/profiles/user`}>
                    <i className="fa fa-user"></i>
                    <span>Profile</span>
                  </Link>
                  <a className="dropdown-item" href="#logout" onClick={logout}>
                    <i className="fa fa-sign-out"></i>
                    <span>Log out</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

export default Navigation;
import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Component/home/home';
import Article from './Component/article/article';
import Login from './Component/login/login';
import Navigation from './Component/navigation/navigation';
import Profile from './Component/profile/profile';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false
    };

    this.switchLogin = this.switchLogin.bind(this);
  }

  switchLogin() {
    let isLogin = localStorage.getItem('token') ? true : false;
    this.setState({
      isLogin
    });
  }

  componentDidMount() {
    this.switchLogin();
  }


  render() {
    return (
      <Router>
        <div className='App'>
          {this.state.isLogin && <Navigation></Navigation>}
          <Route exact path='/' component={() => <Login switchLogin={this.switchLogin} />}></Route>
          <Route path='/home' component={Home}></Route>
          <Route path='/article/:slug' component={Article}></Route>
          <Route path='/profile' component={Profile}></Route>
        </div>
      </Router>
    )
  }
}

export default App;

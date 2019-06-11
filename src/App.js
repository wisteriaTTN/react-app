import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Component/home/home';
import Article from './Component/article/article';
import Login from './Component/login/login';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <div className="nav-dropdown">
                <span> 
                  <i className="fa fa-cog fa-lg"></i>
                </span>
                <div className="nav-dropdown-content">
                  <a href="#link1">Link 1</a>
                  <a href="#link2">Link 2</a>
                  <a href="#link3">Link 3</a>
                </div>
              </div> 
            </li>
            <li><a href="#home">HOME</a></li>
            <li><a href="#news">NEWS</a></li>
            <li><a href="#contact">CONTACTS</a></li>
          </ul>
        </nav>
        <Route exact path="/" component={ Login }></Route>
        <Route path="/home" component={ Home }></Route>
        <Route path='/article/:slug' component={ Article }></Route>  
      </div>
    </Router>
  );
}

export default App;

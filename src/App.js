import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Component/home/home';
import Article from './Component/article/article';
import Login from './Component/login/login';
import Navigation from './Component/navigation/navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation></Navigation>
        <Route exact path="/" component={ Login }></Route>
        <Route path="/home" component={ Home }></Route>
        <Route path='/article/:slug' component={ Article }></Route>  
      </div>
    </Router>
  );
}

export default App;

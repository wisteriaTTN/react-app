import React, { Component } from 'react';
import './login.scss';
import { URL } from '../../Common/constant';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const user = {"user": { email: this.state.email, password: this.state.password }};

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    console.log(requestOptions);
    event.preventDefault();
    fetch(`${URL}/users/login`, requestOptions)
    .then(res => {
      if(!res.ok) throw new Error(res.status);
      else return res.json();
    })
    .then(data => {
      if (data) {
        localStorage.setItem('token', JSON.stringify(data.user.token));
        
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({ message: "Wrong email or password" });
    });;
  
  }

  render() {
    return (
      <div className="login-page" onSubmit={this.handleSubmit}>
        <form onSubmit= { this.props.onSubmit } className="login-form">
          <h2>Login</h2>
          <div className="form-input">
            <input type='text' name='email' placeholder='Email' onChange={this.handleChange}  value={this.state.email}/>
          </div>
          <div className="form-input">
            <input type='password' name='password' placeholder='Password' onChange={this.handleChange}  value={this.state.password}/>
          </div>
          <button type="submit"> Sign In</button>
          <div className="error-message">{this.state.message}</div>
        </form>
      </div>
    );
  }
}

export default Login;

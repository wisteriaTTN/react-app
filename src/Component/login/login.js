import React, { Component } from 'react';
import '../../App.scss';
import { URL } from '../../Common/constant';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.history.push('/home');
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = { user: { email: this.state.email, password: this.state.password } };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch(`${URL}/users/login`, requestOptions)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        else return res.json();
      })
      .then(data => {
        if (data) {
          localStorage.setItem('token', data.user.token);
          localStorage.setItem('imageUser', data.user.image);
          localStorage.setItem('username', data.user.username);
          this.props.switchLogin();
          this.props.history.push('/home');
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message === '422') {
          this.setState({ message: 'Wrong email or password' });
        }
        else {
          this.setState({ message: 'Please check your network' });
        }
      });

  }

  render() {
    return (
      <div className="login-page" id="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <h2><b>Login</b></h2>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
          <div className="error-message">{this.state.message}</div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);

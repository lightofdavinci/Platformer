import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  className="form-field"
                  type="text"
                  placeholder="username"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  className="form-field"
                  type="text"
                  placeholder="password"
                />
              </div>
              <input className="form-btn" type="submit" value="LOGIN" />
              <p className="form-toggle">
                Do not have an account ? <Link to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

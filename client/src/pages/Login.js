import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { login } from '../actions';
import { connect } from 'react-redux';

class Login extends Component {
  handleFormSubmit({ email, password }) {
    this.props.login(email, password, this.props.history);
  }

  renderAlert() {
    if (!this.props.error) return null;
    return (
      <h3 style={{ color: '#444', textAlign: 'center' }}>{this.props.error}</h3>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <form
              className="form"
              onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
            >
              <fieldset className="form-group">
                <label>Username:</label>
                <Field
                  className="form-field"
                  name="email"
                  component="input"
                  type="text"
                  placeholder="username"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Password:</label>
                <Field
                  className="form-field"
                  name="password"
                  component="input"
                  type="password"
                  placeholder="password"
                />
              </fieldset>
              <button className="form-btn" action="submit">
                LOGIN
              </button>
              <p className="form-toggle">
                Do not have an account ? <Link to="/register">Sign Up</Link>
              </p>
              {this.renderAlert()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated
  };
};

Login = connect(mapStateToProps, { login })(Login);

export default reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(Login);

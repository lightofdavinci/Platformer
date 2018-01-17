import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { register } from '../actions';

import '../styles/Form.css';

class Register extends Component {
  handleFormSubmit({ username, password }) {
    this.props.register(
      username.replace(/^\s+|\s+$/g, ''),
      password,
      this.props.history
    );
  }

  renderAlert = () => {
    if (!this.props.error) return null;
    return (
      <h3 style={{ color: '#444', textAlign: 'center' }}>{this.props.error}</h3>
    );
  };

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
                  name="username"
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
                Sign Up
              </button>
              <p className="form-toggle">
                Have an account ? <Link to="/login">Login</Link>
              </p>
            </form>
            {this.renderAlert()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

Register = connect(mapStateToProps, { register })(Register);

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password']
})(Register);

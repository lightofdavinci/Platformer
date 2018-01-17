import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/register');
      }
    }

    render() {
      if (!this.props.authenticated) return <div>No Auth</div>;
      return <ComposedComponent />;
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfAuthenticated } from '../../actions';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      this.props.checkIfAuthenticated();
    }

    render() {
      if (!this.props.authenticated)
        return (
          <div className="auth-err">
            You are not authorized to access this web page. <br />Please verify
            you are authorized and re-enter your User ID and Password.
          </div>
        );
      return <ComposedComponent history={this.props.history} />;
    }

    componentDidMount() {
      setTimeout(() => {
        if (!this.props.authenticated) {
          this.props.history.push('/register');
        }
      }, 5000);
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps, { checkIfAuthenticated })(
    RequireAuthentication
  );
};

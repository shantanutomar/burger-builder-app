// /* global gapi */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount = () => {
    if (this.props.isGoogleSignedIn) {
      this.props.googleSignOut();
    } else {
      this.props.onLogout();
    }
  };
  render() {
    return <Redirect to="/" />;
  }
}

var mapStateToProps = state => {
  return {
    isGoogleSignedIn: state.authReducer.isGoogleSignedIn
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout()),
    googleSignOut: () => dispatch(actionCreators.googleSignOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

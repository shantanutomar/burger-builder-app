// /* global gapi */
import React, { Component } from "react";
import Classes from "./LoginButton.css";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import { firbaseApp, googleProvider } from "../../firebaseAppConfig";
// import firebase from "firebase";

class LoginButton extends Component {
  onSignIn = () => {
    firbaseApp
      .auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        this.props.onGoogleSignedIn(result);
      })
      .catch(error => {
        alert("User was not able to login using Google.");
      });
  };

  render() {
    return (
      <div>
        <button
          className={[Classes.loginBtn, Classes.loginBtnGoogle].join(" ")}
          onClick={this.onSignIn}
        >
          Login with Google
        </button>{" "}
      </div>
    );
  }
}

var mapDispatchToProps = dispatch => {
  return {
    onGoogleSignedIn: user => dispatch(actionCreators.googleLoggedIn(user))
  };
};

export default connect(null, mapDispatchToProps)(LoginButton);

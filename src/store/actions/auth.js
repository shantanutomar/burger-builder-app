// /* global gapi */

import * as actionTypes from "./actionTypes";
import axios from "../../AxiosOrders";
import * as errorTypes from "./errorTypes";
// import firebase from "firebase";
import { firbaseApp } from "../../firebaseAppConfig";

var authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

var authSuccess = (idToken, userId, isGoogleSignedIn) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payLoad: {
      idToken: idToken,
      userId: userId,
      isGoogleSignedIn: isGoogleSignedIn
    }
  };
};

var authFailed = err => {
  return {
    type: actionTypes.AUTH_FAILED,
    payLoad: { error: err }
  };
};

export var googleSignOut = () => {
  firbaseApp
    .auth()
    .signOut()
    .then(res => {
      console.log("User logged out");
    })
    .catch(err => {
      console.log(err);
      alert("User was not logged out properly.");
    });

  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("localId");

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export var logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("localId");

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

var authSessionTimeout = sessionTimeoutInterval => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, sessionTimeoutInterval * 1000);
  };
};

export var auth = (email, password, authMode) => {
  return dispatch => {
    let authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    dispatch(authStart());
    let url = "";
    if (authMode) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDPn-L6l7G7vy5sqRfKcUN6u8S62Ae5w6Q";
    } else {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDPn-L6l7G7vy5sqRfKcUN6u8S62Ae5w6Q";
    }
    axios
      .post(url, authData)
      .then(response => {
        let expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("localId", response.data.localId);
        let isGoogleSignedIn = false;

        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.localId,
            isGoogleSignedIn
          )
        );
        dispatch(authSessionTimeout(response.data.expiresIn));
      })
      .catch(err => {
        switch (err.response.data.error.message) {
          case "EMAIL_NOT_FOUND":
            alert(errorTypes.EMAIL_NOT_FOUND);
            break;
          case "INVALID_PASSWORD":
            alert(errorTypes.INVALID_PASSWORD);
            break;
          case "USER_DISABLED":
            alert(errorTypes.USER_DISABLED);
            break;
          case "EMAIL_EXISTS":
            alert(errorTypes.EMAIL_EXISTS);
            break;
          case "OPERATION_NOT_ALLOWED":
            alert(errorTypes.OPERATION_NOT_ALLOWED);
            break;
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
            alert(errorTypes.TOO_MANY_ATTEMPTS_TRY_LATER);
            break;
          case "INVALID_EMAIL":
            alert(errorTypes.INVALID_EMAIL);
            break;
          default:
            alert(err.response.data.error.message);
        }
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};

export var autoLoginOnRefresh = () => {
  return dispatch => {
    let idToken = localStorage.getItem("idToken");
    if (!idToken) {
      dispatch(logout());
    } else {
      let expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        let localId = localStorage.getItem("localId");
        dispatch(authSuccess(idToken, localId));
        dispatch(
          authSessionTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export var onAuthStateChange = () => {
  return dispatch => {
    firbaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("User is still logged in");
        localStorage.setItem(
          "idToken",
          "jsXQsJrSQX3oksT8JiX3FfUNvxr7lf1tkaFItkqd"
        );
        localStorage.setItem("localId", user.uid);
        let isGoogleSignedIn = true;

        dispatch(
          authSuccess(
            "jsXQsJrSQX3oksT8JiX3FfUNvxr7lf1tkaFItkqd",
            user.uid,
            isGoogleSignedIn
          )
        );
      } else {
        console.log("User has been signed out");
        dispatch(googleSignOut());
      }
    });
  };
};

export var googleLoggedIn = user => {
  return dispatch => {
    localStorage.setItem("idToken", "jsXQsJrSQX3oksT8JiX3FfUNvxr7lf1tkaFItkqd");
    localStorage.setItem("localId", user.user.uid);
    let isGoogleSignedIn = true;
    console.log("User logged In");

    dispatch(
      authSuccess(
        "jsXQsJrSQX3oksT8JiX3FfUNvxr7lf1tkaFItkqd",
        user.user.uid,
        isGoogleSignedIn
      )
    );
  };
};

import * as actionTypes from "./actionTypes";
import axios from "../../AxiosOrders";
import * as errorTypes from "./errorTypes";

var authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

var authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payLoad: {
      idToken: idToken,
      userId: userId
    }
  };
};

var authFailed = err => {
  return {
    type: actionTypes.AUTH_FAILED,
    payLoad: { error: err }
  };
};

var logout = () => {
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
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
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
          default:
            alert(err.response.data.error.message);
        }
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};

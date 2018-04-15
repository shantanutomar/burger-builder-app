import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

var initState = {
  loading: false,
  idToken: null,
  userId: null,
  error: null
};

var authStart = (state, action) => {
  return updateObject(state, { loading: true });
};

var authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    idToken: action.payLoad.idToken,
    userId: action.payLoad.userId,
    error: null
  });
};
var authFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payLoad.error
  });
};

var authLogout = (state, action) => {
  return updateObject(state, {
    idToken: null,
    userId: null
  });
};

var reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout();
    default:
      return state;
  }
};

export default reducer;
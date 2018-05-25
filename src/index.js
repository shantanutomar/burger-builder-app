import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerBuilderReducer from "../src/store/reducers/burgerBuilder";
import orderReducer from "../src/store/reducers/orderReducer";
import authReducer from "../src/store/reducers/auth";
import thunk from "redux-thunk";

// import StaticRouter from "react-router-dom/StaticRouter";

// NODE_ENV is environment variable. We check this varaibale so that the Redux is only available
// during development mode and not in prodcution so that anyone is not able to see our state using
// redux tool
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

let rootReducer = combineReducers({
  burgerBuilderReducer: burgerBuilderReducer,
  orderReducer: orderReducer,
  authReducer: authReducer
});

var store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

var app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

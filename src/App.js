import React, { Component } from "react";
import Layout from "../src/hoc/Layout/Layout";
import BurgerBuilder from "../src/containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
// import Orders from "../src/containers/Orders/Orders";
import Logout from "../src/containers/Auth/Logout";
// import Auth from "../src/containers/Auth/Auth";
import * as actionCreators from "../src/store/actions/index";
import { connect } from "react-redux";
import AsyncComponent from "../src/hoc/asyncComponent";

//lazy loading concept
var AsyncCheckout = AsyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

var AsyncOrders = AsyncComponent(() => {
  return import("../src/containers/Orders/Orders");
});

var AsyncAuth = AsyncComponent(() => {
  return import("../src/containers/Auth/Auth");
});

class App extends Component {
  componentDidMount = () => {
    this.props.onAutoLogin();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.idToken !== null
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actionCreators.autoLoginOnRefresh())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

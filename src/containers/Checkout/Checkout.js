import React, { Component } from "react";

import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";

class Checkout extends Component {
  checkoutContinuedHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-details");
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let checkoutSummary = <Redirect to="/" />;
    if (this.props.ingredients) {
      let orderSubmittedRedirect = this.props.orderSubmitted ? (
        <Redirect to="/" />
      ) : null;
      checkoutSummary = (
        <div>
          {orderSubmittedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.url + "/contact-details"}
            component={ContactData}
          />
        </div>
      );
    }

    return checkoutSummary;
  }
}

var mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    orderSubmitted: state.orderReducer.orderSubmitted
  };
};

export default connect(mapStateToProps)(Checkout);

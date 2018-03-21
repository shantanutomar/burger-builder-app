import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Classes from "./OrderSummary.css";
import Button from "../UI/Button/Button";

class OrderSummary extends Component {
  //This can still be stateless component
  componentWillUpdate = () => {};

  render() {
    var ingredientsSummary = Object.keys(this.props.ingredients).map(ele => {
      return (
        <li key={ele}>
          <span className={Classes.Capitalize}>{ele}:</span>{" "}
          {this.props.ingredients[ele]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>The Delicious burger has below ingredients :</p>
        <ul>{ingredientsSummary}</ul>
        <h4>The Total Price is : ${this.props.totalPrice.toFixed(2)}</h4>
        <p>Do you want to purchase ?</p>
        <Button onClicked={this.props.purchaseCancel} btnType="Success">
          CANCEL
        </Button>
        <Button onClicked={this.props.purchaseContinue} btnType="Danger">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;

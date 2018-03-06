import React from "react";
import Aux from "../../hoc/Aux";
import Classes from "./OrderSummary.css";
import Button from "../UI/Button/Button";

var OrderSummary = props => {
  var ingredientsSummary = Object.keys(props.ingredients).map(ele => {
    return (
      <li key={ele}>
        <span className={Classes.Capitalize}>{ele}:</span>{" "}
        {props.ingredients[ele]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>The Delicious burger has below ingredients :</p>
      <ul>{ingredientsSummary}</ul>
      <p>Do you want to purchase ?</p>
      <Button onClicked={props.purchaseCancel} btnType="Success">
        CANCEL
      </Button>
      <Button onClicked={props.purchaseContinue} btnType="Danger">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;

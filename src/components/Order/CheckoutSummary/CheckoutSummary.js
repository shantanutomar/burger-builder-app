import React from "react";
import Classes from "./CheckoutSummary.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

var CheckoutSummary = props => {
  return (
    <div className={Classes.CheckoutSummary}>
      <h1> Hope the Burger tastes well !!</h1>
      <Burger ingredients={props.ingredients} />
      <Button btnType="Danger" onClicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" onClicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;

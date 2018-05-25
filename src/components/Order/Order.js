import React from "react";
import Classes from "./Order.css";
import Button from "../UI/Button/Button";

var Order = props => {
  var ingredientsArray = [];
  for (var ele in props.ingredients) {
    ingredientsArray.push({
      name: ele,
      qty: props.ingredients[ele]
    });
  }

  var finalIngredients = ingredientsArray.map(ele => {
    return (
      <div key={ele.name} className={Classes.span}>
        <span>
          {ele.name} : {ele.qty}
        </span>
      </div>
    );
  });

  return (
    <div className={Classes.Order}>
      <p>Name : {props.name}</p>
      <p>Ingredients : </p>
      {finalIngredients}
      <p>Price : USD {props.price.toFixed(2)}</p>
      <p>Ordered On : {props.orderedOn}</p>
      <Button btnType="OrderDelete" onClicked={props.onDeleteHandler}>
        DELETE ORDER
      </Button>
    </div>
  );
};
export default Order;

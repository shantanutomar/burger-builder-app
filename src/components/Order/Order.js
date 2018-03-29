import React from "react";
import Classes from "./Order.css";

var Order = props => {
  console.log(props.ingredients);
  var ingredientsArray = [];
  for (var ele in props.ingredients) {
    ingredientsArray.push({
      name: ele,
      qty: props.ingredients[ele]
    });
  }
  console.log(ingredientsArray);

  var finalIngredients = ingredientsArray.map(ele => {
    return (
      <span key={ele.name}>
        {ele.name} : {ele.qty}
      </span>
    );
  });

  return (
    <div className={Classes.Order}>
      <p>Ingredients : {finalIngredients}</p>
      <p>Price : USD {props.price.toFixed(2)}</p>
    </div>
  );
};
export default Order;

import React from "react";
import Classes from "./Burger.css";
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

var Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((prev, curr) => {
      return curr.concat(prev);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding Ingredients!!</p>;
  }

  return (
    <div className={Classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;

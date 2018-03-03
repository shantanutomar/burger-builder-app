import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICE = {
  meat: 1.2,
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.9
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon: 0
    },
    totalPrice: 0
  };

  addIngredientHandler = type => {
    let oldIngredientCount = this.state.ingredients[type];
    let newIngredientCount = oldIngredientCount + 1;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newIngredientCount;

    let oldPrice = INGREDIENT_PRICE[type];
    let newPrice = oldPrice + INGREDIENT_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  removeIngredientHandler = type => {
    let oldIngredientCount = this.state.ingredients[type];
    if (oldIngredientCount <= 0) {
      return;
    }
    let newIngredientCount = oldIngredientCount - 1;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newIngredientCount;

    let oldPrice = INGREDIENT_PRICE[type];
    let newPrice = oldPrice - INGREDIENT_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  render = () => {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </Aux>
    );
  };
}

export default BurgerBuilder;

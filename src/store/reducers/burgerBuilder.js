import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const INGREDIENT_PRICE = {
  meat: 1.2,
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.9
};

var initState = {
  ingredients: null,
  totalPrice: 1.5,
  error: false,
  burgerBuilding: false
};

var burgerBuilding = (state, action) => {
  return updateObject(state, { burgerBuilding: true });
};

var addIngredient = (state, action) => {
  let updatedIngredients = updateObject(state.ingredients, {
    [action.payLoad.ingName]: state.ingredients[action.payLoad.ingName] + 1
  });

  let updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payLoad.ingName]
  };
  return updateObject(state, updatedState);
};

var removeIngredient = (state, action) => {
  let updatedIngredientsRemove = updateObject(state.ingredients, {
    [action.payLoad.ingName]: state.ingredients[action.payLoad.ingName] - 1
  });

  let updatedStateRemove = {
    ingredients: updatedIngredientsRemove,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payLoad.ingName]
  };
  return updateObject(state, updatedStateRemove);
};

var initIngredients = (state, action) => {
  let calcuatedPrice = 1.5;
  for (let key in action.payLoad.ingredients) {
    calcuatedPrice =
      calcuatedPrice + INGREDIENT_PRICE[key] * action.payLoad.ingredients[key];
  }
  let updateStateInit = {
    ingredients: action.payLoad.ingredients,
    error: false,
    totalPrice: calcuatedPrice,
    burgerBuilding: false
  };
  return updateObject(state, updateStateInit);
};

var initIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

var reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.INIT_INGREDIENTS:
      return initIngredients(state, action);
    case actionTypes.INIT_INGREDIENTS_FAILED:
      return initIngredientsFailed(state, action);
    case actionTypes.BURGER_BUILDING:
      return burgerBuilding(state, action);
    default:
      return state;
  }
};

export default reducer;

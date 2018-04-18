import * as actionTypes from "./actionTypes";
import axios from "../../AxiosOrders";

export var addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payLoad: { ingName: ingName }
  };
};

export var removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payLoad: { ingName: ingName }
  };
};

var initIngredients = ingredients => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    payLoad: { ingredients: ingredients }
  };
};

var initIngredientsFailed = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS_FAILED
  };
};

export var fetchIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(Response => {
        dispatch(initIngredients(Response.data));
      })
      .catch(error => {
        dispatch(initIngredientsFailed());
        alert(error);
      });
  };
};

export var burgerBuilding = () => {
  return {
    type: actionTypes.BURGER_BUILDING
  };
};

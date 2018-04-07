import * as actionTypes from "./actions";

const INGREDIENT_PRICE = {
  meat: 1.2,
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.9
};

var initState = {
  ingredients: {
    meat: 0,
    salad: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 1.5
};

var reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payLoad.ingName]:
            state.ingredients[action.payLoad.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payLoad.ingName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payLoad.ingName]:
            state.ingredients[action.payLoad.ingName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payLoad.ingName]
      };

    default:
      return state;
  }
};

export default reducer;

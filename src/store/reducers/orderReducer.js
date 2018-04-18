import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

var initState = {
  loading: false,
  orders: [],
  orderSubmitted: false,
  loadingFetchOrder: false
};

var fetchOrderStart = (state, action) => {
  return updateObject(state, {
    orders: action.payLoad.orders,
    loadingFetchOrder: false
  });
};

var fetchOrderFailed = (state, action) => {
  return updateObject(state, { loadingFetchOrder: false });
};

var fetchOrdersLoading = (state, action) => {
  return updateObject(state, { loadingFetchOrder: true });
};

var purchaseInit = (state, action) => {
  return updateObject(state, { orderSubmitted: false });
};

var submitOrder = (state, action) => {
  let updatedOrder = {
    ...action.payLoad.orders,
    id: action.payLoad.id
  };

  let updatedState = {
    orders: state.orders.concat(updatedOrder),
    loading: false,
    orderSubmitted: true
  };
  return updateObject(state, updatedState);
};

var submitOrderFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    orderSubmitted: true
  });
};

var loadingPage = (state, action) => {
  return updateObject(state, {
    loading: true,
    orderSubmitted: false
  });
};

var reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDER_FAILED:
      return fetchOrderFailed(state, action);
    case actionTypes.FETCH_ORDERS_LOADING:
      return fetchOrdersLoading(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.SUBMIT_ORDER:
      return submitOrder(state, action);
    case actionTypes.SUBMIT_ORDER_FAILED:
      return submitOrderFailed(state, action);
    case actionTypes.LOADING_PAGE:
      return loadingPage(state, action);
    default:
      return state;
  }
};

export default reducer;

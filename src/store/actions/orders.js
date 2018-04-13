import * as actionTypes from "./actionTypes";
import axios from "../../AxiosOrders";

var submitOrderStart = (id, orders) => {
  return {
    type: actionTypes.SUBMIT_ORDER,
    payLoad: {
      orders: orders,
      id: id
    }
  };
};

var submitOrderFailed = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_FAILED
  };
};

export var loadingPage = () => {
  return {
    type: actionTypes.LOADING_PAGE
  };
};

export var submitOrder = orders => {
  return dispatch => {
    axios
      .post("/orders.json", orders)
      .then(Response => {
        dispatch(submitOrderStart(Response.data.name, orders));
        alert("Order has been added..!!");
      })
      .catch(error => {
        dispatch(submitOrderFailed());
        alert(error);
      });
  };
};

export var purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

var fetchOrderStart = orders => {
  return {
    type: actionTypes.FETCH_ORDER_START,
    payLoad: {
      orders: orders
    }
  };
};

var fetchOrderFailed = () => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED
  };
};

export var fetchOrders = () => {
  return dispatch => {
    axios
      .get("/orders.json")
      .then(res => {
        let fetchedOrders = [];
        for (var key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrderStart(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrderFailed());
        alert(err);
      });
  };
};

export var fetchOrdersLoading = () => {
  return {
    type: actionTypes.FETCH_ORDERS_LOADING
  };
};

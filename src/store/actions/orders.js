import * as actionTypes from "./actionTypes";
import axios from "../../AxiosOrders";
// import firebase from "firebase";

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

export var submitOrder = (orders, idToken) => {
  return dispatch => {
    axios
      .post("/orders.json?auth=" + idToken, orders)
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

export var fetchOrders = (idToken, userId) => {
  return dispatch => {
    // orderBy is what firebase understands to fetch based on which index.
    // Below has to be done in this manner only.
    let queryParam =
      "?auth=" + idToken + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParam)
      .then(res => {
        let fetchedOrders = [];
        // let userId = localStorage.getItem("localId");
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

// + ".json" + queryParam
export var deleteOrder = (Id, idToken, userId) => {
  return dispatch => {
    // let queryParam =
    //   "?auth=" + idToken + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .delete(
        "/orders/" + Id + ".json?auth=jsXQsJrSQX3oksT8JiX3FfUNvxr7lf1tkaFItkqd"
      )
      .then(res => {
        dispatch(fetchOrders(idToken, userId));
      })
      .catch(err => {
        alert(err);
      });
  };
};

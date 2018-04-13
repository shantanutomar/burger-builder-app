import React, { Component } from "react";
import Order from "../../components/Order/Order";
// import axios from "../../AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class Orders extends Component {
  componentDidMount = () => {
    this.props.onOrdersLoading();
    this.props.onOrderFetch();
  };

  render() {
    if (this.props.loadingFetchOrder) {
      var order = <Spinner />;
    } else {
      if (this.props.orders.length === 0) {
        return (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            OOPS.. No orders are present !! Please order a Burger.
          </p>
        );
      } else {
        order = this.props.orders.map(ele => {
          return (
            <Order
              key={ele.id}
              price={Number(ele.price)}
              ingredients={ele.ingredients}
              orderedOn={ele.orderDate}
              name={ele.customerData.name}
            />
          );
        });
      }
    }

    return <div>{order}</div>;
  }
}

var mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loadingFetchOrder: state.orderReducer.loadingFetchOrder
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onOrderFetch: () => dispatch(actionCreators.fetchOrders()),
    onOrdersLoading: () => dispatch(actionCreators.fetchOrdersLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    loading: false,
    orders: []
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    axios
      .get("/orders.json")
      .then(res => {
        this.setState({ loading: false });
        let fetchedOrders = [];
        for (var key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(err);
      });
  };

  render() {
    if (this.state.loading) {
      var order = <Spinner />;
    } else {
      if (this.state.orders.length === 0) {
        return (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            OOPS.. No orders are present !! Please order a Burger.
          </p>
        );
      } else {
        order = this.state.orders.map(ele => {
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
export default Orders;

import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../AxiosOrders";

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
        // console.log(fetchedOrders);
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    if (!this.state.loading) {
      var order = this.state.orders.map(ele => {
        return (
          <Order
            key={ele.id}
            price={Number(ele.price)}
            ingredients={ele.ingredients}
          />
        );
      });
    }

    return <div>{order}</div>;
  }
}
export default Orders;

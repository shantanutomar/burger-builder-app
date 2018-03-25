import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Classes from "./ContactData.css";
import axios from "../../AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let dateNow = new Date();
    let date =
      dateNow.getDate() +
      "-" +
      (dateNow.getMonth() + 1) +
      "-" +
      dateNow.getFullYear();
    let time =
      dateNow.getHours() +
      ":" +
      dateNow.getMinutes() +
      ":" +
      dateNow.getSeconds();
    let dateTime = date + " " + time;

    let orders = {
      orderDate: dateTime,
      customer: {
        name: "Shantanu Tomar",
        address: {
          street: "Rohini Sector 13",
          pincode: "110085"
        },
        email: "check@gmail.com"
      },
      orderType: "fastest",
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
    };
    axios
      .post("/orders.json", orders)
      .then(Response => {
        this.setState({ loading: false });
        alert("Order has been added..!!");
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        alert(error);
      });
  };
  render() {
    let form = null;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="text" name="email" placeholder="Your Email" />
          <input type="text" name="street" placeholder="Your Street" />
          <input type="text" name="pincode" placeholder="Your Pincode" />
          <Button btnType="Success" onClicked={this.orderHandler}>
            ORDER{" "}
          </Button>
        </form>
      );
    }
    return (
      <div className={Classes.ContactData}>
        <h4>Please enter your details :</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;

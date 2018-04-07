import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Classes from "./ContactData.css";
import axios from "../../AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        inputtype: "input",
        inputConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        rules: {
          required: true,
          maxLength: 30
        },
        valid: false,
        isTouched: false
      },
      street: {
        inputtype: "input",
        inputConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        value: "",
        rules: {
          required: true,
          maxLength: 200
        },
        valid: false,
        isTouched: false
      },
      pincode: {
        inputtype: "input",
        inputConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        rules: {
          required: true,
          maxLength: 10
        },
        valid: false,
        isTouched: false
      },
      email: {
        inputtype: "input",
        inputConfig: {
          type: "text",
          placeholder: "Your E-Mail"
        },
        value: "",
        rules: {
          required: true,
          maxLength: 50
        },
        valid: false,
        isTouched: false
      },
      ordertype: {
        inputtype: "select",
        inputConfig: {
          option: [
            { value: "CHEAP", displayValue: "Cheapest" },
            { value: "FAST", displayValue: "Fastest" }
          ]
        },
        value: "CHEAP",
        valid: true,
        rules: {}
      }
    },
    loading: false,
    isFormValid: false
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

    let customerData = {};
    for (let key in this.state.orderForm) {
      customerData[key] = this.state.orderForm[key].value;
    }

    let orders = {
      customerData: customerData,
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderDate: dateTime
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

  formDataValidateHandler = (rules, value) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.maxLength > 0) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  inputChangeHandler = (event, formElementIdentifier) => {
    var updatedForm = { ...this.state.orderForm };
    var updatedFormElement = { ...updatedForm[formElementIdentifier] };
    // console.log(event.target.value);

    updatedFormElement.value = event.target.value;
    updatedFormElement.isTouched = true;
    updatedFormElement.valid = this.formDataValidateHandler(
      updatedFormElement.rules,
      updatedFormElement.value
    );
    // console.log(updatedFormElement.valid);

    updatedForm[formElementIdentifier] = updatedFormElement;
    var isFormValid = true;
    for (let key in updatedForm) {
      // console.log(updatedForm[key].valid);
      isFormValid = updatedForm[key].valid && isFormValid;
    }
    this.setState({ orderForm: updatedForm, isFormValid: isFormValid });
  };

  render() {
    let inputElementsArray = [];
    for (let key in this.state.orderForm) {
      inputElementsArray.push({ ...this.state.orderForm[key], key });
    }
    let input = inputElementsArray.map(ele => {
      return (
        <Input
          key={ele.key}
          inputtype={ele.inputtype}
          inputConfig={ele.inputConfig}
          value={ele.value}
          changed={event => this.inputChangeHandler(event, ele.key)}
          isValid={ele.valid}
          isTouched={ele.isTouched}
          shouldValidate={ele.rules}
        />
      );
    });

    let form = null;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form onSubmit={this.orderHandler}>
          {input}
          <Button btnType="Success" disabled={!this.state.isFormValid}>
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

var mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactData);

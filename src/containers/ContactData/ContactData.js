import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Classes from "./ContactData.css";
// import axios from "../../AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

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
    // loading: false,
    isFormValid: false
  };

  componentDidMount = () => {
    if (this.props.orderSubmitted) {
      this.props.history.push("/");
    }
  };

  orderHandler = event => {
    event.preventDefault();
    this.props.loadingPage();
    // this.setState({ loading: true });
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
    // let orderId = localStorage.getItem("localId");
    let orders = {
      userId: this.props.userId,
      customerData: customerData,
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderDate: dateTime
    };
    this.props.submitOrder(orders, this.props.idToken);
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
    // updateObject utility can be used below as well.
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
    if (this.props.loading) {
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
    ingredients: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    loading: state.orderReducer.loading,
    idToken: state.authReducer.idToken,
    userId: state.authReducer.userId
  };
};

var mapDispatchToProps = dispatch => {
  return {
    submitOrder: (orders, idToken) =>
      dispatch(actionCreators.submitOrder(orders, idToken)),
    loadingPage: () => dispatch(actionCreators.loadingPage())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);

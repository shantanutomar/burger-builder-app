import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Classes from "./Auth.css";
import * as actionCreators from "../../store/actions/auth";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { formDataValidateHandler } from "../../shared/utility";
import LoginButton from "./LoginButton";

class Auth extends Component {
  state = {
    loginForm: {
      email: {
        inputtype: "input",
        inputConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        rules: {
          required: true,
          maxLength: 30,
          isMail: true
        },
        valid: false,
        isTouched: false
      },
      password: {
        inputtype: "input",
        inputConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        rules: {
          required: true,
          minLength: 6
        },
        valid: false,
        isTouched: false
      }
    },
    isSignUp: false
  };

  inputChangeHandler = (event, formElementIdentifier) => {
    var updatedForm = { ...this.state.loginForm };
    var updatedFormElement = { ...updatedForm[formElementIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isTouched = true;
    updatedFormElement.valid = formDataValidateHandler(
      updatedFormElement.rules,
      updatedFormElement.value
    );

    updatedForm[formElementIdentifier] = updatedFormElement;
    this.setState({ loginForm: updatedForm });
  };

  onSubmitHanlder = event => {
    event.preventDefault();
    this.props.onAuthHandler(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      this.state.isSignUp
    );
  };

  // shaan
  // init = () => {
  //   gapi.load('auth2', function() { // Ready. });
  // }
  authModeChangeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    let inputElementsArray = [];
    for (let key in this.state.loginForm) {
      inputElementsArray.push({ ...this.state.loginForm[key], key });
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
    let form = (
      <form onSubmit={this.onSubmitHanlder}>
        {input}
        <Button btnType="Success">
          {this.state.isSignUp
            ? "SIGNUP USING EMAIL ID"
            : "SIGNIN USING EMAIL ID"}
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    let redirect = null;
    if (this.props.isAuthenticated) {
      this.props.burgerBuilding
        ? (redirect = <Redirect to="/checkout" />)
        : (redirect = <Redirect to="/" />);
      // to checkout
    }
    return (
      <div className={Classes.Auth}>
        {redirect}
        {form}
        <Button onClicked={this.authModeChangeHandler} btnType="Danger">
          Switch to {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
        <LoginButton />
      </div>
    );
  }
}

var mapStatetoProps = state => {
  return {
    loading: state.authReducer.loading,
    isAuthenticated: state.authReducer.idToken !== null,
    burgerBuilding: state.burgerBuilderReducer.burgerBuilding
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onAuthHandler: (email, password, authMode) =>
      dispatch(actionCreators.auth(email, password, authMode))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);

import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Classes from "./Auth.css";
import * as actionCreators from "../../store/actions/auth";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

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

  formDataValidateHandler = (rules, value) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength > 0) {
      isValid = value.trim().length > rules.minLength && isValid;
    }
    if (rules.isMail) {
      //   let pattern =
      //     "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
      //   isValid = pattern.test(value) && isValid;
      isValid = true;
    }
    return isValid;
  };
  inputChangeHandler = (event, formElementIdentifier) => {
    var updatedForm = { ...this.state.loginForm };
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
          {this.state.isSignUp ? "SIGNUP" : "SIGNIN"}
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={Classes.Auth}>
        {form}
        <Button onClicked={this.authModeChangeHandler} btnType="Danger">
          Switch to {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

var mapStatetoProps = state => {
  return {
    loading: state.authReducer.loading
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onAuthHandler: (email, password, authMode) =>
      dispatch(actionCreators.auth(email, password, authMode))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);

import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
// import axios from "../../AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasingInd: false,
    loading: false,
    error: false
  };

  updatePurchasableHandler = ingredients => {
    let ingredientsSum = Object.keys(this.props.ingredients)
      .map(ele => {
        return ingredients[ele];
      })
      .reduce((ingredientsSum, val) => {
        return ingredientsSum + val;
      }, 0);

    return ingredientsSum;
  };

  purchaseHandler = () => {
    this.setState({ purchasingInd: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasingInd: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  componentDidMount = () => {
    // axios
    //   .get("/ingredients.json")
    //   .then(Response => {
    //     this.setState({ ingredients: Response.data });
    //     this.updatePurchasableHandler(this.state.ingredients);
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //     alert(error);
    //   });
  };

  render = () => {
    if (!this.state.error) {
      var burger = <Spinner />;
      if (this.props.ingredients) {
        var disabledInfo = { ...this.props.ingredients };
        for (let val in disabledInfo) {
          disabledInfo[val] = disabledInfo[val] <= 0;
        }

        burger = (
          <Aux>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              price={this.props.price}
              purchase={this.updatePurchasableHandler(this.props.ingredients)}
              purchasing={this.purchaseHandler}
            />
          </Aux>
        );

        var orderSummary = (
          <OrderSummary
            ingredients={this.props.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            totalPrice={this.props.price}
          />
        );
      }
    } else {
      return <p style={{ textAlign: "center" }}>Something went wrong..!!</p>;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          purchasing={this.state.purchasingInd}
          purchaseCancel={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  };
}

var mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};

var mapDisptachToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payLoad: { ingName: ingName }
      }),
    onIngredientRemoved: ingName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payLoad: { ingName: ingName }
      })
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(BurgerBuilder);

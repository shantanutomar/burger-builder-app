import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICE = {
  meat: 1.2,
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.9
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 1.5,
    purchasable: false,
    purchasingInd: false,
    loading: false,
    error: false
  };

  updatePurchasableHandler = ingredients => {
    let ingredientsSum = Object.keys(this.state.ingredients)
      .map(ele => {
        return ingredients[ele];
      })
      .reduce((ingredientsSum, val) => {
        return ingredientsSum + val;
      }, 0);

    if (ingredientsSum > 0) {
      this.setState({ purchasable: true });
    } else {
      this.setState({ purchasable: false });
    }
  };

  addIngredientHandler = type => {
    let oldIngredientCount = this.state.ingredients[type];
    let newIngredientCount = oldIngredientCount + 1;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newIngredientCount;

    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice + INGREDIENT_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchasableHandler(updatedIngredients);
  };

  removeIngredientHandler = type => {
    let oldIngredientCount = this.state.ingredients[type];
    if (oldIngredientCount <= 0) {
      return;
    }
    let newIngredientCount = oldIngredientCount - 1;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newIngredientCount;

    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice - INGREDIENT_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchasableHandler(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasingInd: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasingInd: false });
  };

  purchaseContinueHandler = () => {
    //alert("You Continue !!");
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
      ingredients: this.state.ingredients,
      price: this.state.totalPrice
    };
    axios
      .post("/orders.json", orders)
      .then(Response => {
        this.setState({ loading: false, purchasingInd: false });
        alert("Order has been added..!!");
      })
      .catch(error => {
        this.setState({ loading: false, purchasingInd: false });
        alert(error);
      });
  };

  componentDidMount = () => {
    axios
      .get("/ingredients.json")
      .then(Response => {
        this.setState({ ingredients: Response.data });
        this.updatePurchasableHandler(this.state.ingredients);
      })
      .catch(error => {
        this.setState({ error: true });
        alert(error);
      });
  };

  render = () => {
    if (!this.state.error) {
      var burger = <Spinner />;
      if (this.state.ingredients) {
        var disabledInfo = { ...this.state.ingredients };
        for (let val in disabledInfo) {
          disabledInfo[val] = disabledInfo[val] <= 0;
        }

        burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              price={this.state.totalPrice}
              purchase={this.state.purchasable}
              purchasing={this.purchaseHandler}
            />
          </Aux>
        );

        var orderSummary = (
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
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

export default BurgerBuilder;

import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import Classes from "./NavigationItems.css";

var NavigationItems = props => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem link="/" active>
      BurgerBuilder
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;

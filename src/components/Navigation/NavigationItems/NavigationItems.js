import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import Classes from "./NavigationItems.css";

var NavigationItems = props => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem link="/">BurgerBuilder</NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;

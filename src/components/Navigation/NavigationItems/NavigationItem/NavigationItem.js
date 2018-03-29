import React from "react";
import Classes from "./NavigationItem.css";
import { NavLink } from "react-router-dom";

var NavigationItem = props => (
  <li className={Classes.NavigationItem}>
    <NavLink to={props.link} exact activeClassName={Classes.active}>
      {props.children}
    </NavLink>
  </li>
);
export default NavigationItem;

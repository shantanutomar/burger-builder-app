import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import Classes from "./Logo.css";

var Logo = props => (
  <div className={Classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);
export default Logo;

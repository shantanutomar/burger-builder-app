import React from "react";
import Classes from "./SideDrawerToggle.css";

var SideDrawerToggle = props => (
  <div onClick={props.clicked} className={Classes.DrawerToggle}>
    <div />
    <div />
    <div />
  </div>
);
export default SideDrawerToggle;

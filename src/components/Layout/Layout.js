import React from "react";
import Aux from "../../hoc/Aux";
import Classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

var Layout = props => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={Classes.Content}>{props.children}</main>
  </Aux>
);

export default Layout;

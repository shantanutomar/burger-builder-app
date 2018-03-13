import React from "react";
import Classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import SideDrawerToggle from "../SideDrawer/SideDrawerToggle/SideDrawerToggle";

var Toolbar = props => (
  <header className={Classes.Toolbar}>
    <SideDrawerToggle clicked={props.onMenuClick} />
    <div className={Classes.Logo}>
      <Logo />
    </div>
    <nav className={Classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
export default Toolbar;

import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

var SideDrawer = props => {
  let attachedClass = [Classes.SideDrawer, Classes.Open];
  if (!props.showSidedrawer) {
    attachedClass = [Classes.SideDrawer, Classes.Close];
  }

  return (
    <Aux>
      <Backdrop
        show={props.showSidedrawer}
        purchaseCancel={props.showSidedrawerHandler}
      />
      <div className={attachedClass.join(" ")}>
        <div className={Classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;

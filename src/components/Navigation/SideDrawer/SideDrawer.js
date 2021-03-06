import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

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
      <div
        className={attachedClass.join(" ")}
        onClick={props.showSidedrawerHandler}
      >
        <div className={Classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;

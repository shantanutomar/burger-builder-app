import React from "react";
import Classes from "./Modal.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

var Modal = props => (
  <Aux>
    <Backdrop show={props.purchasing} purchaseCancel={props.purchaseCancel} />
    <div
      className={Classes.Modal}
      style={{
        transform: props.purchasing ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.purchasing ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default Modal;

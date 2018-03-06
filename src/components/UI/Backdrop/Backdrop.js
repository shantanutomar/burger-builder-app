import React from "react";
import Classes from "./Backdrop.css";

var Backdrop = props =>
  props.show ? (
    <div className={Classes.Backdrop} onClick={props.purchaseCancel} />
  ) : null;

export default Backdrop;

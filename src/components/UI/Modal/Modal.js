import React from "react";
import Classes from "./Modal.css";

var Modal = props => {
  return <div className={Classes.Modal}>{props.children}</div>;
};

export default Modal;

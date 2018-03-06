import React from "react";
import Classes from "./Button.css";

var Button = props => (
  <button
    onClick={props.onClicked}
    className={[Classes.Button, Classes[props.btnType]].join(" ")}
  >
    {props.children}
  </button>
);
export default Button;

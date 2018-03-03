import React from "react";
import Classes from "./BuildControl.css";

var BuildControl = props => {
  return (
    <div className={Classes.BuildControl}>
      <div className={Classes.Label}> {props.Label} </div>
      <button className={Classes.Less} onClick={props.removed}>
        Less
      </button>
      <button className={Classes.More} onClick={props.added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;

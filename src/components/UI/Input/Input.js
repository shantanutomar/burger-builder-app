import React from "react";
import Classes from "./Input.css";

var Input = props => {
  let inputElement = null;
  let inputClasses = [Classes.Input];
  if (!props.isValid && props.isTouched && props.shouldValidate) {
    inputClasses.push(Classes.NotValid);
  }

  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textArea":
      inputElement = (
        <textarea
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select onChange={props.changed} value={props.value}>
          {props.inputConfig.option.map(ele => {
            return (
              <option key={ele.value} value={ele.value}>
                {ele.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={inputClasses.join(" ")}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;

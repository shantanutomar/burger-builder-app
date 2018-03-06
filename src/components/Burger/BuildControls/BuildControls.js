import React from "react";
import Classes from "./BuildControls.css";
import BuildControl from "../BuildControls/BuildControl/BuildControl";

var BuildControls = props => {
  var controls = [
    { label: "Meat", type: "meat" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Salad", type: "salad" }
  ];

  return (
    <div className={Classes.BuildControls}>
      <p>
        The Price is : $<strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            Label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)} //shaan understand
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={Classes.OrderButton}
        disabled={!props.purchase}
        onClick={props.purchasing}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;

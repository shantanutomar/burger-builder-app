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
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            Label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)} //shaan understand
            removed={() => props.ingredientRemoved(ctrl.type)}
          />
        );
      })};
    </div>
  );
};

export default BuildControls;

import React from "react";
import "!style-loader!css-loader!./style.css";

/**
 * Footer component
 */
const CheckBox = props => {
  return (
    <div className="checkbox">
      <div className="block">
        <span>{props.label}</span>
        <input id={props.label} data-index="0" type="checkbox" />
        <label for={props.label} />
      </div>
    </div>
  );
};

export default CheckBox;

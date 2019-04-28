"use strict";

import React from "react";
import styles from "./styles";

/**
 * InputText component
 */
const InputSelect = props => {
  const renderOptionList = () => {
    return props.list.map(option => {
      return (
        <option value={option}>
          {option}
        </option>
      );
    });
  };
  return (
    <select style={styles.select} name="rounds">
      <option value="" disabled="disabled" selected="selected">
        {props.placeholder}
      </option>
      {renderOptionList()}
    </select>
  );
};

export default InputSelect;

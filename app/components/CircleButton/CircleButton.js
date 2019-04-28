"use strict";

import React from "react";
import styles from "./styles";

const CircleButton = props => {
  return (
    <button style={styles.button} onClick={props.onClick}>
      <a>
        <img style={styles.img} src={props.icon} alt="Home" />
      </a>
    </button>
  );
};

export default CircleButton;

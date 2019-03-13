"use strict";

import React from "react";
import styles from "./styles";

const Presentator = ({ display, content }) => {
  if(display === "true") {
    return <div className="center" style={styles.container}>
              <div style={styles.content}>{content}</div>
            </div>
  }

  return <div></div>

}
export default Presentator;

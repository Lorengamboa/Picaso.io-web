"use strict";

import React from "react";
import styles from "./styles";

/**
 * Footer component
 */
const Footer = props => {
  return (
    <div style={styles.container}>{props.links.map((link, id) => <a key={id}>| {link}&nbsp;|</a>)}</div>
  );
};

export default Footer;

"use strict";

import React from "react";
import styles from "./styles";

/**
 * Footer component
 */
const Footer = props => {

  function renderActions() {
    return props.links.map((el, id) => {
      if(el.action === 'link') return <a style={styles.link} key={id} href={el.url}>{el.value}</a>
      else if(el.action === 'mailto') return <a style={styles.link} key={id} href={`mailto:${el.value}?Subject=Hello%20again`} target="_top">Contact Us</a>
    });
  }
  return (
    <div style={styles.container}>{renderActions()}</div>
  );
};

export default Footer;

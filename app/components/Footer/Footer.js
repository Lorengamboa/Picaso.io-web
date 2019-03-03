"use strict";

import React from "react";
import styles from "./styles";

/**
 * Footer component
 */
const Footer = props => {

  function renderActions() {
    return props.links.map((el, id) => {
      if(el.action === 'link') return <a key={id} href={el.url}>| {el.value}&nbsp; |</a>
      else if(el.action === 'mailto') return <a key={id} href={`mailto:${el.value}?Subject=Hello%20again`} target="_top">Contact Us&nbsp;|</a>
    });
  }
  return (
    <div style={styles.container}>{renderActions()}</div>
  );
};

export default Footer;

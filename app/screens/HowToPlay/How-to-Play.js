"use strict";

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { Navbar } from "../../components";
import styles from './style';

/**
 * HowToPlay COMPONENT VIEW
 */
class HowToPlay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar className="center" />
        <div className="container" style={styles.container}>
          <h2 className="text-danger" style={styles.h1}><FormattedMessage id="how2play.title1" /></h2>
          <p style={styles.p}><FormattedMessage id="how2play.content1" /></p>
          <h2 className="text-warning" style={styles.h1}><FormattedMessage id="how2play.title2" /></h2>
          <p style={styles.p}><FormattedMessage id="how2play.content2" /></p>
          <h2 className="text-primary" style={styles.h1}><FormattedMessage id="how2play.title3" /></h2>
          <p style={styles.p}><FormattedMessage id="how2play.content3" /></p>
          <p style={styles.p}><FormattedMessage id="how2play.greetings" /></p>
        </div>
      </div>
    );
  }
}

export default HowToPlay;
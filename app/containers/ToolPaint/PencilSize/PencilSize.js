"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import { setPenSize } from "../../../core/game/gameActions";
import styles from './styles';

export class PencilSize extends Component {
  constructor(props) {
    super(props);

    // Event listeners
    this._setPencilSize = this._setPencilSize.bind(this);
  }

  _setPencilSize(e) {
    const size = e.target.getAttribute('size');
    this.props.setPenSize(size);
  }

  /**
   * Renders the list of colors on the palette
   */
  _displaySizes() {
    return (
      <section>
        <span size="1" onClick={this._setPencilSize} style={styles.dot(1)} />
        <span size="4" onClick={this._setPencilSize} style={styles.dot(1.5)} />
        <span size="5" onClick={this._setPencilSize} style={styles.dot(2)} />
      </section>
    );
  }

  render() {
    return <div style={styles.block}>{this._displaySizes()}</div>;
  }
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    setPenSize: size => {
      dispatch(setPenSize(size));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PencilSize);

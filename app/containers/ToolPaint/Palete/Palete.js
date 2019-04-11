'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from "Shared/colors";
import { setColorPicked } from '../../../core/game/gameActions';
import styles from './styles';

/**
 * @class Palete
 * @desc Set of drawing tools to make your life easier!
 */
export class Palete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPicked: this.props.colorPicked
    };

    // Events listeners
    this._drawColors = this._drawColors.bind(this);
  }

  /**
   * Renders the list of colors on the palette
   */
  _drawColors() {
    const colorWidth = 100 / colors.length;
    return colors.map((color, key) => {
      return (
        <li
          key={key}
          data-color={color}
          onClick={this.props.onClick}
          style={styles.color(color, colorWidth)}
        />
      );
    }, this);
  }

  componentDidMount() {
    document.querySelector(`[data-color='${this.state.colorPicked}']`).className = 'active-color';
  }

  render() {
    return <div>{this._drawColors()}</div>;
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({ gameReducer }) {
  const { colorPicked } = gameReducer;

  return { colorPicked };
}

export default connect(mapStateToProps,{ setColorPicked })(Palete);

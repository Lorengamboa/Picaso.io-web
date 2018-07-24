'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTool, setColorPicked, clearCanvas } from '../../actions/game';
import Palete from './Palete';
import Tool from './Tool';
import { EVENTS } from './events';

/**
 * @class ToolPaint
 * @desc
 */
class ToolPaint extends Component {
  constructor(props) {
    super(props);

    // Event listeners
    this._onEraserClick = this._onEraserClick.bind(this);
    this._onPaleteClick = this._onPaleteClick.bind(this);
    this._onBinClick = this._onBinClick.bind(this);
  }

  /**
   *
   */
  _onEraserClick() {
    document.getElementById('mycanvas').style.cursor = "url('/assets/img/tools/eraser.png') 0 30, auto";
    this.props.selectTool('eraser');
  }

  /**
   * If a color from the palette has been click, it will set as the color seleted
   * @param {NodeElement} element
   */
  _onPaleteClick(element) {
    document.getElementById('mycanvas').style.cursor = "url('/assets/img/tools/pencil.png') 0 30, auto";
    document.querySelector(`[data-color='${this.props.colorPicked}']`).classList.remove('active-color');

    const color = element.target.dataset.color;
    element.target.className = 'active-color';
    this.props.setColorPicked(color);
    this.props.selectTool('pencil');
  }

  /**
   *
   * @param {*} e
   */
  _onBinClick() {
    this.props.clearCanvas();
  }

  render() {
    return (
      <div className='toolpaint'>
        <Palete onClick={this._onPaleteClick} />
        <Tool
          type='eraser'
          onClick={this._onEraserClick}
          src='/assets/img/tools/eraser.png'
        />
        <Tool
          type='bin'
          onClick={this._onBinClick}
          src='/assets/img/tools/bin.png'
        />
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({ GameReducer, PlayerReducer }) {
  const { colorPicked, myCanvas } = GameReducer;
  const { socket } = PlayerReducer;

  return { colorPicked, myCanvas, socket };
}

export default connect(mapStateToProps,{ selectTool, setColorPicked, clearCanvas })(ToolPaint);
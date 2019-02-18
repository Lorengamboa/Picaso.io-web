'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTool, setColorPicked, clearCanvas, toggleExpand } from '../../core/game/gameActions';
import Palete from './Palete';
import Tool from './Tool';

/**
 * @class ToolPaint
 * @desc
 */
class ToolPaint extends Component {
  constructor(props) {
    super(props);

    // Event listeners
    this._toggleExpand = this._toggleExpand.bind(this);
    this._onEraserClick = this._onEraserClick.bind(this);
    this._onPaleteClick = this._onPaleteClick.bind(this);
    this._onBinClick = this._onBinClick.bind(this);
    this._onBucketClick = this._onBucketClick.bind(this);
  }

  _toggleExpand() {
    this.props.toggleExpand();
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
    document.getElementById('mycanvas').style.cursor = "url('/assets/img/tools/pencil.svg') 5 40, auto";
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
  
  /**
   * 
   */
  _onBucketClick() {
    document.getElementById('mycanvas').style.cursor = "url('/assets/img/tools/bucket.png') 0 30, auto";
    this.props.selectTool('bucket');
  }

  render() {
    return (
      <div className='toolpaint'>
        <Palete onClick={this._onPaleteClick} />
        <Tool
          type='expand'
          onClick={this._toggleExpand}
          src='/assets/img/tools/expand.svg'
        />
        <Tool
          type='eraser'
          onClick={this._onEraserClick}
          src='/assets/img/tools/eraser.png'
        />
        <Tool
          type='bin'
          onClick={this._onBinClick}
          src='/assets/img/tools/bin.svg'
        />
        <Tool
          type='bucket'
          onClick={this._onBucketClick}
          src='/assets/img/tools/water-glass.svg'
        />
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({ gameReducer, playerReducer }) {
  const { colorPicked, myCanvas } = gameReducer;
  const { socket } = playerReducer;

  return { colorPicked, myCanvas, socket };
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    selectTool: (tool) => {
      dispatch(selectTool(tool));
    },
    setColorPicked: (color) => {
      dispatch(setColorPicked(color));
    },
    clearCanvas: () => {
      dispatch(clearCanvas());
    },
    toggleExpand: () => {
      dispatch(toggleExpand());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolPaint);

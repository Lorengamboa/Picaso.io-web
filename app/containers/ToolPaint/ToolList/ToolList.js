"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import html2canvas from "html2canvas";
import {
  selectTool,
  clearCanvas,
  toggleExpand
} from "../../../core/game/gameActions";
import Tool from "./Tool";

/**
 * @class Palete
 * @desc Set of drawing tools to make your life easier!
 */
export class ToolList extends Component {
  constructor(props) {
    super(props);

    // Event listeners
    this._toggleExpand = this._toggleExpand.bind(this);
    this._onEraserClick = this._onEraserClick.bind(this);
    this._onBinClick = this._onBinClick.bind(this);
    this._onBucketClick = this._onBucketClick.bind(this);
    this._onCameraClick = this._onCameraClick.bind(this);
  }

  _toggleExpand() {
    this.props.toggleExpand();
  }

  /**
   *
   */
  _onEraserClick() {
    document.getElementById("mycanvas").style.cursor =
      "url('/assets/img/tools/eraser.png') 0 30, auto";
    this.props.selectTool("eraser");
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
    document.getElementById("mycanvas").style.cursor =
      "url('/assets/img/tools/bucket.png') 0 30, auto";
    this.props.selectTool("bucket");
  }

  /**
   *
   */
  _onCameraClick(e) {
    html2canvas(document.querySelector("#mycanvas")).then(canvas => {
      var image = canvas.toDataURL("image/jpg");
      let a = document.createElement('a');
      a.href = image;
      a.download = '';
      a.click();
    });
  }

  /**
   * Renders the list of colors on the palette
   */
  _displayTools() {
    return (
      <div className="icon-tools center">
        {/* <li>
          <Tool
            type="expand"
            onClick={this._toggleExpand}
            src="/assets/img/tools/expand.svg"
          />
        </li>
        <li>
          <Tool
            type="eraser"
            onClick={this._onEraserClick}
            src="/assets/img/tools/eraser.png"
          />
        </li> */}
        <li>
          <Tool
            type="bin"
            onClick={this._onBinClick}
            src="/assets/img/tools/bin.svg"
          />
        </li>
        <li>
          <Tool
            type="bin"
            onClick={this._onCameraClick}
            src="/assets/img/tools/camera.svg"
          />
        </li>
        <li>
          <Tool
            type="bucket"
            onClick={this._onBucketClick}
            src="/assets/img/tools/water-glass.svg"
          />
        </li>
      </div>
    );
  }

  render() {
    return <div>{this._displayTools()}</div>;
  }
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    selectTool: tool => {
      dispatch(selectTool(tool));
    },
    clearCanvas: () => {
      dispatch(clearCanvas());
    },
    toggleExpand: () => {
      dispatch(toggleExpand());
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(ToolList);

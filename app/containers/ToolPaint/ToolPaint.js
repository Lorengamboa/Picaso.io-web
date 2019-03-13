"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import {
  selectTool,
  setColorPicked,
} from "../../core/game/gameActions";

import Palete from "./Palete";
import ToolList from "./ToolList";
import PencilSize from "./PencilSize";

/**
 * @class ToolPaint
 * @desc
 */
class ToolPaint extends Component {
  constructor(props) {
    super(props);

    this._onPaleteClick = this._onPaleteClick.bind(this);
  }

  /**
   * If a color from the palette has been click, it will set as the color seleted
   * @param {NodeElement} element
   */
  _onPaleteClick(element) {
    document.getElementById("mycanvas").style.cursor =
      "url('/assets/img/tools/pencil.svg') 5 40, auto";
    document
      .querySelector(`[data-color='${this.props.colorPicked}']`)
      .classList.remove("active-color");

    const color = element.target.dataset.color;
    element.target.className = "active-color";
    this.props.setColorPicked(color);
    this.props.selectTool("pencil");
  }

  render() {
    return (
      <div className="toolpaint">
         <PencilSize />
         <Palete onClick={this._onPaleteClick} />
         <ToolList />
      </div>
    );
  }
}


/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({ gameReducer }) {
  const { colorPicked } = gameReducer;

  return { colorPicked};
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
    setColorPicked: color => {
      dispatch(setColorPicked(color));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolPaint);

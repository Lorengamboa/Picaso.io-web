"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { PencilTool, EraserTool, BinRecycler, Bucket } from "./tools";

/**
 * @class Canvas 🎨
 * @desc Canvas HTML5 element where all the magic happens!
 */
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasUri: null
    };

    // bind functions
    this.clearCanvas = this.clearCanvas.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentWillReceiveProps(props){
    const canvas = this.refs.canvas;
    if (!canvas) return;

    var url = canvas.toDataURL();


    this.setState({
      canvasUri: url
    });  
    // if(props.fullscreen) this.resize();

  }
  
  componentDidMount() {
    // console.log("updating")
  }
  /**
   * Clears canvas to blank
   */
  clearCanvas() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Resizes canvas dimensions
   * @TODO fix the resizing so it adjust to the canva's size
   */
  resize() {
    const canvas = this.refs.canvas;
    if (!canvas) return;

    const { offsetWidth, offsetHeight } = canvas;

    canvas.width = offsetWidth ? offsetWidth : canvas.width;
    canvas.height = offsetHeight ? offsetHeight : canvas.height;

    // var image = new Image();
    // image.src =  this.state.canvasUri
    // //
    // image.onload = function() {
    //   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    // };
  }

  redraw() {
    const canvas = this.refs.canvas;
    if(!canvas) return;
    
    this.resize();
    const ctx = canvas.getContext("2d");

    var image = new Image();
    image.src =  this.state.canvasUri
    //
    image.onload = function() {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }


  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.redraw.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.redraw.bind(this));
  }

  componentDidUpdate() {
    if (!this.props.lastDraw) return;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const tool = this.props.lastDraw.toolPicked;

    if (tool === "pencil") PencilTool.classic(this.props.lastDraw, canvas);
    else if (tool === "eraser") EraserTool(this.props.lastDraw, ctx);
    else if (tool === "bucket") Bucket(this.props.lastDraw, canvas);
    else if (tool === "bin") BinRecycler(canvas);
  }

  render() {
    return (
      <canvas
        id="mycanvas"
        className={this.props.fullscreen ? "fullscreen" : ""}
        ref="canvas"
        width="600"
        height="400"
        onMouseMove={this.props.onMouseMove}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onMouseDown}
        onTouchMove={this.props.onMouseMove}
      />
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(store) {
  const { lastDraw, fullscreen } = store.gameReducer;

  return { lastDraw, fullscreen };
}

export default connect(
  mapStateToProps,
  null
)(Canvas);

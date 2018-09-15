'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PencilTool, EraserTool, BinRecycler } from './tools';

/**
 * @class Canvas
 * @desc Canvas HTML5 element where all the magic happens! 🎨
 */
class Canvas extends Component {
    constructor(props) {
        super(props);

        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
    }

    resizeCanvas() {
        const canvas = this.refs.canvas;
        var ctx = canvas.getContext("2d");

        const dataURL = canvas.toDataURL();

        const { offsetHeight, offsetWidth } = canvas.parentElement;
        canvas.width = offsetWidth;
        canvas.height = 500;

        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
        image.src = dataURL;
    }

    clearCanvas() {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeCanvas);
        this.resizeCanvas();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCanvas);
    }

    componentDidUpdate() {
        if (!this.props.lastDraw) return;

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        const tool = this.props.lastDraw.toolPicked;

        if (tool === 'pencil')
            PencilTool.classic(this.props.lastDraw, ctx);
        else if (tool === 'eraser')
            EraserTool(this.props.lastDraw, ctx);
        else if (tool === 'bin')
            BinRecycler(canvas);
    }

    render() {
        
        return (
            <canvas
                id="mycanvas"
                ref="canvas"
                width="800"
                height="600"
                onMouseMove={this.props.onMouseMove}
                onMouseDown={this.props.onMouseDown}>
            </canvas>
        )
    }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(store) {
    const { lastDraw } = store.GameReducer;

    return { lastDraw };
}

export default connect(mapStateToProps, null)(Canvas);

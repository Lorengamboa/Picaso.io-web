'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PencilTool, EraserTool, BinRecycler, Bucket } from './tools';
import resizeCanvas from './resizer';

/**
 * @class Canvas 🎨
 * @desc Canvas HTML5 element where all the magic happens! 
 */
class Canvas extends Component {
    constructor(props) {
        super(props);

        this.clearCanvas = this.clearCanvas.bind(this);
    }

    clearCanvas() {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    componentDidMount() {
        window.addEventListener('resize', resizeCanvas.bind(this));
        resizeCanvas.call(this);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', resizeCanvas.bind(this));
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
        else if (tool === 'bucket')
            Bucket(this.props.lastDraw, ctx);
        else if (tool === 'bin')
            BinRecycler(canvas);

    }

    render() {
        return (
            <canvas
                id="mycanvas"
                ref="canvas"
                width="600"
                height="400"
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

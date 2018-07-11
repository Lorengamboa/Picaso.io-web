'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCanvas } from '../../actions/game';
import { PencilTool, EraserTool } from './drawTools';

/**
 * @class Canvas
 * @desc Canvas HTML5 element where all the magic happens! 🎨
 */
class Canvas extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (!this.props.lastDraw) return;
        const ctx = this.refs.canvas.getContext("2d");

        const tool = this.props.lastDraw.toolPicked;
        if (tool === 'pencil')
            PencilTool.classic(this.props.lastDraw, ctx);
        else if (tool === 'eraser')
            EraserTool(this.props.lastDraw, ctx);
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


export default connect(mapStateToProps, { updateCanvas })(Canvas);

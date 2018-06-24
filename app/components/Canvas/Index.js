'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCanvas } from '../../actions/game_action';

/**
 * @class Canvas
 * @desc 
 */
class Canvas extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 
     */
    _resizeCanvas() {
        const canvas = this.refs.canvas;
        canvas.width = canvas.parentElement.offsetWidth;
    }

    componentDidMount() {
        this._resizeCanvas();
        window.addEventListener('resize', e => {
            this._resizeCanvas();
        }, false);
    }

    componentWillReceiveProps({ data }) {
        const { drawing, color } = data.drawing;

        if (!drawing) return;
        const ctx = this.refs.canvas.getContext("2d");

        const { currentX, currentY, x, y } = drawing;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
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
 * 
 * @param {*} param0 
 */
function mapStateToProps({ GameReducer }) {
    const { myCanvas } = GameReducer;

    return { myCanvas };
}


export default connect(mapStateToProps, { updateCanvas })(Canvas);

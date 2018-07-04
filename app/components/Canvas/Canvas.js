'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCanvas } from '../../actions/game';

/**
 * @class Canvas
 * @desc 
 */
class Canvas extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        const { drawPosition, colorPicked, toolPicked } = props.data;
        if (!drawPosition) return;
        const ctx = this.refs.canvas.getContext("2d");

        const { currentX, currentY, x, y } = drawPosition;

        ctx.beginPath();
        ctx.moveTo(x, y);   
        ctx.lineTo(currentX, currentY);
        if(toolPicked === 'eraser') {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
        } else {
            ctx.strokeStyle = colorPicked;
            ctx.lineWidth = 2;   
        }
   
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
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({ GameReducer }) {
    const { myCanvas } = GameReducer;

    return { myCanvas };
}


export default connect(mapStateToProps, { updateCanvas })(Canvas);

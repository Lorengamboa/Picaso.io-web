'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCanvas } from '../../actions/game_action';

class Canvas extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        var width = canvas.width;
        var height = canvas.height;

        this.props.updateCanvas({
            width, height
        });
    }

    componentWillReceiveProps(props) {
        if(!props.data) return;
        const ctx = this.refs.canvas.getContext("2d");

        const { lineCoordinates } = props.data;
        ctx.fillRect(lineCoordinates[2] * this.props.myCanvas.width, lineCoordinates[3] * this.props.myCanvas.height,1,1);
    }

    render() {
        return (
            <canvas
                ref="canvas"
                style={{ border: "1px solid #000000", width: "100%" }}
                onMouseMove={this.props.onMouseMove}
                onMouseDown={this.props.onMouseDown}>
            </canvas>
        )
    }
}

function mapStateToProps({ GameReducer }) {
    const { myCanvas } = GameReducer;

    return { myCanvas };
}


export default connect(mapStateToProps, { updateCanvas })(Canvas);

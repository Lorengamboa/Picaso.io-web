'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTool, setColorPicked } from '../../actions/game_action';
import Palete from './Palete';
import Tool from './Tool';

const EVENTS = {
    CLEAR_CANVAS: 'clearCanvas'
}
/**
 * @class ToolPaint
 * @desc
 */
class ToolPaint extends Component {
    constructor(props) {
        super(props);

        // Event listeners
        this.onEraserClick = this.onEraserClick.bind(this);
        this.onPaleteClick = this.onPaleteClick.bind(this);
        this.onBinClick = this.onBinClick.bind(this);
    }
    
    /**
     * 
     */
    onEraserClick(e) {
        document.getElementById("mycanvas").style.cursor = "url('/assets/img/tools/eraser.png') 0 30, auto";
        this.props.selectTool('eraser');
    }

    /**
     * If a color from the palette has been click, it will set as the color seleted
     * @param {NodeElement} element 
     */
    onPaleteClick(element) {
        document.getElementById("mycanvas").style.cursor = "url('/assets/img/tools/pencil.png') 0 30, auto";
        document.querySelector(`[data-color="${this.props.colorPicked}"]`).classList.remove("active-color");

        const color = element.target.dataset.color;
        element.target.className = "active-color";
        this.props.setColorPicked(color);
        this.props.selectTool('pencil');
    }

    /**
     * 
     * @param {*} e 
     */
    onBinClick(e) {
        this.props.socket.emit(EVENTS.CLEAR_CANVAS, null);
    }

    render() {
        return (
            <div className="toolpaint">
                <Palete onClick={this.onPaleteClick}/>
                <Tool type="eraser" onClick={this.onEraserClick} src='/assets/img/tools/eraser.png'/>
                <Tool type="bin" onClick={this.onBinClick} src='/assets/img/tools/bin.png'/>
            </div>
        )
    }
}

/**
 * 
 * @param {*} param0 
 */
function mapStateToProps({ GameReducer, PlayerReducer }) {
    const { colorPicked, myCanvas } = GameReducer;
    const { socket } = PlayerReducer;

    return { colorPicked, myCanvas, socket };
}

export default connect(mapStateToProps, { selectTool, setColorPicked })(ToolPaint);

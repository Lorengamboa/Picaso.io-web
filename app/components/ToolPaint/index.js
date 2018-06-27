'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTool, setColorPicked } from '../../actions/game_action';
import Palete from './Palete';
import Tool from './Tool';

/**
 * @class ToolPaint
 * @desc
 */
class ToolPaint extends Component {
    constructor(props) {
        super(props);

        //
        this.onEraserClick = this.onEraserClick.bind(this);
        this.onPaleteClick = this.onPaleteClick.bind(this);
    }
    
    /**
     * 
     */
    onEraserClick(e) {
        selectTool('eraser');
        document.getElementById("mycanvas").style.cursor = "url('/assets/img/tools/eraser.png') 0 30, auto";
    }

    /**
     * If a color from the palette has been click, it will set as the color seleted
     * @param {NodeElement} element 
     */
    onPaleteClick(element) {
        selectTool('pencil');
        document.getElementById("mycanvas").style.cursor = "url('/assets/img/tools/pencil.png') 0 30, auto";

        document.querySelector(`[data-color="${this.props.colorPicked}"]`).classList.remove("active-color");

        const color = element.target.dataset.color;
        element.target.className = "active-color";
        this.props.setColorPicked(color);
    }

    render() {
        return (
            <div className="toolpaint">
                <Palete onClick={this.onPaleteClick}/>
                <Tool onClick={this.onEraserClick} src='/assets/img/tools/eraser.png'/>
            </div>
        )
    }
}

/**
 * 
 * @param {*} param0 
 */
function mapStateToProps({ GameReducer }) {
    const { colorPicked, myCanvas } = GameReducer;

    return { colorPicked, myCanvas };
}

export default connect(mapStateToProps, { selectTool, setColorPicked })(ToolPaint);

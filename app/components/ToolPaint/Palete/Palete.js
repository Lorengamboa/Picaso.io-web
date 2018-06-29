'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setColorPicked } from '../../../actions/game_action';

const colors = ["#E74C3C", "#3498DB", "#58D68D", "#F7DC6F", "#E67E22", "#CACFD2", "#000", "#ffffff"];

/**
 * @class Palete
 * @desc
 */
class Palete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorPicked: this.props.colorPicked
        }

        // Events listeners
        this.drawColors = this.drawColors.bind(this);
    }

    componentDidMount() {
        document.querySelector(`[data-color="${this.state.colorPicked}"]`).className = "active-color";
    }

    /**
     * Renders the list of colors on the palette
     */
    drawColors() {
        return colors.map((color, key) => {
            return (<li key={key} data-color={color} onClick={this.props.onClick} style={{ backgroundColor: color }}></li>)
        }, this);
    }

    render() {
        return (
            <div>
                <ul className="colors">
                    {this.drawColors()}
                </ul>
            </div>
        )
    }
}

/**
 * 
 * @param {*} param0 
 */
function mapStateToProps({ GameReducer }) {
    const { colorPicked } = GameReducer;

    return { colorPicked };
}

export default connect(mapStateToProps, { setColorPicked })(Palete);

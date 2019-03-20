import React, { Component } from 'react';
import { detected } from 'adblockdetect';

/**
 * @class:
 * @description:
 */
class AdBlockDetect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detected: false
        }
    }

    /**
     * 
     */
    componentDidUpdate() {
        if(this.state.detected) this.props.punishment();
    }

    /**
     * 
     */
    componentDidMount() {
        this.setState({
            detected: detected()
        });
    }

    render() {
    return this.state.detected ? <img src={this.props.blocking} /> : this.props.children;
    }
}

export default AdBlockDetect;
import React, { Component } from 'react';
import { detected } from 'adblockdetect';

class AdBlockDetect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detected: false
        }
    }

    componentDidMount() {
        this.setState({
            detected: detected()
        });
    }

    render() {
    return this.state.detected ? <img src={this.props.blockimg} /> : this.props.children;
    }
}

export default AdBlockDetect;
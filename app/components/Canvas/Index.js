import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.socket.on(SOCKET_EVENTS.UPDATE_USER_LIST, playerList => this.setState({ playerList }));
    }

    render() {
        return (
            <canvas
                style={{ border: "1px solid #000000", width: "100%" }}
                onMouseMove={this.props.onMouseMove}
                onMouseDown={this.props.onMouseDown}>
            </canvas>
        )
    }
}

export default Canvas;
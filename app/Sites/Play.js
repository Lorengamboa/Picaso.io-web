'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import Canvas from '../components/Canvas';
import ChatList from '../components/ChatList';
import UserList from '../components/UserList';

const SOCKET_EVENTS = {
    PLAYER_JOIN_RANDOM_GAMEROOM: 'joinRandomRoom'
};

class PlayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "Play Game!",
            "username": this.props.username,
            "socket": openSocket('http://localhost:8080'),
            "userlist": []
        }

        // Events
        this.handleDisplayMouseMove = this.handleDisplayMouseMove.bind(this);
        this.handleDisplayMouseDown = this.handleDisplayMouseDown.bind(this);

    }

    // cicle life methods
    componentDidMount() {
        this.state.socket.emit(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, this.state.username);
    }

    handleDisplayMouseMove(e) {
        this.setState({
            mouseX: e.clientX,
            mouseY: e.clientY
        });
        if (this.state.isPenDown) {
            this.display.current.getContext('2d').lineCap = 'round';
            const { top, left } = this.display.current.getBoundingClientRect();
            switch (this.state.toolId) {
                case 'pen':
                    this.socket.emit('line', {
                        lineWidth: this.state.brushSize,
                        lineColor: this.state.brushColor,
                        lineCoordinates: [this.state.prevX - left, this.state.prevY - top, this.state.mouseX - left, this.state.mouseY - top],
                        sessionKey: window.localStorage.getItem('sessionKey')
                    });
                    break;
                case 'eraser':
                    this.socket.emit('line', {
                        lineWidth: this.state.brushSize,
                        lineColor: { r: 255, g: 255, b: 255, a: this.state.brushColor.a },
                        lineCoordinates: [this.state.prevX, this.state.prevY, this.state.mouseX, this.state.mouseY],
                        sessionKey: window.localStorage.getItem('sessionKey')
                    });
                    break;
            }
        }
        this.setState({
            prevX: this.state.mouseX,
            prevY: this.state.mouseY
        });
        if (!this.state.isPenDown) {
            this.setState({
                prevX: e.clientX,
                prevY: e.clientY
            });
        }
        this.socket.emit('cursor', {
            x: this.state.mouseX,
            y: this.state.mouseY,
            sessionKey: window.localStorage.getItem('sessionKey')
        });
    }
    handleDisplayMouseDown(e) {
        this.setState({ isPenDown: true });
    }
    handleDisplayMouseUp(e) {
        this.setState({ isPenDown: false });
    }
    handleBrushResize(e) {
        this.setState({ brushSize: e.target.value })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="eight columns">
                        <Canvas
                            onMouseMove={this.handleDisplayMouseMove}
                            onMouseDown={this.handleDisplayMouseDown}
                        />
                    </div>
                    <div className="four columns">
                        <UserList socket={this.state.socket} userlist={this.state.userlist} />
                        <ChatList socket={this.state.socket} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { username: state.PlayerReducer.username };
}

export default connect(mapStateToProps, null)(PlayPage);

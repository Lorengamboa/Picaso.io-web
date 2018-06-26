'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import ChatList from '../components/ChatList';
import UserList from '../components/UserList';
import ToolPaint from '../components/ToolPaint';

const SOCKET_EVENTS = {
    PLAYER_JOIN_RANDOM_GAMEROOM: 'joinRandomRoom',
    UPDATE_CANVAS: 'updateCanvas',
    PLAYER_DISCONNECT: 'disconnect'
};

/**
 * PLAYPAGE COMPONENT VIEW
 */
class PlayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Play Game!",
            username: this.props.username,
            isPenDown: false,
            currentPosition: {
                x: null,
                y: null,
            },
            drawData: null
        }

        // Events
        this.handleDisplayMouseMove = this.handleDisplayMouseMove.bind(this);
        this.handleDisplayMouseUp = this.handleDisplayMouseUp.bind(this);
        this.handleDisplayMouseDown = this.handleDisplayMouseDown.bind(this);
    }

    componentDidMount() {
        //
        this.props.socket.emit(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, this.state.username);
        //
        this.props.socket.on(SOCKET_EVENTS.UPDATE_CANVAS, (drawing, colorPicked) => {
            this.setState({
                drawData: { drawing, colorPicked }
            });
        });
        //
        this.props.socket.on(SOCKET_EVENTS.PLAYER_DISCONNECT, (msg) => {
            this.props.history.push('/');
        }, this);
    }

    /**
     * Keeps track of the mouse moving over the canvas
     * @param {Object} e 
     */
    handleDisplayMouseMove(e) {
        if (!this.state.isPenDown) return;
        const mycanvas = document.getElementById("mycanvas");

        const { offsetLeft, offsetTop } = mycanvas;

        const drawPositon = Object.assign({}, this.state.currentPosition, {
            currentX: e.clientX - offsetLeft,
            currentY: e.clientY - offsetTop
        })

        this.props.socket.emit('drawing', drawPositon, this.props.colorPicked);

        this.setState({
            currentPosition: Object.assign({}, this.state.currentPosition, {
                x: e.clientX - offsetLeft,
                y: e.clientY - offsetTop
            })
        });
    }

    /**
     * The mouse has been pressed down on the canvas
     * @param {Object} e 
     */
    handleDisplayMouseDown(e) {
        window.addEventListener("mouseup", this.handleDisplayMouseUp);

        const mycanvas = document.getElementById("mycanvas");

        const { offsetLeft, offsetTop } = mycanvas;

        this.setState({
            isPenDown: true,
            currentPosition: Object.assign({}, this.state.currentPosition, {
                x: e.clientX - offsetLeft,
                y: e.clientY - offsetTop
            })
        });

        this.props.socket.emit('drawing', this.state.currentPosition, this.props.colorPicked);
    }

    /**
     * The mouse has been stopped from being pressed
     * @param {*} e 
     */
    handleDisplayMouseUp(e) {
        window.removeEventListener("mouseup", this.handleDisplayMouseUp)
        this.setState({ isPenDown: false });
    }

    render() {
        return (
            <div id="play-site">
                <div className="row">
                    <div className="nine columns">
                        <Canvas
                            onMouseMove={this.handleDisplayMouseMove}
                            onMouseDown={this.handleDisplayMouseDown}
                            data={this.state.drawData}
                        />
                        <ToolPaint />
                    </div>
                    <div className="three columns">
                        <UserList />
                        <ChatList />
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * 
 * @param {*} param0 
 */
function mapStateToProps({ PlayerReducer, GameReducer }) {
    const { username, socket } = PlayerReducer;
    const { colorPicked } = GameReducer;

    return { username, socket, colorPicked };
}

export default connect(mapStateToProps, null)(PlayPage);

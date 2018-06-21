'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import ChatList from '../components/ChatList';
import UserList from '../components/UserList';
import ToolPaint from '../components/ToolPaint';
import { AdBlock } from '../components/common';

const SOCKET_EVENTS = {
    PLAYER_JOIN_RANDOM_GAMEROOM: 'joinRandomRoom',
    UPDATE_CANVAS: 'updateCanvas'
};

class PlayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Play Game!",
            username: this.props.username,
            userlist: [],
            isPenDown: false,
            drawPostion: {
                mouseX: null,
                mouseY: null,
                prevX: null,
                prevY: null,
            },
            drawData: null
        }

        // Events
        this.handleDisplayMouseMove = this.handleDisplayMouseMove.bind(this);
        this.handleDisplayMouseUp = this.handleDisplayMouseUp.bind(this);
        this.handleDisplayMouseDown = this.handleDisplayMouseDown.bind(this);
    }

    componentDidMount() {
        this.props.socket.emit(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, this.state.username);
        this.props.socket.on(SOCKET_EVENTS.UPDATE_CANVAS, data => {
            this.setState({
                drawData: data
            });
        });
    }

    /**
     * 
     * @param {*} e 
     */
    handleDisplayMouseMove(e) {
        if (!this.state.isPenDown) return;


        const { width, height } = this.props.myCanvas

        this.setState({
            drawPostion: Object.assign({}, this.state.drawPostion, {
                mouseX: e.clientX / width,
                mouseY: e.clientY / height
            })
        });

        console.log(this.state.drawPostion)
        this.props.socket.emit('drawing', {
            lineCoordinates: [
                this.state.drawPostion.prevX,
                this.state.drawPostion.prevY,
                this.state.drawPostion.mouseX,
                this.state.drawPostion.mouseY
            ]
        });
    }

    /**
     * 
     * @param {*} e 
     */
    handleDisplayMouseDown(e) {
        window.addEventListener("mouseup", this.handleDisplayMouseUp)

        const { width, height } = this.props.myCanvas

        this.setState({
            isPenDown: true,
            drawPostion: Object.assign({}, this.state.drawPostion, {
                prevX: e.clientX / width,
                prevY: e.clientY / height
            })
        });
    }

    /**
     * 
     * @param {*} e 
     */
    handleDisplayMouseUp(e) {
        window.removeEventListener("mouseup", this.handleDisplayMouseUp)
        this.setState({ isPenDown: false });
    }

    /**
     * 
     * @param {*} e 
     */
    handleBrushResize(e) {
        this.setState({ brushSize: e.target.value })
    }

    render() {
        return (
            <div id="play-site">
                <div className="row">
                    <div className="ten columns">
                        <div className="row">
                            <div className="eight columns">
                                <Canvas
                                    onMouseMove={this.handleDisplayMouseMove}
                                    onMouseDown={this.handleDisplayMouseDown}
                                    data={this.state.drawData}
                                />
                                <ToolPaint />
                            </div>
                            <div className="four columns">
                                <UserList userlist={this.state.userlist} />
                                <ChatList />
                            </div>
                        </div>
                    </div>
                    <div className="two columns">
                        <AdBlock />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ PlayerReducer, GameReducer }) {
    const { username, socket } = PlayerReducer;
    const { myCanvas } = GameReducer;

    return { username, socket, myCanvas };
}

export default connect(mapStateToProps, null)(PlayPage);

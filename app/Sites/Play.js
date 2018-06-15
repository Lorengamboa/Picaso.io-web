'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            title: "Play Game!",
            username: this.props.username,
            userlist: [],
            isPenDown: false,
            drawPostion: {
                mouseX: null,
                mouseY: null,
                prevX: null,
                prevY: null,
            }
        }

        // Events
        this.handleDisplayMouseMove = this.handleDisplayMouseMove.bind(this);
        this.handleDisplayMouseUp = this.handleDisplayMouseUp.bind(this);
        this.handleDisplayMouseDown = this.handleDisplayMouseDown.bind(this);
    }

    componentDidMount() {
        this.props.socket.emit(SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM, this.state.username);
        this.props.socket.on('updateCanvas', data => {
            console.log(data);
        });
    }
    
    /**
     * 
     * @param {*} e 
     */
    handleDisplayMouseMove(e) {
        if (!this.state.isPenDown) return;

        this.setState({
            drawPostion: Object.assign({}, this.state.drawPostion, {
                mouseX: e.clientX,
                mouseY: e.clientY
            })
        });

        this.props.socket.emit('drawing', {
            lineCoordinates: [
                this.state.drawPostion.prevX,
                this.state.drawPostion.prevY,
                this.state.drawPostion.mouseX,
                this.state.drawPostion.mouseY]
        });

    }

    /**
     * 
     * @param {*} e 
     */
    handleDisplayMouseDown(e) {
        window.addEventListener("mouseup", this.handleDisplayMouseUp)
        this.setState({ isPenDown: true });
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
            <div className="container">
                <div className="row">
                    <div className="eight columns">
                        <Canvas
                            onMouseMove={this.handleDisplayMouseMove}
                            onMouseDown={this.handleDisplayMouseDown}
                        />
                    </div>
                    <div className="four columns">
                        <UserList userlist={this.state.userlist} />
                        <ChatList />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { username: state.PlayerReducer.username, socket: state.PlayerReducer.socket };
}

export default connect(mapStateToProps, null)(PlayPage);

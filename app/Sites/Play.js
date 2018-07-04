"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "../components/common";
import Canvas from "../components/Canvas";
import ChatList from "../components/ChatList";
import UserList from "../components/UserList";
import ToolPaint from "../components/ToolPaint";
import Timer from "../components/Timer";

const SOCKET_EVENTS = {
  PLAYER_JOIN_RANDOM_GAMEROOM: "joinRandomRoom",
  UPDATE_CANVAS: "updateCanvas",
  PLAYER_DISCONNECT: "disconnect",
  CLEAR_CANVAS: "clearCanvas",
  TIMER_UPDATE: "updateTimer"
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
        y: null
      },
      drawData: null,
      countDown: 0
    };

    // Events
    this.handleDisplayMouseMove = this.handleDisplayMouseMove.bind(this);
    this.handleDisplayMouseUp = this.handleDisplayMouseUp.bind(this);
    this.handleDisplayMouseDown = this.handleDisplayMouseDown.bind(this);
  }

  componentDidMount() {
    //
    this.props.socket.emit(
      SOCKET_EVENTS.PLAYER_JOIN_RANDOM_GAMEROOM,
      this.state.username
    );
    //
    this.props.socket.on(SOCKET_EVENTS.UPDATE_CANVAS, drawingInfo => {
      this.setState({
        drawData: drawingInfo
      });
    });
    //
    this.props.socket.on(SOCKET_EVENTS.CLEAR_CANVAS, () => {
      const mycanvas = document.getElementById("mycanvas");
      const { width, height } = mycanvas;
      const context = mycanvas.getContext("2d");

      context.clearRect(0, 0, width, height);
    });
    //
    this.props.socket.on(
      SOCKET_EVENTS.PLAYER_DISCONNECT,
      msg => {
        this.props.history.push("/");
      },
      this
    );
    //
    this.props.socket.on(SOCKET_EVENTS.TIMER_UPDATE, time => {
      this.setState({
        countDown: time
      });
    });
  }

  /**
   * Keeps track of the mouse moving over the canvas
   * @param {Object} e
   */
  handleDisplayMouseMove(e) {
    if (!this.state.isPenDown) return;
    const mycanvas = document.getElementById("mycanvas");

    const { offsetLeft, offsetTop } = mycanvas;

    const drawPosition = Object.assign({}, this.state.currentPosition, {
      currentX: e.clientX - offsetLeft,
      currentY: e.clientY - offsetTop
    });

    this.props.socket.emit("drawing", {
      drawPosition,
      colorPicked: this.props.colorPicked,
      toolPicked: this.props.toolPicked
    });

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
  }

  /**
   * The mouse has been stopped from being pressed
   * @param {*} e
   */
  handleDisplayMouseUp(e) {
    window.removeEventListener("mouseup", this.handleDisplayMouseUp);
    this.setState({ isPenDown: false });
  }

  render() {
    return (
      <div id="play-site">
      <Header />
        <div className="row">
          <div className="three columns">
            <ChatList />
          </div>
          <div className="seven columns">
            <Canvas
              onMouseMove={this.handleDisplayMouseMove}
              onMouseDown={this.handleDisplayMouseDown}
              data={this.state.drawData}
            />
            <ToolPaint />
          </div>
          <div className="two columns">
            <Timer time={this.state.countDown} />
            <UserList />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({ PlayerReducer, GameReducer }) {
  const { username, socket } = PlayerReducer;
  const { colorPicked, toolPicked } = GameReducer;

  return { username, socket, colorPicked, toolPicked };
}

export default connect(
  mapStateToProps,
  null
)(PlayPage);

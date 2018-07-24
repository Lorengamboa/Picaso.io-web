"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, DrawThumbnail } from "../components/common";
import Canvas from "../components/Canvas";
import ChatList from "../components/ChatList";
import UserList from "../components/UserList";
import ToolPaint from "../components/ToolPaint";
import Timer from "../components/Timer";

import { playerDrawCanvas } from "../actions/game";

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
      drawData: null
    };

    // Events
    this.handleDisplayMouseMove = this.handleDisplayMouseMove.bind(this);
    this.handleDisplayMouseUp = this.handleDisplayMouseUp.bind(this);
    this.handleDisplayMouseDown = this.handleDisplayMouseDown.bind(this);
  }

  /**
   * Keeps track of the mouse moving over the canvas
   * @param {Object} e
   */
  handleDisplayMouseMove(e) {
    if (!this.state.isPenDown) return;
    const mycanvas = document.getElementById("mycanvas");

    const { top, left }  = mycanvas.getBoundingClientRect();

    const drawPosition = Object.assign({}, this.state.currentPosition, {
      currentX: e.clientX - left,
      currentY: e.clientY - top
    });

    //
    this.props.playerDrawCanvas({
      drawPosition,
      colorPicked: this.props.colorPicked,
      toolPicked: this.props.toolPicked
    });

    this.setState({
      currentPosition: Object.assign({}, this.state.currentPosition, {
        x: e.clientX - left,
        y: e.clientY - top
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

    const { top, left }  = mycanvas.getBoundingClientRect();

    this.setState({
      isPenDown: true,
      currentPosition: Object.assign({}, this.state.currentPosition, {
        x: e.clientX - left,
        y: e.clientY - top
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

  /**
   *
   */
  renderPlayerDraws() {
    return this.props.playersDraw.map(base64 => {
      return (
        <div className="six columns">
          <DrawThumbnail src={base64} />
        </div>
      );
    });
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
            {this.props.gamePlay === "starting" ||
            this.props.gamePlay === "voting" 
            ?( <div className="row">{this.renderPlayerDraws()}</div>) 
            :( <Canvas
                onMouseMove={this.handleDisplayMouseMove}
                onMouseDown={this.handleDisplayMouseDown}
              />
            )}

            <ToolPaint />
          </div>
          <div className="two columns">
            <div className="score">
              {this.props.gamePlay}
              {this.props.gamePlay === "waiting" ? (
                "Not enough players to start"
              ) : (
                <Timer time={this.props.countDown} />
              )}
            </div>
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
  const {
    colorPicked,
    toolPicked,
    countDown,
    gamePlay,
    playersDraw
  } = GameReducer;

  return {
    username,
    socket,
    colorPicked,
    toolPicked,
    countDown,
    gamePlay,
    playersDraw
  };
}

export default connect(
  mapStateToProps,
  { playerDrawCanvas }
)(PlayPage);

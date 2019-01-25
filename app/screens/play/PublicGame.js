"use strict";

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card, Grid, Input } from 'semantic-ui-react'
import { Howl } from 'howler';

import CanvasGame from "../../containers/CanvasGame";
import Chat from "../../containers/Chat";
import PlayerList from "../../containers/PlayerList";
import ToolPaint from "../../containers/ToolPaint";

import { Navbar, DrawThumbnail, Timer } from "../../components";

import { playerDrawCanvas } from "../../actions/game";

/**
 * @class PublicGame
 * @desc
 */
class PublicGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Play Game!",
      username: this.props.username,
      isPenDown: false,
      currentPosition: {
        prevX: null,
        prevY: null
      },
      drawData: null
    };

    this.init();

    // Events
    this.handleDisplayMouseMove = this.handleDisplayMouseMove.bind(this);
    this.handleDisplayMouseUp = this.handleDisplayMouseUp.bind(this);
    this.handleDisplayMouseDown = this.handleDisplayMouseDown.bind(this);
  }

  init() {
    // no connection openned, then redirect to home page
    if (!this.props.connection) return this.props.history.push("/");
    var sound = new Howl({
      src: ['/assets/music/entrance.mp3']
    });
    sound.play();
  }

  /**
   * Keeps track of the mouse moving over the canvas
   * @param {Object} e
   */
  handleDisplayMouseMove(e) {
    if (!this.state.isPenDown) return;
    const mycanvas = document.getElementById("mycanvas");

    const { top, left } = mycanvas.getBoundingClientRect();

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
    //
    this.setState({
      currentPosition: Object.assign({}, this.state.currentPosition, {
        prevX: e.clientX - left,
        prevY: e.clientY - top
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

    const { top, left } = mycanvas.getBoundingClientRect();

    this.setState({
      isPenDown: true,
      currentPosition: Object.assign({}, this.state.currentPosition, {
        prevX: e.clientX - left,
        prevY: e.clientY - top
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
   * Display random draw samples
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
    const roomUrl = 'http://www.localhost:8080/game/' + this.props.gameInfo.roomTag;

    return (
      <div id="play-site">
        <Navbar />
        <Grid>
          <PlayerList />
          <Grid.Row>
            {/*Left column*/}
            <Grid.Column width={3}>
              <Card
                link
                header={this.props.currentWord}
                color='purple'
                description={
                  this.props.gamePlay === "waiting"
                    ? "Not enough players to start"
                    : (<Fragment>
                      <Timer time={this.props.countDown} />
                    </Fragment>)}
              />
              <Input
                className="clipboard"
                size='mini'
                action={{ color: 'teal', labelPosition: 'right', icon: 'copy', content: 'Copy' }}
                value={roomUrl}
              />
            </Grid.Column>
            {/* Middle column */}
            <Grid.Column width={9}>
              {this.props.gamePlay === "voting" ? (
                <div className="row">{this.renderPlayerDraws()}</div>
              ) : (
                  <CanvasGame
                    onMouseMove={this.handleDisplayMouseMove}
                    onMouseDown={this.handleDisplayMouseDown}
                  />
                )}
              <ToolPaint />
            </Grid.Column>

            {/* Right column */}
            <Grid.Column width={4}>
              <Chat />
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div >
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({ PlayerReducer, GameReducer }) {
  const { username, connection } = PlayerReducer;
  const {
    colorPicked,
    toolPicked,
    countDown,
    gamePlay,
    playersDraw,
    currentWord,
    gameInfo
  } = GameReducer;

  return {
    username,
    connection,
    colorPicked,
    toolPicked,
    countDown,
    gamePlay,
    playersDraw,
    currentWord,
    gameInfo
  };
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    playerDrawCanvas: (data) => {
      dispatch(playerDrawCanvas(data));
    }
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(PublicGame);

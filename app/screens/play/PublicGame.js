"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Howl } from "howler";

import GeneralModal from "./GeneralModal";
import CanvasGame from "../../containers/CanvasGame";
import Chat from "../../containers/Chat";
import PlayerList from "../../containers/PlayerList";
import ToolPaint from "../../containers/ToolPaint";

import { Navbar, DrawThumbnail, Timer } from "../../components";

import { playerDrawCanvas } from "../../actions/game";
import { is_touch_device } from '../../utils';

/**
 * @class PublicGame
 * @desc
 */
class PublicGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Play Game!",
      modalOpen: true,
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
      src: ["/assets/music/entrance.mp3"]
    });
    sound.play();
  }

  componentDidMount() {
    const mycanvas = document.getElementById("mycanvas");

    this.setState({
      canvas: {
        width: mycanvas.scrollWidth,
        height: mycanvas.scrollHeight,
      }
    })
  }

  /**
   * Keeps track of the mouse moving over the canvas
   * @param {Object} e
   */
  handleDisplayMouseMove(e) {
    if (!this.state.isPenDown) return;

    const coordinates = is_touch_device() ? e.touches[0] : e;
    const mycanvas = document.getElementById("mycanvas");
    const { top, left } = mycanvas.getBoundingClientRect();
  
    const drawPosition = Object.assign({}, this.state.currentPosition, {
      currentX: (coordinates.clientX - left) * (600 / mycanvas.width),
      currentY: (coordinates.clientY - top) *  (400 / mycanvas.height)
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
        prevX: (coordinates.clientX - left) * (600 / mycanvas.width),
        prevY: (coordinates.clientY - top) *  (400 / mycanvas.height)
      })
    });
  }

  /**
   * The mouse has been pressed down on the canvas
   * @param {Object} e
   */
  handleDisplayMouseDown(e) {
    window.addEventListener("mouseup", this.handleDisplayMouseUp);

    const coordinates = is_touch_device() ? e.touches[0] : e;
    const mycanvas = document.getElementById("mycanvas");
    const { top, left } = mycanvas.getBoundingClientRect();

    this.setState({
      isPenDown: true,
      currentPosition: Object.assign({}, this.state.currentPosition, {
        prevX: (coordinates.clientX - left) * (600 / mycanvas.width),
        prevY: (coordinates.clientY - top) *  (400 / mycanvas.height)
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
    const roomUrl =
      "http://www.localhost:8080/game/" + this.props.gameInfo.roomTag;

    return (
      <div id="play-site">
        <Navbar />
        <Grid>
          <PlayerList />
          <Grid.Row>
            {/*Left column*/}
            <Grid.Column mobile={16} tablet={10} computer={2}>
            <ToolPaint />
              {/* <Card
                link
                header={this.props.currentWord}
                color="purple"
                description={
                  this.props.gamePlay === "waiting" ? (
                    "Not enough players to start"
                  ) : (
                    <Fragment>
                      <Timer time={this.props.countDown} />
                    </Fragment>
                  )
                }
              />
              <Input
                className="clipboard"
                size="mini"
                action={{
                  color: "teal",
                  labelPosition: "right",
                  icon: "copy",
                  content: "Copy"
                }}
                value={roomUrl}
              /> */}
            </Grid.Column>
            {/* Middle column */}
            <Grid.Column mobile={16} tablet={10} computer={10} >
              {this.props.gamePlay === "voting" ? (
                <div className="row">{this.renderPlayerDraws()}</div>
              ) : (
                <div>
                  <Timer className="timer" time={this.props.countDown} />
                  <CanvasGame
                    onMouseMove={this.handleDisplayMouseMove}
                    onMouseDown={this.handleDisplayMouseDown}
                  />
                </div>
              )}
            </Grid.Column>
            {/* Right column */}
            <Grid.Column mobile={4} tablet={4} computer={4}>
              <Chat />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <GeneralModal visibility={this.props.modal} />
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({ playerReducer, gameReducer }) {
  const { username, connection } = playerReducer;
  const {
    colorPicked,
    toolPicked,
    countDown,
    gamePlay,
    playersDraw,
    currentWord,
    gameInfo,
    modal
  } = gameReducer;

  return {
    username,
    connection,
    colorPicked,
    toolPicked,
    countDown,
    gamePlay,
    playersDraw,
    currentWord,
    gameInfo,
    modal
  };
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    playerDrawCanvas: data => {
      dispatch(playerDrawCanvas(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicGame);

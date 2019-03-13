"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button, Card, Image } from "semantic-ui-react";
import { Howl } from "howler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Reactcardstack from "../../containers/react-cards-stack/src";

import GeneralModal from "./GeneralModal";
import CanvasGame from "../../containers/CanvasGame";
import Chat from "../../containers/Chat";
import PlayerList from "../../containers/PlayerList";
import ToolPaint from "../../containers/ToolPaint";

import { Navbar, Timer, Advertisement, Presentator } from "../../components";

import {
  playerDrawCanvas,
  voteDraw,
  hideModal
} from "../../core/game/gameActions";
import { pencilDrinks } from "../../core/player/playerActions";
import { is_touch_device } from "../../utils";

/**
 * @class PublicGame
 * @desc
 */
class PublicGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPenDown: false,
      currentPosition: {
        prevX: null,
        prevY: null
      },
      drawData: null
    };

    this.deckRef = React.createRef();

    // Events
    this.handleDisplayMouseMove = this.handleDisplayMouseMove.bind(this);
    this.handleDisplayMouseUp = this.handleDisplayMouseUp.bind(this);
    this.handleDisplayMouseDown = this.handleDisplayMouseDown.bind(this);
    this.setPrevPosition = this.setPrevPosition.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
    this.drawCoordinates = this.drawCoordinates.bind(this);
    this.goHome = this.goHome.bind(this);

    this.init();
  }

  init() {
    if (!this.props.connection) return this.props.history.push("/");

    var sound = new Howl({
      src: ["/assets/music/entrance.mp3"]
    });
    sound.play();
  }

  /**
   *
   */
  componentDidMount() {
    const mycanvas = document.getElementById("mycanvas");
    if (!mycanvas) return;
    this.setState({
      canvas: {
        width: mycanvas.scrollWidth,
        height: mycanvas.scrollHeight
      }
    });
  }

  /**
   *
   * @param {*} props
   */
  componentWillReceiveProps(props) {
    if (props.snackbar !== this.props.snackbar) {
      if (props.snackbar.level === "error")
        toast.error(props.snackbar.message, {
          position: toast.POSITION.TOP_LEFT
        });
    }
  }

  /**
   *
   */
  goHome() {
    this.props.history.push("/");
    this.props.hideModal();
  }

  /**
   *
   * @param {*} e
   */
  setCurrentPosition(e) {
    const coordinates = is_touch_device() ? e.touches[0] : e;
    const mycanvas = document.getElementById("mycanvas");
    const { top, left } = mycanvas.getBoundingClientRect();

    const draw = Object.assign({}, this.state.currentPosition, {
      currentX: (coordinates.clientX - left) * (600 / mycanvas.width),
      currentY: (coordinates.clientY - top) * (400 / mycanvas.height)
    });

    return draw;
  }

  /**
   *
   * @param {*} e
   */
  setPrevPosition(e) {
    const coordinates = is_touch_device() ? e.touches[0] : e;
    const mycanvas = document.getElementById("mycanvas");
    const { top, left } = mycanvas.getBoundingClientRect();

    this.setState({
      currentPosition: Object.assign({}, this.state.currentPosition, {
        prevX: (coordinates.clientX - left) * (600 / mycanvas.width),
        prevY: (coordinates.clientY - top) * (400 / mycanvas.height)
      })
    });
  }

  /**
   *
   * @param {*} coordinates
   */
  drawCoordinates(coordinates) {
    this.props.playerDrawCanvas({
      coordinates,
      colorPicked: this.props.colorPicked,
      toolPicked: this.props.toolPicked,
      penWidth: this.props.penWidth
    });
  }

  /**
   * Keeps track of the mouse moving over the canvas
   * @param {Object} e
   */
  handleDisplayMouseMove(e) {
    if (!this.state.isPenDown || this.props.toolPicked === "bucket") return;

    const coordinates = this.setCurrentPosition(e);
    this.drawCoordinates(coordinates);
    this.setPrevPosition(e);
  }

  /**
   * The mouse has been pressed down on the canvas
   * @param {Object} e
   */
  handleDisplayMouseDown(e) {
    window.addEventListener("mouseup", this.handleDisplayMouseUp);
    this.setPrevPosition(e);
    this.setState({ isPenDown: true });
  }

  /**
   * The mouse has been stopped from being pressed
   * @param {*} e
   */
  handleDisplayMouseUp(e) {
    const coordinates = this.setCurrentPosition(e);
    this.drawCoordinates(coordinates);
    window.removeEventListener("mouseup", this.handleDisplayMouseUp);
    this.setState({ isPenDown: false });
  }

  /**
   * Display random draw samples
   */
  renderPlayerDraws() {
    function onstackendfn(res) {
      // console.log("onstackedfn", res);
    }

    function accept() {
      const { items, current } = this.deckRef.current.state.stack;
      this.props.voteDraw(items[current].id, 1);
      this.deckRef.current.state.stack.accept();
    }

    function reject() {
      const { items, current } = this.deckRef.current.state.stack;
      this.props.voteDraw(items[current].id, 0);
      this.deckRef.current.state.stack.reject();
    }

    if (this.props.playersDraw.length === 0)
      return (
        <div>
          <Timer className="timer" time={this.props.countDown} />
          Not draws!
        </div>
      );

    return (
      <div>
        <Timer className="timer" time={this.props.countDown} />
        <Reactcardstack
          ref={this.deckRef}
          images={this.props.playersDraw}
          onstackendfn={onstackendfn.bind(this)}
          cancelIcon="/assets/img/tools/thumbs-down.svg"
          acceptIcon="/assets/img/tools/thumbs-up.svg"
          accept={accept.bind(this)}
          reject={reject.bind(this)}
        />
      </div>
    );
  }

  /**
   *
   */
  renderPodium() {
    return this.props.podium.map(({ name, avatar, points }) => (
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src={"/assets/img/avatars/" + avatar + ".png"}
          />
          <Card.Header>{name}</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            <strong>{points}</strong>
          </Card.Description>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    const roomUrl =
      "http://www.localhost:8080/game/" + this.props.gameInfo.roomTag;
    return (
      <div id="play-site">
        <Navbar />
        <Presentator display="false" content="STARTING" />
        <Grid>
          <PlayerList />
          <Grid.Row>
            {/* {roomUrl} */}
            <div className="center">
              <h1 style={{ fontFamily: "ZCOOL QingKe HuangYou" }}>
                {this.props.currentWord}
              </h1>
            </div>
          </Grid.Row>
          <Grid.Row>
            {/*Left column*/}
            <Grid.Column mobile={16} tablet={10} computer={2}>
              <ToolPaint />
            </Grid.Column>
            {/* Middle column */}
            <Grid.Column mobile={16} tablet={10} computer={10}>
              {this.props.gamePlay === "voting" && (
                <div className="row">{this.renderPlayerDraws()}</div>
              )}
              {this.props.gamePlay === "presentating" && (
                <div>
                  <Timer className="timer" time={this.props.countDown} />
                  <Card.Group>{this.renderPodium()}</Card.Group>
                </div>
              )}
              {this.props.gamePlay === "waitting" && (
                <CanvasGame
                  onMouseMove={this.handleDisplayMouseMove}
                  onMouseDown={this.handleDisplayMouseDown}
                />
              )}
              {this.props.gamePlay === "starting" && (
                <Advertisement
                  blocking="/assets/img/pencil-drunk.png"
                  punishment={this.props.pencilDrinks}
                />
              )}
              {this.props.gamePlay === "playing" && (
                <div>
                  <Timer className="timer" time={this.props.countDown} />
                  <CanvasGame
                    onMouseMove={this.handleDisplayMouseMove}
                    onMouseDown={this.handleDisplayMouseDown}
                  />
                </div>
              )}
              {this.props.gamePlay === "finished" && (
                <div>
                  <h1>finished</h1>
                </div>
              )}
            </Grid.Column>
            {/* Right column */}
            <Grid.Column mobile={4} tablet={4} computer={4}>
              <Chat />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ToastContainer />
        <GeneralModal
          visibility={this.props.modal}
          title="Connection error"
          content="You have lost the connection with the actual room, would u like to try reconnect?"
          btn1="Yes"
          btn2="No"
          action2={this.goHome}
        />
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps({
  playerReducer,
  gameReducer,
  socketReducer,
  generalReducer
}) {
  const { username } = playerReducer;
  const { connection } = socketReducer;
  const {
    colorPicked,
    toolPicked,
    countDown,
    gamePlay,
    playersDraw,
    currentWord,
    gameInfo,
    modal,
    penWidth,
    podium
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
    modal,
    penWidth,
    podium,
    snackbar: generalReducer
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
    },
    voteDraw: (draw, feedback) => {
      dispatch(voteDraw(draw, feedback));
    },
    hideModal: () => {
      dispatch(hideModal());
    },
    pencilDrinks: () => {
      dispatch(pencilDrinks());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicGame);

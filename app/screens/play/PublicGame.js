"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image } from "semantic-ui-react";
import { Howl } from "howler";
import { ToastContainer, toast } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";

import Reactcardstack from "../../containers/react-cards-stack/src";
import Modal from "../../components/Modal";
import { ChatModal, DisconnectionModal, PlayerListModal } from "./modals";
import CanvasGame from "../../containers/CanvasGame";
import Chat from "../../containers/Chat";
import PlayerList from "../../containers/PlayerList";
import ToolPaint from "../../containers/ToolPaint";
import Tools from "../../containers/ToolPaint/ToolList";
import MobileOptions from "./MobileOptions";
import GameHeader from "./GameHeader";
import { Navbar, Timer, Advertisement, Presentator } from "../../components";

import {
  playerDrawCanvas,
  voteDraw,
  hideModal
} from "../../core/game/gameActions";
import { pencilDrinks } from "../../core/player/playerActions";
import {
  is_touch_device,
  scalePositionHeight,
  scalePositionX
} from "../../utils";

/**
 * @class PublicGame
 * @desc
 */
class PublicGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPenDown: false,
      chatModal: false,
      userlistModal: false,
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
    this.toggleChatModal = this.toggleChatModal.bind(this);
    this.togglePlayerListModal = this.togglePlayerListModal.bind(this);

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
      if (props.snackbar.level === "error") {
        toast.error(props.snackbar.message, {
          position: toast.POSITION.TOP_LEFT
        });
      } else if (props.snackbar.level === "default") {
        toast.info(`✏️ You won ${props.snackbar.message} points this round`, {
          position: toast.POSITION.TOP_LEFT
        });
      }
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
    const mycanvas = document.getElementById("mycanvas");

    const scaledCoordinates = {
      currentX: scalePositionX(coordinates.currentX, mycanvas.width),
      currentY: scalePositionHeight(coordinates.currentY, mycanvas.height),
      prevX: scalePositionX(coordinates.prevX, mycanvas.width),
      prevY: scalePositionHeight(coordinates.prevY, mycanvas.height)
    };

    this.props.playerDrawCanvas({
      coordinates: scaledCoordinates,
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
          cancelIcon="/assets/img/sad.png"
          acceptIcon="/assets/img/happy.png"
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

  renderCanvasGame() {
    return (
      <CanvasGame
        onMouseMove={this.handleDisplayMouseMove}
        onMouseDown={this.handleDisplayMouseDown}
      />
    );
  }

  /**
   * Opens chat modal
   */
  toggleChatModal() {
    this.setState({
      chatModal: !this.state.chatModal
    });
  }

  /**
   * Opens PlayerList modal
   */
  togglePlayerListModal() {
    this.setState({
      userlistModal: !this.state.userlistModal
    });
  }

  render() {
    const roomUrl =
      "http://www.localhost:8080/game/" + this.props.gameInfo.roomTag;
    return (
      <div id="play-site">
        <Navbar />
        <Presentator display="false" content="STARTING" />
        <div className="row">
          <div id="desktop-playerlist" className="col-lg-2 col-md-2">
            <PlayerList color="white" />
          </div>
          <div className="col-lg-6 col-md-6">
            <GameHeader
              keyword={this.props.currentWord}
              round={this.props.round}
            />
            <Tools />
            {this.props.gamePlay === "voting" && (
              <Modal show="true">{this.renderPlayerDraws()}</Modal>
            )}
            {this.props.gamePlay === "presentating" && (
              <div>
                <Timer className="timer" time={this.props.countDown} />
                {this.renderPodium()}
              </div>
            )}
            {this.props.gamePlay === "waitting" && this.renderCanvasGame()}
            {this.props.gamePlay === "starting" && (
              <Advertisement
                blocking="/assets/img/pencil-drunk.png"
                punishment={this.props.pencilDrinks}
              />
            )}
            {this.props.gamePlay === "playing" && (
              <div>
                <Timer className="timer" time={this.props.countDown} />
                {this.renderCanvasGame()}
              </div>
            )}
            {this.props.gamePlay === "finished" && (
              <div>
                <h1>finished</h1>
              </div>
            )}
            <ToolPaint />
            <MobileOptions
              actions={[this.toggleChatModal, this.togglePlayerListModal]}
            />
          </div>
          <div id="desktop-chat" className="col-lg-3 col-md-3">
            <Chat />
          </div>
        </div>

        <DisconnectionModal show={this.props.modal} />
        <ChatModal
          show={this.state.chatModal}
          handleClose={this.toggleChatModal}
        />
        <PlayerListModal
          show={this.state.userlistModal}
          handleClose={this.togglePlayerListModal}
        />
        <ToastContainer />
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
    podium,
    round
  } = gameReducer;

  return {
    username,
    connection,
    colorPicked,
    toolPicked,
    countDown,
    round,
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

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

import {
  setUsername,
  openPlayerSocketConnection,
  joinGame
} from "../../core/player/playerActions";
import { InputText, PrimaryButton, Navbar } from "../../components";
import GameLoader from "./GameLoader";

const ROOM_INFORMATION_ENDPOINT = "/api/room";

/**
 * @class LINKGAME SCENE
 * @desc
 */
class LinkGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      privacy: false,
      pass: ""
    };

    // Events listeners
    this.onInputChange = this.onInputChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  /**
   *
   * @param {*} props
   */
  componentWillReceiveProps(props) {
    if (props.connection) this.props.history.push("/play");

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
  componentWillMount() {
    const { roomId } = this.props.match.params;

    axios.post(ROOM_INFORMATION_ENDPOINT, {
      roomname: roomId,
    })
      .then(res => {
        const room = res.data;
        if (!room) return this.props.history.push("/");
        this.setState({
          privacy: room.type
        })
      })
      .catch(err => {
        this.props.history.push("/");
      });
  };

  /**
   * Detecs user input changes
   * @param {Object} e
   */
  onInputChange(e) {
    const newUsername = e.target.value;
    this.setState({
      username: newUsername
    });
  }

  /**
   * 
   * @param {*} e 
   */
  onPasswordChange(e) {
    const pass = e.target.value;
    this.setState({
      pass
    });
  }
  
  /**
   * If play button is clicked it will take you
   * to a random room to play!
   */
  onPlayButtonClick() {
    const { roomId } = this.props.match.params;
    
    this.props.setUsername(this.state.username);
    this.props.joinGame(roomId, this.state.pass);
  }

  /**
   * 
   */
  renderPasswordInput() {
    return (
      <InputText
        class="input"
        placeholder="link.pass"
        onChange={this.onPasswordChange}
        username={this.state.pass}
        onKeyPress={this.onSubmit}
      />
    )
  }
  /**
   * If enter key button has been pressed it will trigger
   * the play button
   * @param {Object} e
   */
  onSubmit(e) {
    if (e.key === "Enter") this.onPlayButtonClick();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className='link-menu'>
                <InputText
                  class="input"
                  placeholder="link.input"
                  onChange={this.onInputChange}
                  username={this.state.username}
                  onKeyPress={this.onSubmit}
                />
                {this.state.privacy === "private" && this.renderPasswordInput()}
                <br />
                <PrimaryButton
                  color="blue"
                  value="link.button"
                  onClick={this.onPlayButtonClick}
                />
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
        <GameLoader loading={this.props.loading} content="Loading game" />
      </div>);
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return {
    username: state.playerReducer.username,
    loading: state.socketReducer.loading,
    connection: state.socketReducer.connection,
    snackbar: state.generalReducer
  };
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    setUsername: username => {
      dispatch(setUsername(username));
    },
    openPlayerSocketConnection: () => {
      dispatch(openPlayerSocketConnection());
    },
    joinGame: (roomId, pass) => {
      dispatch(joinGame(roomId, pass));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkGame);

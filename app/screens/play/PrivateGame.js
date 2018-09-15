"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import PlayView from './PublicGame';
import { setUsername, openPlayerSocketConnection, joinPrivateGame } from "../../actions/player";
import { InputText, PrimaryButton, ModalManager } from "../../components";

/**
 * HOMEPAGE COMPONENT VIEW
 */
class PrivateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Home",
      placeholder: "Introduce a nickname",
      username: this.props.username,
      buttonTxt: "Play!",
      privateTxt: "Create Private room",
      displayCanvas: false
    };

    // Events listeners
    this.onInputChange = this.onInputChange.bind(this);
    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

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
   * If play button is clicked it will take you
   * to a random room to play!
   */
  onPlayButtonClick() {
    if (!this.state.username) return false;

    const { roomId } = this.props.match.params;

    this.props.setUsername(this.state.username);
    this.props.joinPrivateGame(roomId);
    this.setState({
      displayCanvas: true
    })
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
    let content;
    if (this.state.displayCanvas) {
      content = <PlayView />;
    } else {
      content = 
      <div className="home-menu">
        <img className="img-responsive" src="/assets/img/logo.png" />
        <ModalManager />
        <InputText
          class="input"
          placeholder={this.state.placeholder}
          onInputChange={this.onInputChange}
          username={this.state.username}
          onKeyPress={this.onSubmit}
        />
        <br />
        <PrimaryButton
          class="play-btn"
          value={this.state.buttonTxt}
          onClick={this.onPlayButtonClick}
        />
      </div>
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return { username: state.PlayerReducer.username };
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => {
      dispatch(setUsername(username));
    },
    openPlayerSocketConnection: () => {
      dispatch(openPlayerSocketConnection());
    },
    joinPrivateGame: (roomId) => {
      dispatch(joinPrivateGame(roomId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateGame);

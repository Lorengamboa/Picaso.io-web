"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import {
  InputText,
  Navbar,
  PrimaryButton,
  CheckBox,
  InputSelect
} from "../../components";
import { createRoom } from "../../core/player/playerActions";

/**
 * @class CreatePage
 * @description: create a new game room
 */
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nickname: "",
        roomName: "",
        numberOfRounds: 3,
        private: false,
        pass: null
      },
      themeList: ["general", "league of legends"],
      roundList: [5, 8, 10]
    };

    //
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.handleNumberOfRoundsChange = this.handleNumberOfRoundsChange.bind(
      this
    );
    this.handlePrivateChange = this.handlePrivateChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  /**
   *
   * @param {*} e
   */
  handleNicknameChange(e) {
    const newValue = e.target.value;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        nickname: newValue
      }
    }));
  }

  /**
   *
   * @param {*} e
   */
  handleRoomNameChange(e) {
    const newValue = e.target.value;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        roomName: newValue
      }
    }));
  }

  /**
   *
   * @param {*} e
   */
  handleNumberOfRoundsChange(e) {
    const newValue = e.target.value;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        numberOfRounds: newValue
      }
    }));
  }

  /**
   *
   * @param {*} e
   */
  handlePrivateChange(e) {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        private: !prevState.form.private
      }
    }));
  }

  /**
   *
   * @param {*} e
   */
  handlePassChange(e) {
    const newValue = e.target.value;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        pass: newValue
      }
    }));
  }

  /**
   *
   */
  handleCreateRoom(e) {
    event.preventDefault();

    const settings = this.state.form;
    this.props.createRoom(settings);
    this.props.history.push("/play");
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="create-menu">
                <InputText
                  name="nickname"
                  className="input"
                  placeholder="Introduce a nickname"
                  defaultValue={this.state.form.nickname}
                  onChange={this.handleNicknameChange}
                />
                <br />
                <InputText
                  name="room"
                  className="input"
                  placeholder="Room name..."
                  defaultValue={this.state.form.roomName}
                  onChange={this.handleRoomNameChange}
                />
                <br />
                <InputSelect list={this.state.themeList} placeholder="choose a theme" />
                <InputSelect list={this.state.roundList} placeholder="number of rounds" />
                <InputText
                  type="password"
                  name="password"
                  className="input"
                  placeholder="password"
                  defaultValue={this.state.form.pass}
                  onChange={this.handlePassChange}
                />
                <br />
                <CheckBox
                  name="private"
                  label="private"
                  value={this.state.form.private}
                  onChange={this.handlePrivateChange}
                />
                <PrimaryButton
                  color="blue"
                  value="create"
                  onClick={this.handleCreateRoom}
                />
              </div>
            </div>
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
function mapStateToProps(state) {
  return {};
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    createRoom: settings => {
      dispatch(createRoom(settings));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePage);

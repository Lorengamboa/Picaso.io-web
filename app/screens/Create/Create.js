"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  InputText,
  Navbar,
  PrimaryButton,
  CheckBox,
  InputSelect,
} from "../../components";
import { createRoom } from "../../core/player/playerActions";
import GameLoader from "./GameLoader";

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
        numberOfRounds: null,
        theme: "",
        privacy: false,
        pass: ""
      },
      themeList: ["general", "league of legends"],
      roundList: [5, 8, 10]
    };

    // attach events
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.handleNumberOfRoundsChange = this.handleNumberOfRoundsChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handlePrivateChange = this.handlePrivateChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
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
  handleThemeChange(e) {
    const newValue = e.target.value;
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        theme: newValue
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
        privacy: !prevState.form.privacy,
        pass: null
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
    const { nickname, numberOfRounds, theme, pass, privacy, roomName } = settings;

    if(!nickname || !roomName || !numberOfRounds || !theme) {
      return toast.error("fill the needed gaps", {
        position: toast.POSITION.TOP_LEFT
      });
    };

    if(privacy && !pass) {
      return toast.error("Introduce a password", {
        position: toast.POSITION.TOP_LEFT
      });
    }

    this.props.createRoom(settings);
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
                  placeholder="create.input1"
                  defaultValue={this.state.form.nickname}
                  onChange={this.handleNicknameChange}
                />
                <br />
                <InputText
                  name="room"
                  className="input"
                  placeholder="create.input2"
                  defaultValue={this.state.form.roomName}
                  onChange={this.handleRoomNameChange}
                />
                <br />
                <InputSelect onChange={this.handleNumberOfRoundsChange} list={this.state.themeList} placeholder="create.select1" />
                <InputSelect onChange={this.handleThemeChange} list={this.state.roundList} placeholder="create.select2" />
                <InputText
                  type="password"
                  name="password"
                  className="input"
                  placeholder="create.input3"
                  disabled={!this.state.form.privacy}
                  defaultValue={this.state.form.pass}
                  onChange={this.handlePassChange}
                />
                <br />
                <CheckBox
                  name="private"
                  label="create.checkbox"
                  value={this.state.form.privacy}
                  onClick={this.handlePrivateChange}
                />
                <PrimaryButton
                  color="blue"
                  value="create.button"
                  onClick={this.handleCreateRoom}
                />
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
        <GameLoader loading={this.props.loading} content="Loading game" />
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return {
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
    createRoom: settings => {
      dispatch(createRoom(settings));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePage);

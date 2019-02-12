"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Select, Grid, Checkbox } from 'semantic-ui-react'

import { createRoom } from "../core/game/gameActions";
import { PrimaryButton, Navbar } from "../components";

/**
 * CREATEPAGE COMPONENT VIEW
 */
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nickname: '',
        roomName: '',
        numberOfRounds: 3,
        private: false,
        pass: null
      }
    };

    //
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.handleNumberOfRoundsChange = this.handleNumberOfRoundsChange.bind(this);
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
      <div id="create-site">
        <Navbar />
        <div className="create-menu">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Input name="nickname"
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Introduce a nickname'
                    defaultValue={this.state.form.nickname}
                    onChange={this.handleNicknameChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Input name="room"
                    fluid
                    icon='users'
                    iconPosition='left'
                    placeholder='Room name...'
                    defaultValue={this.state.form.roomName}
                    onChange={this.handleRoomNameChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Select name="rounds"
                    fluid
                    placeholder='Select number of rounds'
                    options={[{ key: '1', value: '1', text: '1' },{ key: '3', value: '3', text: '3' },{ key: '5', value: '5', text: '5' },{ key: '7', value: '7', text: '7' }]}
                    onChange={this.handleNumberOfRoundsChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Checkbox name="private"
                    label='Check to make it private'
                    defaultValue={this.state.form.private}
                    onChange={this.handlePrivateChange}
                  />
                  {'\u00A0'}{'\u00A0'}
                  <Input name="password"
                    size='mini'
                    icon='lock'
                    iconPosition='left'
                    placeholder='Search users...'
                    defaultValue={this.state.form.pass}
                    onChange={this.handlePassChange}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <PrimaryButton
                    className="button-primary"
                    value="create"
                    onClick={this.handleCreateRoom}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
  return { };
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (settings) => {
      dispatch(createRoom(settings));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);

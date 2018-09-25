"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Select, Grid, Checkbox } from 'semantic-ui-react'

import { PrimaryButton, Navbar } from "../components";

/**
 * CREATEPAGE COMPONENT VIEW
 */
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Home",
      placeholder: "Introduce a nickname",
      playBtn: "Play Now!",
      privateBtn: "Create a private game"
    };
  }
  render() {
    return (
      <div id="create-site">
        <Navbar />
        <div className="create-menu">
          <Grid>
            <Grid.Row>
              <Grid.Column><Input fluid icon='user' iconPosition='left' placeholder='Introduce a nickname' /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column><Input fluid icon='users' iconPosition='left' placeholder='Room name...' /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column><Select fluid placeholder='Select number of rounnds' options={[1, 2, 3, 4, 5, 6]} /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Checkbox label='Check to make it private' readOnly />
                {'\u00A0'}{'\u00A0'} <Input size='mini' icon='lock' iconPosition='left' placeholder='Search users...' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column><PrimaryButton className="button-primary" value="create" /></Grid.Column>
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
  return { username: state.PlayerReducer.username };
}

export default connect(
  mapStateToProps,
  null
)(CreatePage);

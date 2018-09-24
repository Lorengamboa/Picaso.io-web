"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Menu, Table, Grid } from 'semantic-ui-react'
import axios from 'axios';

import { setUsername, openPlayerSocketConnection } from "../actions/player";
import { Navbar } from "../components";

const ROOMS_AVAILABLE_ENDPOINT = "/api/rooms_available";

/**
 * SEARCHPAGE COMPONENT VIEW
 */
class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      loadingRoom: false
    };
  }

  /**
   * 
   */
  componentWillMount() {
    axios.get(ROOMS_AVAILABLE_ENDPOINT)
      .then(res => {
        const roomsAvailable = res.data;
        this.setState({
          rooms: roomsAvailable || this.state.rooms,
          loadingRoom: false
        });
      })
      .catch(err => {
        this.setState({
          loadingRoom: false
        });
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
   * If enter key button has been pressed it will trigger
   * the play button
   * @param {Object} e
   */
  onSubmit(e) {
    if (e.key === "Enter") this.onPlayButtonClick();
  }

  /**
   * 
   */
  renderTable() {
    if (!this.state.rooms === 0) return;
    console.log(this.state.rooms);

    return this.state.rooms.map(room => {
      return (
        <Table.Row>
          <Table.Cell>{room.name}</Table.Cell>
          <Table.Cell>{room.players.length}</Table.Cell>
          <Table.Cell>
            <a href={'/game/' + room.name}>
                Enter
            </a>
          </Table.Cell>
        </Table.Row>);
    });
  }

  render() {
    return (
      <div id="find-site">
        <Navbar />
        <Grid>
          <Grid.Row>
            <Grid.Column width={18}>
              <Table celled className='find-content'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Room Name</Table.HeaderCell>
                    <Table.HeaderCell>Number of Players</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.renderTable()}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                      <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                          <Icon name='chevron left' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                          <Icon name='chevron right' />
                        </Menu.Item>
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
    setUsername: (name) => {
      dispatch(setUsername(name));
    },
    openPlayerSocketConnection: (data) => {
      dispatch(openPlayerSocketConnection(data));
    },
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(SearchPage);

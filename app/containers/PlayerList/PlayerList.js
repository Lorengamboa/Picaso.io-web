"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, List } from 'semantic-ui-react'

/**
 * @class UserList
 * @desc List of players that is currently playing in a specific game
 */
class PlayerList extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Draws the playerlist
   */
  drawPlayerList() {
    return this.props.playerList.map((player, key) => (
      <List.Item key={key}>
        <Image avatar src={'/assets/img/avatars/'+ player.avatar + '.png'} />
        <List.Content>
          <List.Header>{player.name}</List.Header>
          {player.points} points
        </List.Content>
      </List.Item>
    ));
  }
  //
  render() {
    return (
      <List horizontal ordered size="big">
        {this.drawPlayerList()}
      </List>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return { playerList: state.gameReducer.playerList };
}

export default connect(
  mapStateToProps,
  null
)(PlayerList);

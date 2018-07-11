"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

/**
 * @class UserList
 * @desc List of players that is currently playing in a specific game
 */
class UserList extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Draws the playerlist
   */
  drawPlayerList() {
    return this.props.playerList.map((player, key) => (
      <li key={key}>
        <a className="thumbnail" style={{ backgroundColor: player.color }} />
        <div className="content">
          <p>{player.name}</p>
          <span>0 points</span>
        </div>
      </li>
    ));
  }

  render() {
    return (
      <div className="chatlist">
        <ul>{this.drawPlayerList()}</ul>
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return { playerList: state.GameReducer.playerList };
}

export default connect(
  mapStateToProps,
  null
)(UserList);

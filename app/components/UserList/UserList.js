"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Label } from 'semantic-ui-react'


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
        <a class={`ui ${player.color} big image label`}>
          <img src='https://react.semantic-ui.com/images/avatar/small/veronika.jpg' />{player.name}<div class='detail'>Guest</div>
        </a>
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

"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import style from './styles';

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
      <div key={key} style={style.player(player.color)}>
        <img style={style.image} src={'/assets/img/avatars/'+ player.avatar + '.png'} />
        <div style={style.content}>
          {player.device === "mobile" && "📱" }{player.name}
          <span style={style.span}>{player.points} points</span>
        </div>
      </div>
    ));
  }
  //
  render() {
    return (
      <div>
        {this.drawPlayerList()}
      </div>
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

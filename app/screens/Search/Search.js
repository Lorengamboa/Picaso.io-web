"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { Navbar } from "../../components";
import styles from "./styles";

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
   * Makes an http request to know the avaiable games (private & non-private ones)
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
   * Renders all the avaiable games
   */
  renderTable() {
    if (this.state.rooms.length === 0) return (
      <tr style={styles.tr}>
       <th>There are not available games</th><th></th><th></th><th></th>
      </tr>
    );

    return this.state.rooms.map(room => {
      return (
        <tr style={styles.tr}>
          <th>{room.type === "private" && "🔒"}</th>
          <th>{room.name}</th>
          <th>{room.players.length}</th>
          <th>
            <a href={'/game/' + room.name}>
              Enter
            </a>
          </th>
        </tr>);
    });
  }
  
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <table className='find-content'>
                <tbody>
                  <tr style={styles.th}>
                    <th>Type</th>
                    <th>Room Name</th>
                    <th>Number of Players</th>
                    <th>Actions</th>
                  </tr>
                  {this.renderTable()}
                </tbody>
              </table>
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
  return { };
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = () => {
  return {
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(SearchPage);

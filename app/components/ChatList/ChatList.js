"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, InfoMessage } from "../common";
import { playerSendMessage } from '../../actions/game';
import chatListStyles from "./styles";


/**
 * @class ChatList
 * @desc
 */
export class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      placeholder: "write your message"
    };

    // Event Listeners
    this.onSubmit = this.onSubmit.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  renderMessages() {
    return this.props.messages.map(message => {
      // Receives message from player
      if (message.type === "player") {
        const { msg, userColor, username } = message;
        return (
          <Message message={message.message} username={username} userColor={userColor} />
        );
      }
      // Receives message from general chat
      else if (message.type === "general") {
        const { data, color } = message;
        return <InfoMessage message={data} color={color} />;
      }
    });
  }

  /**
   * Submit message if enter key is pressed
   */
  onSubmit(e) {
    if (e.key === "Enter") {
      this.props.playerSendMessage(this.state.text);
      this.setState({
        text: ""
      });
    }
  }

  /**
   * If the textfield detects changes it will automaticly change its state value
   * @param {Object} e
   */
  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div style={chatListStyles.container}>
        <div style={chatListStyles.messagesBlock}>{this.renderMessages()}</div>
        <textarea
          style={chatListStyles.inputMessage}
          placeholder={this.state.placeholder}
          onChange={this.updateText}
          value={this.state.text}
          onKeyPress={this.onSubmit}
        />
      </div>
    );
  }
}

/**
 * The component will subscribe to Redux store updates.
 * @param {store}
 */
function mapStateToProps(state) {
  return { messages: state.GameReducer.messages };
}

export default connect(
  mapStateToProps,
  { playerSendMessage }
)(ChatList);

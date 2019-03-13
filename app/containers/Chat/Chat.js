"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, InfoMessage } from "../../components";
import { playerSendMessage } from '../../core/game/gameActions';
import { displaySnackBar } from '../../core/general/generalActions';
import chatListStyles from "./styles";


/**
 * @class Chart
 * @desc
 */
export class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      placeholder: "write your message"
    };

    // Event Listeners
    this.sendMessage = this.sendMessage.bind(this);
    this.updateText = this.updateText.bind(this);
    this.scrollChatToBot = this.scrollChatToBot.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.messages) this.scrollChatToBot();
  }

  scrollChatToBot() {
    const messages = this.refs.messagesRef;
    setTimeout(function() {
      messages.scrollTop = messages.scrollHeight;
    }, 0);
    
  }

  renderMessages() {
    return this.props.messages.map((message, key) => {
      // Receives message from player
      if (message.type === "player") {
        const { msg, userColor, username, avatar } = message;
        return (
          <Message key={key} avatar={avatar} message={msg} username={username} userColor={userColor} />
        );
      }
      // Receives message from general chat
      else if (message.type === "general") {
        const { data, color } = message;
        return <InfoMessage key={key} message={data} color={color} />;
      }
    });
  }

  /**
   * Submit message if enter key is pressed
   */
  sendMessage(e) {
    // if enter key is pressed
    if (e.key === "Enter") {
      // the msg is not blank at all
      if (/^\s*$/.test(this.state.text)) {
         this.props.displaySnackBar(50)
      }
      else if(this.state.text.length > 60) {
        this.props.displaySnackBar(40)
      }
      else this.props.playerSendMessage(this.state.text);
      
      this.setState({
        text: "",
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
        <div ref="messagesRef" style={chatListStyles.messagesBlock}>{this.renderMessages()}</div>
        <textarea
          style={chatListStyles.inputMessage}
          placeholder={this.state.placeholder}
          onChange={this.updateText}
          value={this.state.text}
          onKeyUp={this.sendMessage}
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
  return { messages: state.gameReducer.messages };
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    playerSendMessage: (message) => {
      dispatch(playerSendMessage(message));
    },
    displaySnackBar: (msg) => {
      dispatch(displaySnackBar(msg));
    }
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Chat);

'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, InfoMessage } from '../common';
import chatListStyles from './styles';

const SOCKET_EVENTS = {
  RECEIVE_NEW_MESSAGE: 'newMessage',
  RECEIVE_GENERAL_MESSAGE: 'informMessage'
}

/**
 * @class ChatList
 * @desc
 */
class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      messages: [],
      placeholder: 'write your message'
    };

    // Event Listeners
    this.onSubmit = this.onSubmit.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    // Receives a message from gameroom update
    this.props.socket.on(SOCKET_EVENTS.RECEIVE_NEW_MESSAGE, ({ msg, userColor }) => {
      let newMessage = <Message message={msg} userColor={userColor} />;
      this.setState({
        messages: [...this.state.messages, newMessage],
        text: ''
      });
    });

    // Receives a message from gameroom update
    this.props.socket.on(SOCKET_EVENTS.RECEIVE_GENERAL_MESSAGE, ({ data, color }) => {
      let newMessage = <InfoMessage message={data} color={color} />;
      this.setState({
        messages: [...this.state.messages, newMessage],
        text: ''
      });
    });
  }

  /**
   * Submit message if enter key is pressed
   */
  onSubmit(e) {
    if (e.key === 'Enter') {
      this.props.socket.emit('sendMessage', this.state.text);
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
        <div style={chatListStyles.messagesBlock}>{this.state.messages}</div>
        <textarea
          style={chatListStyles.inputMessage}
          placeholder={this.state.placeholder}
          onChange={this.updateText}
          value={this.state.text}
          onKeyPress={this.onSubmit}>
        </textarea>
      </div>
    );
  }
}

/**
 * 
 * @param {*} state 
 */
function mapStateToProps(state) {
  return { socket: state.PlayerReducer.socket };
}

export default connect(mapStateToProps, {})(ChatList);

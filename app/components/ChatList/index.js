'use strict';

import React, { Component } from 'react';
import chatListStyles from './styles';
import { Message } from '../common';

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      messages: []
    };

    // Event Listeners
    this.onSubmit = this.onSubmit.bind(this);
    this.updateText = this.updateText.bind(this);

    // Receives a message from gameroom update
    this.props.socket.on('newMessage', msg => {
      let newMessage = <Message message={msg} />;
      this.setState({
        messages: [...this.state.messages, newMessage],
        text: ''
      });
    });

  }

  onSubmit(e) {
    e.preventDefault();
    this.props.socket.emit('sendMessage', this.state.text);
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div style={chatListStyles.container}>
        <div style={chatListStyles.messagesBlock}>{this.state.messages}</div>
        <textarea style={chatListStyles.inputMessage} placeholder="Write your message" onChange={this.updateText} value={this.state.text}></textarea>
        <button onClick={this.onSubmit}>Send</button>
      </div>
    );
  }
}

const NewMessage = ({ message }) => (
  <div className="chatMessage">{message}</div>
);

export default ChatList;
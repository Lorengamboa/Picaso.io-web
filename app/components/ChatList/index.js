'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import chatListStyles from './styles';
import { Message, InfoMessage, EmojiList } from '../common';

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
    this.onEmojiClick = this.onEmojiClick.bind(this);
  }

  componentDidMount() {
    // Receives a message from gameroom update
    this.props.socket.on('newMessage', ({ msg, userColor }) => {
      let newMessage = <Message message={msg} userColor={userColor} />;
      this.setState({
        messages: [...this.state.messages, newMessage],
        text: ''
      });
    });

    // Receives a message from gameroom update
    this.props.socket.on('informMessage', ({ data, color }) => {
      let newMessage = <InfoMessage message={data} color={color} />;
      this.setState({
        messages: [...this.state.messages, newMessage],
        text: ''
      });
    });
  }

  onEmojiClick(code, emoji) {
    let emojiPic = jsme
  }

  onSubmit(e) {
    if (e.key === 'Enter') {
      this.props.socket.emit('sendMessage', this.state.text);
    }
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
        <textarea
          style={chatListStyles.inputMessage}
          placeholder="Write your message"
          onChange={this.updateText}
          value={this.state.text}
          onKeyPress={this.onSubmit}>
        </textarea>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { socket: state.PlayerReducer.socket };
}

export default connect(mapStateToProps, {})(ChatList);


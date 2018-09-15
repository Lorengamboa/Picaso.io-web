'use strict';

import React from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function EmojiList(props) {

  const { handleEmojiClick,toogleEmojiState } = props;

  return (
      <div>
        <span id="show-emoji-yes" onClick={toogleEmojiState}>{'😎'}</span>
        <div className="emoji-table">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      </div>
  );
}
'use strict';

import React from 'react';
import messageStyles from './styles';

const Message = ({ message }) => (
    <div className="chatMessage" styles={messageStyles} >{message}</div>
);

export default Message;
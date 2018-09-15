'use strict';

import React from 'react';
import messageStyles from './styles';

/**
 * User Message component
 */
const Message = ({ message, color, username, userColor }) => (
    <div style={messageStyles.container(color)}>
            <span style={messageStyles.username(userColor)}>{username}</span>
            <span>: {message}</span>
    </div>
);

export default Message;
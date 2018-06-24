'use strict';

import React from 'react';
import messageStyles from './styles';

/**
 * User Message component
 */
const Message = ({ message, color, userColor }) => (
    <div className="chatMessage"
        style={messageStyles.container(color)}>
        <div style={messageStyles.userIcon(userColor)}></div>
        <div style={messageStyles.message}>
            {message}
        </div>
    </div>
);

export default Message;
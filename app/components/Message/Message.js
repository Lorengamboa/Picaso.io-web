'use strict';

import React from 'react';
import messageStyles from './styles';
import { Image } from 'semantic-ui-react'

/**
 * User Message component
 */
const Message = ({ message, color, username, userColor, avatar }) => (
    <div style={messageStyles.container(color)}>
             <Image avatar src={'/assets/img/avatars/'+ avatar + '.png'} />
            <span style={messageStyles.username(userColor)}>{username}</span>
            <span>: {message}</span>
    </div>
);

export default Message;
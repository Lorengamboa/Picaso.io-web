'use strict';

import React from 'react';
import infoMessageStyles from './styles';

/**
 * InfoMessage component
 */
const InfoMessage = ({ message, color }) => (
    <div className="chatMessage"
        style={infoMessageStyles.container(color)}>
        {message}
    </div>
);

export default InfoMessage;
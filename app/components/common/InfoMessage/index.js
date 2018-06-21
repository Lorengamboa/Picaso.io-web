'use strict';

import React from 'react';

const InfoMessage = ({ message, color }) => (
    <div className="chatMessage"
        style={{
            color,
            display: "flex",
            alignItems: "center",
            marginBottom: "10px"
        }}>
        {message}
    </div>
);

export default InfoMessage;
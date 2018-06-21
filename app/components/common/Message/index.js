'use strict';

import React from 'react';
import messageStyles from './styles';

const Message = ({ message, color, userColor }) => (
    <div className="chatMessage"
        style={{
            color,
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            backgroundColor: "#f6f6f6",
            borderRadius: "12px"
        }}>
        <div style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            backgroundColor: userColor
        }}></div>
        <div style={{
            marginLeft: "5px"
        }}>
            {message}
        </div>
    </div>
);

export default Message;
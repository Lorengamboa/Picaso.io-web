'use strict';

import React from 'react';

const Timer = props => {
    const { time } = props;
    return (
        <span>{time}</span>
    )
}

export default Timer;



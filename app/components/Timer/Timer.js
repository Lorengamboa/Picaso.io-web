'use strict';

import React from 'react';

const Timer = props => {
    const { time } = props;
    return (
        <a style={{fontSize: "3em"}}>{time}</a>
    )
}

export default Timer;



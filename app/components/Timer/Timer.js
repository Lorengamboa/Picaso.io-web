'use strict';

import React from 'react';

const Timer = props => {
    const { time, className } = props;
    return (
        <a className={className} style={{fontSize: "1em"}}>{time}</a>
    )
}

export default Timer;



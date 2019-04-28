'use strict';

import React from 'react';

const Timer = props => {
    const { time, className } = props;
    return (
        <a className={className} style={{fontSize: "1em", fontFamily: "'Press Start 2P', cursive"}}>{time}</a>
    )
}

export default Timer;



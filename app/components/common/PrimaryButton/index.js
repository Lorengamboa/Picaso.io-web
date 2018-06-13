'use strict';

import React from 'react';

const PrimaryButton = props => {
    return (
        <input 
            type="button" 
            className={props.class}
            onClick={props.onClick}
            value={props.value}
        />
    )
}

export default PrimaryButton;
'use strict';

import React from 'react';

const InputText = props => {
    const { placeholder, onInputChange, username } = props;
    return (
        <input 
            type="text"
            placeholder={placeholder}
            onChange={onInputChange}
            value={username} 
        />
    )
}

export default InputText;
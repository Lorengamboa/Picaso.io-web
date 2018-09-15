'use strict';

import React from 'react';

/**
 * InputText component
 */
const InputText = props => {
    const { placeholder, onInputChange, username, onKeyPress } = props;
    return (
        <input 
            type="text"
            placeholder={placeholder}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
            value={username} 
        />
    )
}

export default InputText;
'use strict';

import React from 'react';
import { injectIntl } from 'react-intl';
import styles from './styles';

/**
 * InputText component
 */
const InputText = props => {
    const { placeholder, onInputChange, username, onKeyPress, intl } = props;
    const intlPlaceholder = intl.formatMessage({id: [placeholder]});

    return (
        <input 
            style={styles.input}
            type="text"
            placeholder={intlPlaceholder}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
            value={username} 
        />
    )
}

export default injectIntl(InputText);

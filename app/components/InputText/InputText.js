'use strict';

import React from 'react';
import { injectIntl } from 'react-intl';
import styles from './styles';

/**
 * InputText component
 */
const InputText = props => {
    const { placeholder, onChange, username, onKeyPress, intl, disabled } = props;
    const intlPlaceholder = intl.formatMessage({id: [placeholder]});
    const type = props.type ? props.type : "text";

    return (
        <input 
            disabled={disabled}
            style={styles.input}
            type={type}
            placeholder={intlPlaceholder}
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={username} 
        />
    )
}

export default injectIntl(InputText);

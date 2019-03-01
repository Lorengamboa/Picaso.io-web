'use strict';

import React from 'react';
import { Button } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

const PrimaryButton = props => {
    const intlValue = <FormattedMessage id={props.value} />;
    return (
        <Button 
            className={props.className}
            color={props.color}
            onClick={props.onClick}
            content={intlValue}
            size='massive'
            fluid
        />
    )
}

export default PrimaryButton;
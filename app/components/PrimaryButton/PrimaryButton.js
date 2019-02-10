'use strict';

import React from 'react';
import { Button } from 'semantic-ui-react';

const PrimaryButton = props => {
    return (
        <Button 
            className={props.className}
            color={props.color}
            onClick={props.onClick}
            content={props.value}
            size='massive'
            fluid
        />
    )
}

export default PrimaryButton;
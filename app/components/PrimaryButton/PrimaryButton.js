'use strict';

import React from 'react';
import { Button } from 'semantic-ui-react';

const PrimaryButton = props => {
    return (
        <Button 
            basic
            color={props.color}
            onClick={props.onClick}
            content={props.value}
            size='massive'
            fluid
        />
    )
}

export default PrimaryButton;
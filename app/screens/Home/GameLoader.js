"use strict";

import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";


/**
 * 
 * @param {*} props 
 */
const GameLoader = (props) => {
  return (
    <Dimmer active={props.loading}>
        <Loader indeterminate>{props.content}</Loader>
    </Dimmer>
  );
};

export default GameLoader;



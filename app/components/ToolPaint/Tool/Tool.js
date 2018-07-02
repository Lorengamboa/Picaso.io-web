'use strict';

import React from 'react';

/**
 * @class Tool
 * @desc Drawing Tool
 */
const Tool = props => {
  return <img id={props.type} onClick={props.onClick} src={props.src} />;
};

export default Tool;

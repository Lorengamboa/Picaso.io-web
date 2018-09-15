'use strict';

import React from 'react';

/**
 * @class Tool
 * @desc Drawing Tool
 */
const Tool = props => {
  return <img id={props.type} className="icon-tool" onClick={props.onClick} src={props.src} />;
};

export default Tool;

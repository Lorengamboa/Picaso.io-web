'use strict';

import React from 'react';
import styles from './styles';

/**
 * @class Tool
 * @desc Drawing Tool
 */
const Tool = props => {
  return <img style={styles.tool} id={props.type} onClick={props.onClick} src={props.src} />;
};

export default Tool;

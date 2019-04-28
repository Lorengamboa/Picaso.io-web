"use strict";

import React from "react";
import styles from "./styles";
import { FormattedMessage } from "react-intl";

const PrimaryButton = props => {
  const intlValue = <FormattedMessage id={props.value} />;
  return (
    <button style={{ ...styles.button(props.color),...props.style }} onClick={props.onClick}>
      {intlValue}
    </button>
  );
};

export default PrimaryButton;

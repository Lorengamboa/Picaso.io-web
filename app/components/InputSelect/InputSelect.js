"use strict";

import React from "react";
import styles from "./styles";
import { injectIntl } from 'react-intl';

/**
 * InputText component
 */
const InputSelect = props => {
  const { intl, placeholder, onChange } = props;
  const intlPlaceholder = intl.formatMessage({id: [placeholder]});

  const renderOptionList = () => {
    return props.list.map((option, id) => {
      return (
        <option key={id} value={option}>
          {option}
        </option>
      );
    });
  };
  return (
    <select style={styles.select} name="rounds" onChange={onChange} defaultValue={intlPlaceholder}>
      <option  disabled="disabled">
        {intlPlaceholder}
      </option>
      {renderOptionList()}
    </select>
  );
};


export default injectIntl(InputSelect);


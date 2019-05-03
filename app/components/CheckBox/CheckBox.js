import React from "react";
import "!style-loader!css-loader!./style.css";
import { injectIntl } from 'react-intl';

/**
 * Footer component
 */
const CheckBox = props => {
  const { intl, label } = props;
  const intlLabel = intl.formatMessage({id: [label]});

  return (
    <div className="checkbox">
      <div className="block">
        <span>{intlLabel}</span>
        <input id={intlLabel} data-index="0" type="checkbox" checked={props.value} onChange={props.onClick} />
        <label htmlFor={intlLabel} />
      </div>
    </div>
  );
};

export default injectIntl(CheckBox);

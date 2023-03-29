import React from 'react';

import { MAX_LENGTH_MONEY_INPUT } from 'utils/transactions/constants';

import FormMoneyInputGroup from 'components/common/FormMoneyInputGroup';

const FormMoneyInput = (props) => (
  <FormMoneyInputGroup
    maxLength={MAX_LENGTH_MONEY_INPUT}
    {...props}
  />
);

export default FormMoneyInput;

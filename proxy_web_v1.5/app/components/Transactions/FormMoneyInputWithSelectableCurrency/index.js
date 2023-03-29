import React from 'react';

import { MAX_LENGTH_MONEY_INPUT } from 'utils/transactions/constants';

import FormMoneyInputGroup from 'components/common/FormMoneyInputGroup';
import CurrencyInputGroup from './CurrencyInputGroup';

const FormMoneyInputWithSelectableCurrency = (props) => (
  <FormMoneyInputGroup
    maxLength={MAX_LENGTH_MONEY_INPUT}
    customInput={CurrencyInputGroup}
    {...props}
  />
);

export default FormMoneyInputWithSelectableCurrency;

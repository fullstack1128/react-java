import React from 'react';

import {
  formatCurrencyWithDecimals,
} from 'utils/numberHelper';

const DisplayMoneyWithCurrency = ({ amount, currencyUnit }) => (
  <div>
    {formatCurrencyWithDecimals(amount)} {currencyUnit}
  </div>
);

export default DisplayMoneyWithCurrency;

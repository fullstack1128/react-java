import get from 'lodash/get';

import { formatCurrencyRounded } from 'utils/numberHelper';
import { DEFAULT_CURRENCY_UNIT } from 'utils/transactions/constants';

export const getCurrency = (currencies) => currencies ? get(currencies[0], 'id', '') : '';

export const getCurrencyUnit = (selectedCurrencyID, currencies) => {
  const currency = currencies.find((e) => e.id === selectedCurrencyID);
  return get(currency, 'value', DEFAULT_CURRENCY_UNIT);
};

export const formatCurrency = (amount, currencyUnit = DEFAULT_CURRENCY_UNIT) => (
  amount ? `${formatCurrencyRounded(amount)} ${currencyUnit.toUpperCase()}` : ''
);

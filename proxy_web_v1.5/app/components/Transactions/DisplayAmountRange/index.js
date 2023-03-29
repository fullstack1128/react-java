import React, { Fragment } from 'react';
import { formatCurrencyWithDecimals } from 'utils/numberHelper';
import { getCurrencyName } from 'enums/ECurrency';
import isNil from 'lodash/isNil';

const DisplayAmountRange = ({ minAmount, maxAmount, currencyId, isShowCurrency = false, isInline = true }) => {
  if (isNil(minAmount)) {
    return (<Fragment>{formatCurrencyWithDecimals(maxAmount)} {currencyId && isShowCurrency && getCurrencyName(currencyId)}</Fragment>);
  }
  return (
    <Fragment>
      {formatCurrencyWithDecimals(minAmount)}
    &nbsp;~&nbsp;
    {isInline
    ? (<Fragment>{formatCurrencyWithDecimals(maxAmount)} {currencyId && isShowCurrency && getCurrencyName(currencyId)}</Fragment>)
    : (<div>{formatCurrencyWithDecimals(maxAmount)} {currencyId && isShowCurrency && getCurrencyName(currencyId) }</div>) }
    </Fragment>
  );
};

export default DisplayAmountRange;

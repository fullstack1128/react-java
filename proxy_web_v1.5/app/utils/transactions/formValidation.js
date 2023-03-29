import numeral from 'numeral';
import isNil from 'lodash/isNil';

import { isIntegerString } from 'utils/numberHelper';

export const allowKeyPressMonthDuration = (keyValue) => {
  if (isIntegerString(keyValue)) return true;
  return false;
};

export const allowKeyPressYearDuration = (keyValue) => {
  if (isIntegerString(keyValue) || keyValue === '.') return true;
  return false;
};

export const allowKeyPressRate = (keyValue) => {
  if (isIntegerString(keyValue) || keyValue === '.') return true;
  return false;
};

export const allowKeyPressDesiredAmount = (keyValue, desiredAmount) => {
  const MAXIMUM_LENGTH_NUMBER = 12;

  if (!isIntegerString(keyValue)) return false;

  const numberValue = numeral(desiredAmount + keyValue).value();

  if (!isNil(numberValue) && numberValue.toString().length > MAXIMUM_LENGTH_NUMBER) return false;

  return true;
};

export const allowKeyPressNumber = (keyValue) => {
  if (!isIntegerString(keyValue)) return false;

  return true;
};

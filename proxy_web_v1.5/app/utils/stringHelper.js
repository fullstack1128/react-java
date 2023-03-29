import { DEFAULT_CURRENCY_UNIT } from './transactions/constants';

export const deleteSpecificChar = (str, char) => str.replace(new RegExp(`\\${char}`, 'g'), '');

export const convertToIntegerNumber = (str) => parseInt(str.replace(/[^0-9]/g, ''), 10);

export const isEmpty = function isEmpty(str) {
  return str === undefined || str === null || (typeof str === 'string' && str.trim().length === 0);
};

export function isNumeric(value) {
  return /^-{0,1}\d+$/.test(value);
}

export const convertLocation = (list) => {
  if (!list || !Array.isArray(list)) return {};

  return list.map((item) => {
    if (isNumeric(item.name)) {
      return {
        ...item,
        name: item.type ? `${item.type} ${item.name}` : item.name,
      };
    }
    return item;
  });
};

export const convertLocationWithType = (list) => {
  if (!list || !Array.isArray(list)) return {};

  return list.map((item) => ({
    ...item,
    name: item.type ? `${item.type} ${item.name}` : item.name,
  }));
};

export const getCurrencyUnit = () => `(${DEFAULT_CURRENCY_UNIT})`;

export default isEmpty;

export const isNumberString = (value) => {
  const regex = new RegExp(/^\d+$/);
  return regex.test(value);
};

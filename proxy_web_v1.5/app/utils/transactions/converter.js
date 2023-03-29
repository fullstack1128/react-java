import omit from 'lodash/omit';
import numeral from 'numeral';
import reduce from 'lodash/reduce';
import isNil from 'lodash/isNil';

import { convertLocation } from '../stringHelper';

export const omitPropertiesInArray = (arr, excludeProperties) => arr.map((item) => omit(item, excludeProperties));

export const convertToYearDuration = (value) => (
  numeral(parseInt(value, 10) / 12).format('0,0.[00]')
);

export const convertToOptions = (list) => {
  const convertedList = convertLocation(list);

  return reduce(convertedList, (result, item) => {
    if (!item.parent) {
      result.push({
        value: item.id,
        label: !isNil(item.value) ? item.value : item.name,
        options: getChildOptions(item.id, convertedList),
        tooltip: item.tooltip,
      });
    }

    return result;
  }, []);
};

export const getChildOptions = (parent, list) => {
  const children = reduce(list, (result, item) => {
    if (item.parent === parent) {
      result.push({
        value: item.id,
        label: item.value,
        options: getChildOptions(item.id, list),
        tooltip: item.tooltip,
      });
    }

    return result;
  }, []);

  return children.length > 0 ? children : undefined;
};

export const flattenOptions = (list) => (
  reduce(list, (result, item) => {
    result.push(item);

    if (item.options) {
      result = result.concat(flattenOptions(item.options));
    }

    return result;
  }, [])
);

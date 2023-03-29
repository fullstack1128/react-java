import { convertToOptions, flattenOptions } from './converter';

export const DEFAULT_MIN_RATE = 0;
export const DEFAULT_MAX_RATE = 0.15;

export const getDefaultPurposeId = (purposes) => {
  if (purposes.length > 0) {
    const options = convertToOptions(purposes);
    const flattedList = flattenOptions(options);
    const defaultOption = flattedList.find((item) => !item.options);

    return defaultOption ? defaultOption.value : '';
  }

  return '';
};

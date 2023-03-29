export const configuration = {
  geoLocation: {
    address: 'Hồ Chí Minh',
    lat: 10.768732,
    lon: 106.701229,
    radius: 100,
  },
  CODE_LENGTH: 6,
  DEFAULT_OTP_DEV: 112233,
};

export const MAX_LENGTH_OTP = 6;
export const MIN_LENGTH_PASSWORD = 8;
export const MAX_LENGTH_PASSWORD = 15;
export const MIN_LENGTH_PHONE = 10;
export const MAX_LENGTH_PHONE = 10;
export const MAX_LENGTH_LAST_NAME = 30;
export const MAX_LENGTH_FIRST_NAME = 30;

export const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])(.+)$/;

export const ENTER_KEY = 'Enter';

export const DEFAULT_PAGE_SIZE = 10;

export const HEIGHT_TABLE = '570px';
export const HEIGHT_TAB_TABLE = '300px';

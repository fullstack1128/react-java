import get from 'lodash/get';
import { errorCode as errorCodes } from './index';
import messages from './messages';
import ApiError from '../../errors/apiError';
import isNil from 'lodash/isNil';
import logger from 'logger';

// TODO multi language
const DEFAULT_MESSAGE = 'Có lỗi trong quá trình xử lý.';

export const getErrorMessageFromError = (error) => {
  console.log(error);
  if (error === undefined) return messages[errorCodes.LOGGED_FAILED];
  // Turn off notify error message when the cause of cancelling Promises was
  if (!isNil(error.isCanceled)) {
    return null;
  }
  if (error.url.includes('users/authentication/email')) {
    return messages[errorCodes.LOGGED_FAILED];
  }
  if (error.url.includes('users/register')) {
    return messages[errorCodes.REGISTER_FAILED];
  }

  const errCode = getErrorCodeFromError(error);

  if (messages[errCode]) {
    return messages[errCode];
  }

  return messages[errorCodes.SOMETHINGS_WENT_WRONG];
};


export const getErrorCodeFromError = (error) => {
  if (error.error) {
    error = error.error;
  }

  if (error instanceof ApiError) {
    return get(error, 'response.payload.code', errorCodes.SOMETHINGS_WENT_WRONG);
  }

  return get(error, 'payload.code', errorCodes.SOMETHINGS_WENT_WRONG);
};

export const getMessageFromError = (error) => {
  if (error instanceof ApiError) {
    return get(error, 'response.payload.message', DEFAULT_MESSAGE);
  }

  return get(error, 'payload.message', DEFAULT_MESSAGE);
};

import { defineMessages } from 'react-intl';
import { errorCode } from './index';

const scope = 'app.responseCode';

export default defineMessages({
  [errorCode.UNAUTHORIZED]: {
    id: `${scope}.${errorCode.UNAUTHORIZED}`,
    defaultMessage: 'Account out of session.',
  },
  [errorCode.TOO_MANY_REQUESTS]: {
    id: `${scope}.${errorCode.TOO_MANY_REQUESTS}`,
    defaultMessage: 'The operation was too fast for a short period of time',
  },
  [errorCode.LOCKED_WHEN_REACH_MAXIMUM_LOGIN_RETRY]: {
    id: `${scope}.${errorCode.LOCKED_WHEN_REACH_MAXIMUM_LOGIN_RETRY}`,
    defaultMessage: 'Operation locked. Please try again in 5 minutes',
  },
  [errorCode.LOCKED_IP_ONE_DAY]: {
    id: `${scope}.${errorCode.LOCKED_IP_ONE_DAY}`,
    defaultMessage: 'You have violated the security policy. Please contact Admin for support.',
  },
  [errorCode.SOMETHINGS_WENT_WRONG]: {
    id: `${scope}.${errorCode.SOMETHINGS_WENT_WRONG}`,
    defaultMessage: 'There was an error in processing. Please contact Admin for support.',
  },
  [errorCode.LOGGED_FAILED]: {
    id: `${scope}.${errorCode.LOGGED_FAILED}`,
    defaultMessage: 'Invalid login information. Please try again!',
  },
  [errorCode.REGISTER_FAILED]: {
    id: `${scope}.${errorCode.REGISTER_FAILED}`,
    defaultMessage: 'The email information used for registration is invalid!',
  },
});

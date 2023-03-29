/*
 *
 * ChangePasswordPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_PASSWORD,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changePassword(params, callbackSuccess, callbackError) {
  return {
    type: CHANGE_PASSWORD,
    params,
    callbackError,
    callbackSuccess,
  };
}

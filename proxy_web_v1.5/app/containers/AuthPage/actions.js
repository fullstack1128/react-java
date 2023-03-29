/*
 *
 * AuthPage actions
 *
 */

import {
  SUBMIT,
  SUBMIT_OTP,
  SUBMIT_FORGOT_PASSWORD_OTP,
  GET_BANKS,
  UPLOAD_AVATAR,
  GET_PROVINCES,
  UPLOAD_CONTRACT_FILE,
  UPLOAD_PHOTO_CARD,
  INIT_DATA_REGISTER,
} from './constants';

/**
 * Sends the request to the API
 * @return {string}
 */
export function submit(data, formType, callbackError, callbackSuccess) {
  return {
    type: SUBMIT, data, formType, callbackError, callbackSuccess,
  };
}

export function submitOTP(phone, callbackError) {
  return {
    type: SUBMIT_OTP, phone, callbackError,
  };
}

export function submitForgotPasswordOTP(phone, callbackError) {
  return {
    type: SUBMIT_FORGOT_PASSWORD_OTP, phone, callbackError,
  };
}

export function getBanks(cbError, cbSuccess) {
  return {
    type: GET_BANKS,
    cbError,
    cbSuccess,
  };
}

export function uploadAvatar(file, cbError, cbSuccess) {
  return {
    type: UPLOAD_AVATAR,
    file,
    cbError,
    cbSuccess,
  };
}

export function uploadPhotoCard(params, cbError, cbSuccess) {
  return {
    type: UPLOAD_PHOTO_CARD,
    params,
    cbError,
    cbSuccess,
  };
}

export function getProvinces(cbError, cbSuccess) {
  return {
    type: GET_PROVINCES,
    cbError,
    cbSuccess,
  };
}

export function uploadContractFile(file, cbError, cbSuccess) {
  return {
    type: UPLOAD_CONTRACT_FILE,
    file,
    cbError,
    cbSuccess,
  };
}

export const initDataRegister = (cbError, cbSuccess) => ({
  type: INIT_DATA_REGISTER,
  cbError,
  cbSuccess,
});

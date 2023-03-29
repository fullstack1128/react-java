import env from 'env';
import request from '../utils/request';
import {
  FORM_TYPE_LOGIN_VI,
  FORM_TYPE_REGISTER_VI,
  FORM_TYPE_CREATE_PASSWORD_VI,
  FORM_TYPE_FORGOT_PASSWORD_VI,
} from 'containers/AuthPage/constants';
import auth from '../utils/auth';
import history from 'utils/history';
import { routes } from 'containers/Routes/routeHelper';

export function submitFormAuthPage(formType, body) {
  let requestURL;

  switch (formType) {
    case FORM_TYPE_LOGIN_VI:
      requestURL = `${env.API_URL}/users/authentication/email`;
      break;

    case FORM_TYPE_REGISTER_VI:
      requestURL = `${env.API_URL}/users/register`;
      break;

    case FORM_TYPE_CREATE_PASSWORD_VI:
      requestURL = `${env.API_URL}/users/change-password`;
      break;

    case FORM_TYPE_FORGOT_PASSWORD_VI:
      requestURL = `${env.API_URL}/users/confirm-otp`;
      break;

    default:
  }

  return request(requestURL, { method: 'POST', body });
}

export function submitOTPForm(phone) {
  const requestURL = `${env.API_URL}/users/verify-code-register`;

  return request(requestURL, { method: 'POST', body: { phone } });
}

export function submitOTPForgotPasswordForm(phone) {
  const requestURL = `${env.API_URL}/users/verify-code-forgot-password`;

  return request(requestURL, { method: 'POST', body: { phone } });
}

export function changePassword({ currentPassword, newPassword }) {
  const requestURL = `${env.API_URL}/users/reset-password`;

  return request(requestURL, { method: 'PUT', body: { currentPassword, newPassword } });
}

export function confirmPassword({ password }) {
  const requestURL = `${env.API_URL}/users/confirm-password`;

  return request(requestURL, { method: 'POST', body: { password } });
}

export function sendOTPToVerifyNewPhone({ phone, verifyCodeType }) {
  const requestURL = `${env.API_URL}/users/verify-code-new-phone`;

  return request(requestURL, { method: 'POST', body: { phone, verifyCodeType } });
}

export function confirmOTP(phone, otpCode) {
  const requestURL = `${env.API_URL}/users/confirm-otp`;

  return request(requestURL, { method: 'POST', body: { phone, code: otpCode } });
}

export function changePhone({ password, phone, code }) {
  const requestURL = `${env.API_URL}/users/change-phone`;

  return request(requestURL, { method: 'POST', body: { password, phone, code } });
}

export const logout = async (redirect) => {
  await request(`${env.API_URL}/users/logout`, { method: 'POST', body: { } });
  auth.clearToken();
  auth.clearUserInfo();
  history.push(redirect || routes.HOME);
};

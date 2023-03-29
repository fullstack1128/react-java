import request from '../utils/request';
import env from 'env';

export function getUserBalance() {
  const requestURL = `${env.API_URL}/users/me`;

  return request(requestURL, { method: 'GET' });
}

export function faq() {
  const requestURL = `${env.API_URL}/users/faq`;

  return request(requestURL, { method: 'GET' });
}

export function changeReminder() {
  const requestURL = `${env.API_URL}/users/change-reminder`;

  return request(requestURL, { method: 'GET' });
}

export function getPromotions() {
  const requestURL = `${env.API_URL}/users/promotions`;

  return request(requestURL, { method: 'GET' });
}

export function changePassword(data) {
  const requestURL = `${env.API_URL}/users/reset-password`;

  return request(requestURL, { method: 'PUT', body: data });
}

export function placeOrderProxy(data) {
  const requestURL = `${env.API_URL}/client/transactions/place-order`;

  return request(requestURL, { method: 'POST', body: data });
}

export function changeIp(data) {
  const requestURL = `${env.API_URL}/client/proxies/change-ip`;

  return request(requestURL, { method: 'POST', body: data });
}

export function rebootDevice(data) {
  const requestURL = `${env.API_URL}/client/proxies/reboot-device`;

  return request(requestURL, { method: 'POST', body: data });
}

export function changeLocation(data) {
  const requestURL = `${env.API_URL}/client/proxies/change-location`;

  return request(requestURL, { method: 'POST', body: data });
}

export function extendLicense(data) {
  const requestURL = `${env.API_URL}/client/proxies/extend-license`;

  return request(requestURL, { method: 'POST', body: data });
}

export function updateAuthenticate(data) {
  const requestURL = `${env.API_URL}/client/proxies/update-authenticate`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getLicenses(data) {
  const requestURL = `${env.API_URL}/client/licenses/list`;

  return request(requestURL, { method: 'POST', body: data });
}


export function getTransactions(data) {
  const requestURL = `${env.API_URL}/client/transactions/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function updateRotationTime(data) {
  const requestURL = `${env.API_URL}/client/licenses/change-rotation-time`;

  return request(requestURL, { method: 'POST', body: data });
}

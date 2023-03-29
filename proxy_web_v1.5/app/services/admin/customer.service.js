import request from '../../utils/request';
import env from 'env';

export function getCustomers(data) {
  const requestURL = `${env.API_URL}/admin/customers/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getCustomer(id) {
  const requestURL = `${env.API_URL}/admin/customers/${id}`;

  return request(requestURL, { method: 'GET' });
}

export function resetPassword(id, newPass) {
  const requestURL = `${env.API_URL}/admin/customers/${id}/reset-password/${newPass}`;

  return request(requestURL, { method: 'POST' });
}

export function changeEmail(id, newEmail) {
  const requestURL = `${env.API_URL}/admin/customers/${id}/change-email/${newEmail}`;

  return request(requestURL, { method: 'POST' });
}

export function topup(id, amount) {
  const requestURL = `${env.API_URL}/admin/customers/${id}/topup/${amount}`;

  return request(requestURL, { method: 'POST' });
}

export function refund(id, amount) {
  const requestURL = `${env.API_URL}/admin/customers/${id}/refund/${amount}`;

  return request(requestURL, { method: 'POST' });
}

import request from '../../utils/request';
import env from 'env';

export function getTransactions(data) {
  const requestURL = `${env.API_URL}/admin/transactions/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getTransaction(id) {
  const requestURL = `${env.API_URL}/admin/transactions/${id}`;

  return request(requestURL, { method: 'GET' });
}

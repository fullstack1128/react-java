import request from '../utils/request';
import env from 'env';

export function getCurrencies() {
  const requestURL = `${env.API_URL}/client/payments/currencies`;

  return request(requestURL, { method: 'GET' });
}

export function getMinAmount(currency) {
  const requestURL = `${env.API_URL}/client/payments/minimum-amount?currency_from=${currency}`;

  return request(requestURL, { method: 'GET' });
}

export function getEstimatedAmount(currency, amount) {
  const requestURL = `${env.API_URL}/client/payments/estimated-price?amount=${amount}&currency_from=usd&currency_to=${currency}`;

  return request(requestURL, { method: 'GET' });
}

export function createTransfer(data) {
  const requestURL = `${env.API_URL}/client/payments/topup`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getPaymentUrl(amount) {
  const requestURL = `${env.API_URL}/client/payments/get-payment-url?amount=${amount}`;

  return request(requestURL, { method: 'GET' });
}

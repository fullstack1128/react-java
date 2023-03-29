import request from '../../utils/request';
import env from 'env';

export function getPermissions() {
  const requestURL = `${env.API_URL}/admin-api/permissions`;

  return request(requestURL, { method: 'GET' });
}

export function getProvinces() {
  const requestURL = `${env.API_URL}/admin-api/provinces`;

  return request(requestURL, { method: 'GET' });
}

export function getDistricts() {
  const requestURL = `${env.API_URL}/admin-api/districts`;

  return request(requestURL, { method: 'GET' });
}

export function getWards() {
  const requestURL = `${env.API_URL}/admin-api/wards`;

  return request(requestURL, { method: 'GET' });
}

export function getGroupFees() {
  const requestURL = `${env.API_URL}/admin-api/group-fees`;

  return request(requestURL, { method: 'GET' });
}

export function getGroupServiceFees() {
  const requestURL = `${env.API_URL}/admin-api/group-service-fees`;

  return request(requestURL, { method: 'GET' });
}

export function getPolicies() {
  const requestURL = `${env.API_URL}/admin-api/policies`;

  return request(requestURL, { method: 'GET' });
}

export function getIntercom() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0006`;

  return request(requestURL, { method: 'GET' });
}

export function getIntercomAir() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0020`;

  return request(requestURL, { method: 'GET' });
}

export function getIntercomDomestic() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0013`;

  return request(requestURL, { method: 'GET' });
}

export function getShippingMethodSea() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0014`;

  return request(requestURL, { method: 'GET' });
}

export function getShippingMethodAir() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0016`;

  return request(requestURL, { method: 'GET' });
}

export function getShippingMethodDomestic() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0022`;

  return request(requestURL, { method: 'GET' });
}

export function getShippingMethodRail() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0018`;

  return request(requestURL, { method: 'GET' });
}

export function getContainerType() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0015`;

  return request(requestURL, { method: 'GET' });
}

export function getCurrencies() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0004`;

  return request(requestURL, { method: 'GET' });
}

export function getCustomerGroup() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0007`;

  return request(requestURL, { method: 'GET' });
}

export function getOffice() {
  const requestURL = `${env.API_URL}/admin-api/office`;

  return request(requestURL, { method: 'GET' });
}

export function getGoodsType() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0010`;

  return request(requestURL, { method: 'GET' });
}


export function getAssociates() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0011`;

  return request(requestURL, { method: 'GET' });
}

export function getPartnerServiceGroup() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0012`;

  return request(requestURL, { method: 'GET' });
}

export function getInsuranceGoodsType() {
  const requestURL = `${env.API_URL}/admin-api/master-data/A0019`;

  return request(requestURL, { method: 'GET' });
}


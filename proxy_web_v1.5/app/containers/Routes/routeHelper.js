// This one will be include all the routes name constants in our Application
// We don't need to make it complicated. Keep it simple first.


export const homePath = '';
export const adminPath = '/admin';
export const userPath = '/user';

export const routes = {
  HOME: `${homePath}/`,

  ADMIN: adminPath,
  NOTIFICATION: `${homePath}/notification`,

  ADMIN_OVERVIEW: `${adminPath}/overview`,

  ADMIN_MODEM: `${adminPath}/modem`,
  ADMIN_MODEM_DETAIL: `${adminPath}/modem-detail/:id`,

  ADMIN_PROXY: `${adminPath}/proxy`,

  ADMIN_CUSTOMER: `${adminPath}/customer`,

  ADMIN_TRANSACTION: `${adminPath}/transaction`,

  ADMIN_CONFIGURATION: `${adminPath}/configuration`,

  ADMIN_LICENSE: `${adminPath}/license`,

  ADMIN_PACKAGE: `${adminPath}/package`,

  ADMIN_MONITOR: `${adminPath}/monitor`,

  CLIENT_DASHBOARD: `${userPath}/dashboard`,

  CLIENT_NEW_MOBILE: `${userPath}/new-mobile`,

  CLIENT_PROXY: `${userPath}/proxy`,

  CLIENT_RECHARGE: `${userPath}/recharge`,

  CLIENT_ACCOUNT: `${userPath}/account`,

  CHANGE_PASSWORD: `${userPath}/change-password`,

  CHANGE_PROFILE: `${userPath}/change-profile`,

  CLIENT_API: `${userPath}/api`,

  CLIENT_FAQ: `${userPath}/faq`,

  CLIENT_AFFILIATE: `${userPath}/affiliate`,
};

import { defineMessages } from 'react-intl';
// import { get, toLower } from 'lodash';
import get from 'lodash/get';
import toLower from 'lodash/toLower';

const scope = 'app.containers.Routes';

export const messages = defineMessages({
  '/': {
    id: `${scope}.root`,
    defaultMessage: 'Trang Chủ',
  },
  overview: {
    id: `${scope}.overview`,
    defaultMessage: 'Tổng quan',
  },
  modem: {
    id: `${scope}.modem`,
    defaultMessage: 'Server',
  },
  license: {
    id: `${scope}.license`,
    defaultMessage: 'License',
  },
  proxy: {
    id: `${scope}.proxy`,
    defaultMessage: 'Proxy',
  },
  customer: {
    id: `${scope}.customer`,
    defaultMessage: 'Khách hàng',
  },
  transaction: {
    id: `${scope}.transaction`,
    defaultMessage: 'Giao dịch',
  },
  pkg: {
    id: `${scope}.pkg`,
    defaultMessage: 'Package',
  },
  notification: {
    id: `${scope}.notification`,
    defaultMessage: 'Thông báo',
  },
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: 'Mua mới Proxy',
  },
  newmobile: {
    id: `${scope}.newmobile`,
    defaultMessage: 'Mua mới ProxyMobile',
  },
  recharge: {
    id: `${scope}.recharge`,
    defaultMessage: 'Nạp tiền',
  },
  myproxy: {
    id: `${scope}.myproxy`,
    defaultMessage: 'My Proxy',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Tài khoản',
  },
  configuration: {
    id: `${scope}.configuration`,
    defaultMessage: 'Cấu hình',
  },
  api: {
    id: `${scope}.api`,
    defaultMessage: 'API Document',
  },
  faq: {
    id: `${scope}.faq`,
    defaultMessage: 'FAQ',
  },
  monitor: {
    id: `${scope}.monitor`,
    defaultMessage: 'Cảnh báo',
  },
  affiliate: {
    id: `${scope}.affiliate`,
    defaultMessage: 'Cộng tác viên',
  },
});

export function getMessageByPathSegment(segment) {
  const lowercaseSegment = toLower(segment);
  return get(messages, lowercaseSegment, null);
}

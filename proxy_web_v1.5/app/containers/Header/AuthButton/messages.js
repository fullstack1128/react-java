import { defineMessages } from 'react-intl';

const scope = 'app.components.Header.AuthButton';
export default defineMessages({
  signup: {
    id: `${scope}.signup`,
    defaultMessage: 'Đăng Ký',
  },
  signin: {
    id: `${scope}.signin`,
    defaultMessage: 'Đăng Nhập',
  },
  profile: {
    id: `${scope}.menuitem.profile`,
    defaultMessage: 'Trang quản lý',
  },
  backToHome: {
    id: `${scope}.menuitem.backToHome`,
    defaultMessage: 'Về trang chủ',
  },
  logout: {
    id: `${scope}.menuitem.logout`,
    defaultMessage: 'Đăng Xuất',
  },
  loanmgmt: {
    id: `${scope}.menuitem.loanmgmt`,
    defaultMessage: 'Quản lý hồ sơ',
  },
  consultmgmt: {
    id: `${scope}.menuitem.consultmgmt`,
    defaultMessage: 'Quản lý yêu cầu',
  },
});

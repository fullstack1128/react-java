import { defineMessages } from 'react-intl';

export const scope = 'app.components.Transactions.LoginForm';

export default defineMessages({
  textMessage: {
    id: `${scope}.textMessage`,
    defaultMessage: 'Bạn vui lòng đăng nhập để sử dụng chức năng này.',
  },
  phoneLabel: {
    id: `${scope}.phoneLabel`,
    defaultMessage: 'Số điện thoại',
  },
  phonePlaceholder: {
    id: `${scope}.phonePlaceholder`,
    defaultMessage: 'Nhập số điện thoại',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Mật khẩu',
  },
  passwordPlaceholder: {
    id: `${scope}.passwordPlaceholder`,
    defaultMessage: 'Nhập mật khẩu',
  },
  rememberLabel: {
    id: `${scope}.rememberLabel`,
    defaultMessage: 'Ghi nhớ đăng nhập',
  },
  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: 'Quên mật khẩu',
  },
  loginButton: {
    id: `${scope}.loginButton`,
    defaultMessage: 'Đăng nhập',
  },
  doYouHaveAccount: {
    id: `${scope}.doYouHaveAccount`,
    defaultMessage: 'Bạn chưa có tài khoản ?',
  },
  registerButton: {
    id: `${scope}.registerButton`,
    defaultMessage: 'Đăng ký',
  },
  optionTitle: {
    id: `${scope}.optionTitle`,
    defaultMessage: 'Bạn muốn đăng nhập bằng tài khoản RAPBANK?',
  },
  skipStep: {
    id: `${scope}.skipStep`,
    defaultMessage: 'Tiếp tục mà không cần đăng nhập',
  },
  navigator: {
    id: `${scope}.navigator`,
    defaultMessage: 'Hoặc',
  },
});

import { defineMessages } from 'react-intl';

const scope = 'app.containers.AuthPage.FormLogin';

export default defineMessages({
  title: {
    id: `${scope}.FormLogin.title`,
    defaultMessage: 'Đăng nhập',
  },
  submit: {
    id: `${scope}.FormLogin.submit`,
    defaultMessage: 'Login',
  },
  remember_me: {
    id: `${scope}.FormLogin.remember_me`,
    defaultMessage: 'Ghi nhớ đăng nhập',
  },
  forgot_password: {
    id: `${scope}.FormLogin.forgot_password`,
    defaultMessage: 'Quên mật khẩu',
  },
  have_no_account: {
    id: `${scope}.FormLogin.have_no_account`,
    defaultMessage: 'Bạn chưa có tài khoản ?',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Đổi mật khẩu',
  },
  register: {
    id: `${scope}.FormLogin.register`,
    defaultMessage: 'Đăng Ký',
  },
  phoneInvalidError: {
    id: `${scope}.phoneInvalidError`,
    defaultMessage: 'Vui lòng nhập số điện thoại hợp lệ',
  },
  phoneRequiredError: {
    id: `${scope}.phoneRequiredError`,
    defaultMessage: 'Vui lòng nhập số điện thoại',
  },
  phoneMaxLengthError: {
    id: `${scope}.phoneMaxLengthError`,
    defaultMessage: 'Vui lòng nhập nhỏ hơn 15 kí tự',
  },
  passwordRequiredError: {
    id: `${scope}.passwordRequiredError`,
    defaultMessage: 'Vui lòng nhập mật khẩu',
  },
  passwordMaxLengthError: {
    id: `${scope}.passwordMaxLengthError`,
    defaultMessage: 'Vui lòng nhập mật khẩu nhỏ hơn 30 kí tự',
  },
  passwordMinLengthError: {
    id: `${scope}.passwordMinLengthError`,
    defaultMessage: 'Vui lòng nhập nhiều hơn 8 kí tự',
  },
});

import { defineMessages } from 'react-intl';

const scope = 'app.containers.AuthPage.FormRegister';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Đăng ký',
  },
  guidance: {
    id: `${scope}.guidance`,
    defaultMessage: 'Để trải nghiệm các tính năng và tiện ích từ  hệ thống.',
  },
  submit: {
    id: `${scope}.FormRegister.submit`,
    defaultMessage: 'Đăng ký',
  },
  already_registered: {
    id: `${scope}.FormRegister.already_registered`,
    defaultMessage: 'Bạn đã có tài khoản ?',
  },
  link_signin: {
    id: `${scope}.FormRegister.link_signin`,
    defaultMessage: 'Đăng Nhập',
  },
  passwordPlaceHolder: {
    id: `${scope}.passwordPlaceHolder`,
    defaultMessage: 'Mật khẩu phải từ 8 đến 15 ký tự, có ít nhất 1 chữ và số',
  },
  usernameRequiredError: {
    id: `${scope}.usernameRequiredError`,
    defaultMessage: 'Vui lòng nhập tên',
  },
  emailRequiredError: {
    id: `${scope}.emailRequiredError`,
    defaultMessage: 'Vui lòng nhập email',
  },
  phoneRequiredError: {
    id: `${scope}.phoneRequiredError`,
    defaultMessage: 'Vui lòng nhập số điện thoại',
  },
  passwordRequiredError: {
    id: `${scope}.passwordRequiredError`,
    defaultMessage: 'Mật khẩu phải từ 8 đến 15 ký tự, có ít nhất 1 chữ và số',
  },
  passwordMaxLengthError: {
    id: `${scope}.passwordMaxLengthError`,
    defaultMessage: 'Vui lòng nhập mật khẩu nhỏ hơn 15 kí tự',
  },
  passwordMinLengthError: {
    id: `${scope}.passwordMinLengthError`,
    defaultMessage: 'Mật khẩu phải từ 8 đến 15 ký tự, có ít nhất 1 chữ và số',
  },
  confirm_passwordRequiredError: {
    id: `${scope}.confirm_passwordRequiredError`,
    defaultMessage: 'Vui lòng nhập lại mật khẩu ',
  },
  confirm_passwordMaxLengthError: {
    id: `${scope}.confirm_passwordMaxLengthError`,
    defaultMessage: 'Vui lòng nhập mật khẩu xác thực nhỏ hơn 30 kí tự',
  },
  passwordNotMatchError: {
    id: `${scope}.passwordNotMatchError`,
    defaultMessage: 'Mật khẩu xác thực không khớp',
  },
  passwordStrongError: {
    id: `${scope}.passwordStrongError`,
    defaultMessage: 'Mật khẩu phải từ 8 đến 15 ký tự, có ít nhất 1 chữ và số',
  },
  noMaxLengthError: {
    id: `${scope}.noMaxLengthError`,
    defaultMessage: 'Tối đa 30 ký tự',
  },
  registerSuccess: {
    id: `${scope}.registerSuccess`,
    defaultMessage: 'Bạn đã đăng ký thành công',
  },
});

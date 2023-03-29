import { defineMessages } from 'react-intl';

const scope = 'app.containers.AuthPage.FormForgotPassword';
export default defineMessages({
  title: {
    id: `${scope}.FormForgotPassword.title`,
    defaultMessage: 'Quên mật khẩu',
  },
  guidance: {
    id: `${scope}.FormForgotPassword.guidance`,
    defaultMessage:
      'Để thay đổi mật khẩu, vui lòng nhập thông tin email ở dưới',
  },
  already_registered: {
    id: 'FormRegister.already_registered',
    defaultMessage: 'Bạn đã có tài khoản ?',
  },
  link_signin: {
    id: 'FormRegister.link_signin',
    defaultMessage: 'Đăng Nhập',
  },
  submit: {
    id: `${scope}.FormForgotPassword.submit`,
    defaultMessage: 'Confirm',
  },
  phoneInvalidError: {
    id: `${scope}.FormForgotPassword.phoneInvalidError`,
    defaultMessage: 'Vui lòng nhập số điện thoại hợp lệ',
  },
  phoneRequiredError: {
    id: `${scope}.FormForgotPassword.phoneRequiredError`,
    defaultMessage: 'Vui lòng nhập số điện thoại',
  },
  codeRequiredError: {
    id: `${scope}.FormForgotPassword.codeRequiredError`,
    defaultMessage: 'Vui lòng nhập mã OTP',
  },
  phoneMaxLengthError: {
    id: `${scope}.phoneMaxLengthError`,
    defaultMessage: 'Vui lòng nhập nhỏ hơn 15 kí tự',
  },
  codeMaxLengthError: {
    id: `${scope}.codeMaxLengthError`,
    defaultMessage: 'Vui lòng nhập nhỏ hơn 30 kí tự',
  },
});

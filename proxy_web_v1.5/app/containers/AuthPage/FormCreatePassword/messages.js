import { defineMessages } from 'react-intl';

const scope = 'app.containers.AuthPage.FormCreatePassword';
const registerScope = 'app.containers.AuthPage.FormRegister';

export default defineMessages({
  title: {
    id: `${scope}.FormCreatePassword.title`,
    defaultMessage: 'Tạo mật khẩu mới',
  },
  new_password: {
    id: `${scope}.FormCreatePassword.new_password`,
    defaultMessage: 'Nhập mật khẩu mới',
  },
  confirm_new_password: {
    id: `${scope}.FormCreatePassword.confirm_new_password`,
    defaultMessage: 'Xác nhận mật khẩu',
  },
  submit: {
    id: `${scope}.FormCreatePassword.submit`,
    defaultMessage: 'Confirm',
  },
  emailRequiredError: {
    id: `${scope}.emailRequiredError`,
    defaultMessage: 'Vui lòng nhập email.',
  },
  passwordRequiredError: {
    id: `${scope}.passwordRequiredError`,
    defaultMessage: 'Vui lòng nhập mật khẩu.',
  },
  passwordMaxLengthError: {
    id: `${scope}.passwordMaxLengthError`,
    defaultMessage: 'Vui lòng nhập mật khẩu nhỏ hơn 15 kí tự.',
  },
  passwordMinLengthError: {
    id: `${scope}.passwordMinLengthError`,
    defaultMessage: 'Vui lòng nhập nhiều hơn 8 kí tự.',
  },
  confirm_passwordRequiredError: {
    id: `${scope}.confirm_passwordRequiredError`,
    defaultMessage: 'Vui lòng nhập lại mật khẩu.',
  },
  confirm_passwordMaxLengthError: {
    id: `${scope}.confirm_passwordMaxLengthError`,
    defaultMessage: 'Vui lòng nhập mật khẩu xác thực nhỏ hơn 15 kí tự.',
  },
  passwordNotMatchError: {
    id: `${scope}.passwordNotMatchError`,
    defaultMessage: 'Mật khẩu xác thực không khớp.',
  },
  passwordStrongError: {
    id: `${scope}.passwordStrongError`,
    defaultMessage: 'Mật khẩu phải từ 8 đến 15 ký tự, có ít nhất 1 chữ và số.',
  },
  passwordPlaceHolder: {
    id: `${registerScope}.passwordPlaceHolder`,
    defaultMessage: 'Mật khẩu phải từ 8 đến 15 ký tự, có ít nhất 1 chữ và số',
  },
});

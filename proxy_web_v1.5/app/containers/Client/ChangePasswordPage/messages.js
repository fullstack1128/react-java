/*
 * ChangePasswordPage Messages
 *
 * This contains all the text for the Test component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.common';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Đổi mật khẩu',
  },

  subTitle: {
    id: `${scope}.subTitle`,
    defaultMessage: 'Để thay đổi mật khẩu, vui lòng nhập thông tin số điện thoại ở dưới',
  },

  currentPassword: {
    id: `${scope}.currentPassword`,
    defaultMessage: 'Mật khẩu hiện tại',
  },

  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Nhập mật khẩu mới',
  },

  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Xác nhận mật khẩu',
  },

  update: {
    id: `${scope}.update`,
    defaultMessage: 'Confirm',
  },

  messageSuccess: {
    id: `${scope}.messageSuccess`,
    defaultMessage: 'Mật khẩu của bạn đã được đổi thành công.',
  },

  messageInvalidNewPassword: {
    id: `${scope}.messageInvalidNewPassword`,
    defaultMessage: 'Mật khẩu mới không được giống mật khẩu cũ.',
  },
  currentPasswordRequiredError: {
    id: `${scope}.currentPasswordRequiredError`,
    defaultMessage: 'Vui lòng nhập mật khẩu hiện tại.',
  },
  new_passwordRequiredError: {
    id: `${scope}.new_passwordRequiredError`,
    defaultMessage: 'Vui lòng nhập mật khẩu mới.',
  },
  new_passwordMaxLengthError: {
    id: `${scope}.new_passwordMaxLengthError`,
    defaultMessage: 'Vui lòng nhập mật khẩu mới nhỏ hơn 30 kí tự.',
  },
  new_passwordMinLengthError: {
    id: `${scope}.new_passwordMinLengthError`,
    defaultMessage: 'Vui lòng nhập nhiều hơn 8 kí tự.',
  },
  new_passwordStrongError: {
    id: `${scope}.new_passwordStrongError`,
    defaultMessage: 'Mật khẩu phải từ 8 đến 15 ký tự, có ít nhất 1 chữ và số.',
  },
  confirm_passwordRequiredError: {
    id: `${scope}.confirm_passwordRequiredError`,
    defaultMessage: 'Vui lòng nhập lại mật khẩu.',
  },
  passwordNotMatchError: {
    id: `${scope}.passwordNotMatchError`,
    defaultMessage: 'Mật khẩu xác thực không khớp.',
  },
});

import { defineMessages } from 'react-intl';

const scope = 'app.components.common';

export default defineMessages({
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  allLabel: {
    id: `${scope}.allLabel`,
    defaultMessage: 'All',
  },
  searchPlaceHolder: {
    id: `${scope}.searchPlaceHolder`,
    defaultMessage: 'Code, Name',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Status',
  },
  action: {
    id: `${scope}.action`,
    defaultMessage: 'Action',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  create: {
    id: `${scope}.create`,
    defaultMessage: 'Create',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close',
  },
  requiredNotNull: {
    id: `${scope}.requiredNotNull`,
    defaultMessage: 'This field is required',
  },
  msgUpdateSuccess: {
    id: `${scope}.msgUpdateSuccess`,
    defaultMessage: 'Update data successfully',
  },
  msgUpdateFailed: {
    id: `${scope}.msgUpdateFailed`,
    defaultMessage: 'Cập nhật thất bại.',
  },
  msgCreateSuccess: {
    id: `${scope}.msgCreateSuccess`,
    defaultMessage: 'Create new data successfully',
  },
  msgCreateFailed: {
    id: `${scope}.msgCreateFailed`,
    defaultMessage: 'Create new data failed',
  },
  msgDeleteSuccess: {
    id: `${scope}.msgDeleteSuccess`,
    defaultMessage: 'Delete data successfully',
  },
  msgDeleteFailed: {
    id: `${scope}.msgDeleteFailed`,
    defaultMessage: 'This data cannot be deleted',
  },
  notFound: {
    id: `${scope}.notFound`,
    defaultMessage: 'Data not found',
  },
  clearAllFiltersButton: {
    id: `${scope}.clearAllFiltersButton`,
    defaultMessage: 'Clear all filters',
  },
  advancedSearchButton: {
    id: `${scope}.advancedSearchButton`,
    defaultMessage: 'Advanced search',
  },
  titleConfirm: {
    id: `${scope}.titleConfirm`,
    defaultMessage: 'Confirmation',
  },
  messageConfirm: {
    id: `${scope}.messageConfirm`,
    defaultMessage: 'Are you sure to delete this data?',
  },
  confirmButton: {
    id: `${scope}.confirmButton`,
    defaultMessage: 'Confirm',
  },
  cancelButton: {
    id: `${scope}.cancelButton`,
    defaultMessage: 'Cancel',
  },
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

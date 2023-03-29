/*
 * AccountManagementPage Messages
 *
 * This contains all the text for the Test component.
 */
import { defineMessages } from 'react-intl';

const scope = 'rb.containers.AccountManagementPage';
const userPageScope = 'rb.containers.Pages';

export default defineMessages({
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'Số điện thoại',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Mật khẩu',
  },
  avatar: {
    id: `${scope}.avatar`,
    defaultMessage: 'Ảnh đại diện',
  },
  saveAvatar: {
    id: `${scope}.saveAvatar`,
    defaultMessage: 'Lưu',
  },
  messageUploadAvatarSuccess: {
    id: `${userPageScope}.messageUploadAvatarSuccess`,
    defaultMessage: 'Cập nhật ảnh đại diện thành công',
  },
});

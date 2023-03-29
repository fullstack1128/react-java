/*
 * NewsPage Messages
 *
 * This contains all the text for the NewsPage component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.containers.Pages';

export default defineMessages({
  personal: {
    id: `${scope}.personal`,
    defaultMessage: 'Cá nhân',
  },
  signin: {
    id: `${scope}.signin`,
    defaultMessage: 'Đăng Nhập',
  },
  management: {
    id: `${scope}.management`,
    defaultMessage: 'Quản lý',
  },
  messageUploadAvatarSuccess: {
    id: `${scope}.messageUploadAvatarSuccess`,
    defaultMessage: 'Cập nhật ảnh đại diện thành công',
  },
});

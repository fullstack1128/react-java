/*
 * FormRegisterSuccess Messages
 *
 * This contains all the text for the FormRegisterSuccess component.
 */
import { defineMessages } from 'react-intl';


const scope = 'app.containers.AuthPage.FormRegisterSuccess';

export default defineMessages({
  completedMessage: {
    id: `${scope}.completedMessage`,
    defaultMessage: 'Hồ sơ của bạn đã được gửi đến Ngân hàng tương ứng. Vui lòng chờ Quản trị viên của ngân hàng phê' +
      ' duyệt. Mọi thắc mắc có thể liên hệ với chúng tối để được hỗ trợ',
  },

  uncompletedMessage: {
    id: `${scope}.uncompletedMessage`,
    defaultMessage: 'Hồ sơ của bạn cần cập nhật để bắt đầu tiếp nhận yêu cầu từ khách hàng',
  },

  clientMessage: {
    id: `${scope}.clientMessage`,
    defaultMessage: 'Chào mừng bạn đến với RAPBANK. Đăng nhập ngay để cùng trải nghiệm hệ thống ngân hàng số hàng' +
      ' đầu.',
  },

  completedBtn: {
    id: `${scope}.btnBackToHome`,
    defaultMessage: 'Về trang chủ',
  },

  uncompletedBtn: {
    id: `${scope}.uncompletedBtn`,
    defaultMessage: 'Cập nhật ngay',
  },

  clientBtn: {
    id: `${scope}.clientBtn`,
    defaultMessage: 'Đăng nhập ngay',
  },
});

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Transactions.RegisterForm';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Bạn đồng ý tạo tài khoản với các thông tin sau?',
  },
  btnRegister: {
    id: `${scope}.btnRegister`,
    defaultMessage: 'Đăng ký',
  },
  skipStep: {
    id: `${scope}.skipStep`,
    defaultMessage: 'Tiếp tục mà không cần tạo tài khoản',
  },
  btnCancel: {
    id: `${scope}.btnCancel`,
    defaultMessage: 'Cancel',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Họ và tên đệm',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'Tên',
  },
});

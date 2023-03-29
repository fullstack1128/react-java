import { defineMessages } from 'react-intl';

export const scope = 'app.components.Transactions.FormConfirmedOTP';

export default defineMessages({
  confirmOTPToLogin: {
    id: `${scope}.confirmOTPToLogin`,
    defaultMessage: 'Xác nhận OTP để đăng nhập.',
  },
  otpLabel: {
    id: `${scope}.otpLabel`,
    defaultMessage: 'Mã OTP',
  },
  otpPlaceholder: {
    id: `${scope}.otpPlaceholder`,
    defaultMessage: 'Nhập mã OTP',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Gửi',
  },
});

import { defineMessages } from 'react-intl';

const scope = 'app.containers.AuthPage';

export default defineMessages({
  info1: {
    id: `${scope}.info1`,
    defaultMessage: 'Hệ thống cung cấp',
  },
  info2: {
    id: `${scope}.info2`,
    defaultMessage: 'Proxy chất lượng với giá ưu đãi nhất thị trường.',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Tài khoản',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Họ Tên',
  },
  enterName: {
    id: `${scope}.enterName`,
    defaultMessage: 'Nhập họ tên',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  maxLengthError: {
    id: `${scope}.maxLengthError`,
    defaultMessage: 'Vui lòng nhập nhỏ hơn {length} kí tự',
  },
  minLengthError: {
    id: `${scope}.passwordMinLength`,
    defaultMessage: 'Vui lòng nhập lớn hơn {length} kí tự',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Số điện thoại',
  },
  enterPhoneNumber: {
    id: `${scope}.enterPhoneNumber`,
    defaultMessage: 'Nhập số điện thoại',
  },
  enterUsername: {
    id: `${scope}.enterUsername`,
    defaultMessage: 'Nhập tài khoản',
  },
  enterEmail: {
    id: `${scope}.enterEmail`,
    defaultMessage: 'Nhập email',
  },
  phoneNumberError: {
    id: `${scope}.phoneNumberError`,
    defaultMessage: 'Vui lòng nhập Số điện thoại',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Mật Khẩu',
  },
  enterPassword: {
    id: `${scope}.enterPassword`,
    defaultMessage: 'Nhập mật khẩu',
  },
  passwordError: {
    id: `${scope}.passwordError`,
    defaultMessage: 'Vui lòng nhập Mật khẩu',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Xác nhận mật khẩu',
  },
  confirmPasswordError: {
    id: `${scope}.confirmPasswordError`,
    defaultMessage: 'Vui lòng nhập Xác nhận mật khẩu',
  },
  otpCode: {
    id: `${scope}.otpCode`,
    defaultMessage: 'Mã OTP',
  },
  enterOtpCode: {
    id: `${scope}.enterOtpCode`,
    defaultMessage: 'Nhập mã OTP',
  },
  otpCodeError: {
    id: `${scope}.otpCodeError`,
    defaultMessage: 'Vui lòng nhập Mã OTP',
  },
  passwordPlaceHolder: {
    id: `${scope}.passwordPlaceHolder`,
    defaultMessage: 'Mật khẩu phải từ 8 đến 15 ký tự, có ít nhất 1 chữ và số',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  enterAddress: {
    id: `${scope}.enterAddress`,
    defaultMessage: 'Please enter your address',
  },
  country: {
    id: `${scope}.country`,
    defaultMessage: 'Country',
  },
  enterCountry: {
    id: `${scope}.enterCountry`,
    defaultMessage: 'Please enter your country',
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'City',
  },
  enterCity: {
    id: `${scope}.enterCity`,
    defaultMessage: 'Please enter your city',
  },
});

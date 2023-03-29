import { defineMessages } from 'react-intl';

const scope = 'app.containers.ManageTransactionsPage';
const clientP2PDetailScope = 'app.containers.ManageP2PClient.ClientP2PDetail.DetailComponent';
const adminP2PDetailScope = 'app.containers.Admin.AdminManageP2P.AdminP2PDetail.TransactionDetail';
const commonScope = 'app.common';
const commonTransactionScope = 'app.common.Transaction';
const transactionScope = 'app.transaction';

export default defineMessages({
  desiredAmount: {
    id: `${scope}.desiredAmount`,
    defaultMessage: 'Khoản vay',
  },
  savingDepositAmount: {
    id: `${scope}.savingDepositAmount`,
    defaultMessage: 'Khoản gửi',
  },
  savingDepositPackageName: {
    id: `${scope}.savingDepositPackageName`,
    defaultMessage: 'Gói tiết kiệm',
  },
  desiredAmountLending: {
    id: `${scope}.desiredAmountLending`,
    defaultMessage: 'Khoản cho vay',
  },
  rate: {
    id: `${transactionScope}.rate`,
    defaultMessage: 'Lãi suất',
  },
  rateLending: {
    id: `${transactionScope}.rateLending`,
    defaultMessage: 'Lãi suất cho vay',
  },
  year: {
    id: `${transactionScope}.year`,
    defaultMessage: 'năm',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Status',
  },
  duration: {
    id: `${scope}.duration`,
    defaultMessage: 'Thời hạn',
  },
  durationLending: {
    id: `${scope}.durationLending`,
    defaultMessage: 'Thời hạn cho vay',
  },
  shortTerm: {
    id: `${transactionScope}.shortTerm`,
    defaultMessage: 'Ngắn hạn',
  },
  month: {
    id: `${transactionScope}.month`,
    defaultMessage: 'tháng',
  },
  purposeBorrowing: {
    id: `${scope}.purposeBorrowing`,
    defaultMessage: 'Mục đích vay',
  },
  packageName: {
    id: `${scope}.packageName`,
    defaultMessage: 'Gói vay',
  },
  paymentSchedule: {
    id: `${scope}.paymentSchedule`,
    defaultMessage: 'Kỳ hạn thanh toán',
  },
  paymentMethod: {
    id: `${scope}.paymentMethod`,
    defaultMessage: 'Phương thức chi trả',
  },
  bank: {
    id: `${transactionScope}.bank`,
    defaultMessage: 'Ngân hàng',
  },
  timeReceiveInterest: {
    id: `${transactionScope}.timeReceiveInterest`,
    defaultMessage: 'Kỳ hạn nhận lãi',
  },
  borrowingConnected: {
    id: `${adminP2PDetailScope}.borrowingConnected`,
    defaultMessage: 'Kết nối với yêu cầu vay',
  },
  lendingConnected: {
    id: `${adminP2PDetailScope}.lendingConnected`,
    defaultMessage: 'Kết nối với yêu cầu cho vay',
  },
  notConnected: {
    id: `${clientP2PDetailScope}.notConnected`,
    defaultMessage: 'Chưa có',
  },
  province: {
    id: `${adminP2PDetailScope}.province`,
    defaultMessage: 'Khu vực',
  },
  provinceLending: {
    id: `${adminP2PDetailScope}.provinceLending`,
    defaultMessage: 'Khu vực cho vay',
  },
  purposeLending: {
    id: `${adminP2PDetailScope}.purposeLending`,
    defaultMessage: 'Mục đích cho vay',
  },
  client: {
    id: `${scope}.client`,
    defaultMessage: 'Khách hàng',
  },
  staffInCharge: {
    id: `${scope}.staffInCharge`,
    defaultMessage: 'Nhân viên phụ trách',
  },
  borrowerInfo: {
    id: `${adminP2PDetailScope}.borrowerInfo`,
    defaultMessage: 'Thông tin người vay',
  },
  lenderInfo: {
    id: `${adminP2PDetailScope}.lenderInfo`,
    defaultMessage: 'Thông tin người cho vay',
  },
  positionStaff: {
    id: `${scope}.ePositionStaff`,
    defaultMessage: 'Nhân viên ngân hàng',
  },
  userIdNumber: {
    id: `${scope}.userIdNumber`,
    defaultMessage: 'CMND',
  },
  userPhone: {
    id: `${scope}.userPhone`,
    defaultMessage: 'Số điện thoại',
  },
  userEmail: {
    id: `${scope}.userEmail`,
    defaultMessage: 'Địa chỉ mail',
  },
  userAddress: {
    id: `${scope}.userAddress`,
    defaultMessage: 'Địa chỉ',
  },
  actionUpdateUser: {
    id: `${transactionScope}.actionUpdateUser`,
    defaultMessage: 'Update',
  },
  actionViewUser: {
    id: `${transactionScope}.actionViewUser`,
    defaultMessage: 'Xem chi tiết',
  },
  bankBranchName: {
    id: `${transactionScope}.bankBranchName`,
    defaultMessage: 'Chi nhánh',
  },
  transaction: {
    id: `${transactionScope}.transaction`,
    defaultMessage: 'Yêu cầu',
  },
  borrowing: {
    id: `${transactionScope}.borrowing`,
    defaultMessage: 'vay',
  },
  lending: {
    id: `${transactionScope}.lending`,
    defaultMessage: 'cho vay',
  },
});

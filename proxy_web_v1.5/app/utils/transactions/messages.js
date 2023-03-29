/*
 * ManageP2PClient Messages
 *
 * This contains all the text for the ManageP2PClient component.
 */
import { defineMessages } from 'react-intl';

const transactionScope = 'app.transaction';

export default defineMessages({
  no: {
    id: `${transactionScope}.noLoan`,
    defaultMessage: 'Mã yêu cầu',
  },

  status: {
    id: `${transactionScope}.status`,
    defaultMessage: 'Status',
  },

  monthDuration: {
    id: `${transactionScope}.monthDuration`,
    defaultMessage: 'Thời hạn',
  },

  month: {
    id: `${transactionScope}.month`,
    defaultMessage: 'tháng',
  },

  rate: {
    id: `${transactionScope}.rate`,
    defaultMessage: 'Lãi suất',
  },

  loanDesiredAmount: {
    id: `${transactionScope}.loanDesiredAmount`,
    defaultMessage: 'Khoản vay',
  },
  savingDesiredAmount: {
    id: `${transactionScope}.savingDesiredAmount`,
    defaultMessage: 'Khoản gửi',
  },

  purpose: {
    id: `${transactionScope}.purpose`,
    defaultMessage: 'Mục đích',
  },
  percentPerYear: {
    id: `${transactionScope}.percentPerYear`,
    defaultMessage: '%/năm',
  },
  paymentMethod: {
    id: `${transactionScope}.paymentMethod`,
    defaultMessage: 'Phương thức chi trả',
  },
  paymentSchedule: {
    id: `${transactionScope}.paymentSchedule`,
    defaultMessage: 'Kỳ hạn thanh toán',
  },
  shortTerm: {
    id: `${transactionScope}.shortTerm`,
    defaultMessage: 'Ngắn hạn',
  },
  year: {
    id: `${transactionScope}.year`,
    defaultMessage: 'năm',
  },
  timeReceiveInterest: {
    id: `${transactionScope}.timeReceiveInterest`,
    defaultMessage: 'Kỳ hạn nhận lãi',
  },
  packageName: {
    id: `${transactionScope}.packageName`,
    defaultMessage: 'Tên gói',
  },
});

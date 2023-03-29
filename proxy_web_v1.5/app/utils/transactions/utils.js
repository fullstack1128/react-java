import messages from './messages';
import { formatCurrencyWithDecimals, formatPercentageWithDecimals } from 'utils/numberHelper';
import { formatCurrency } from 'utils/transactions/currencies';
import { matchStatusName } from 'components/Transactions/Status';
import matchTimeReceiveInterestName from 'utils/masterDataBackend/timeReceiveInterestName';
import { TIME_RECEIVE_INTEREST } from 'utils/masterDataBackend/constants';
import { getCurrencyName } from 'enums/ECurrency';
import matchPaymentMethodName, { getPaymentMethodTooltip } from 'utils/masterDataBackend/paymentMethodName';
import messagesStep1 from '../../containers/BorrowingPage/Step1Filters/messages';
import numeral from 'numeral';
import get from 'lodash/get';
import auth from 'utils/auth';
import ETransactionType from 'enums/ETransactionType';

const getTimeReceiveInterest = ({
                                  isShortTermDeposit,
                                  timeReceiveInterestId,
                                  intl,
                                }) => {
  const timeReceiveInterest = isShortTermDeposit ? TIME_RECEIVE_INTEREST.ONE_MONTH_ID : timeReceiveInterestId;

  let result = intl.formatMessage(matchTimeReceiveInterestName(timeReceiveInterest));
  if (timeReceiveInterestId !== TIME_RECEIVE_INTEREST.END_PERIOD_ID) {
    result += ` ${intl.formatMessage(messages.month)}`;
  }

  return result;
};

export const format = (intl, transaction) => {
  // Lãi suất của các gói vay
  const displayPackageRate = `
    ${formatPercentageWithDecimals(transaction.minRate)}
    ~
    ${formatPercentageWithDecimals(transaction.maxRate)}
    /${intl.formatMessage(messages.year)}
  `;

  // Lãi suất người dùng nhập
  const displayRateTo = transaction.rateTo ? ` - ${formatPercentageWithDecimals(transaction.rateTo)}/${intl.formatMessage(messages.year)}` : '';

  // Lãi suất người dùng nhập
  const displayRate = `${formatPercentageWithDecimals(transaction.rate)}/${intl.formatMessage(messages.year)}${displayRateTo}`;

  // from rate to rateTo
  let displayRateRange = '';
  if (transaction.rateTo) {
    displayRateRange = `${formatPercentageWithDecimals(transaction.rate)} ~ ${formatPercentageWithDecimals(transaction.rateTo)}/${intl.formatMessage(messages.year)}`;
  } else {
    displayRateRange = `${formatPercentageWithDecimals(transaction.rate)}/${intl.formatMessage(messages.year)}`;
  }

  // Khoản vay của các gói vay
  const displayPackageAmount = `
    ${formatCurrencyWithDecimals(transaction.minAmount)}
    ~
    ${formatCurrency(transaction.maxAmount, getCurrencyName(transaction.currencyId))}
  `;

  // Khoản vay của người dùng nhập
  const displayDesiredAmount = `${formatCurrency(transaction.desiredAmount, getCurrencyName(transaction.currencyId))}`;

  const displayPaymentSchedule = transaction.paymentSchedule ?
    `${transaction.paymentSchedule}  ${intl.formatMessage(messages.month)}` :
    '';

  return {
    ...transaction,
    displayDuration: transaction.isShortTermDeposit ?
      intl.formatMessage(messages.shortTerm) :
      `${transaction.monthDuration || transaction.duration || ''} ${intl.formatMessage(messages.month)}`,
    displayStatus: intl.formatMessage(matchStatusName(transaction.status)),
    displayRate,
    displayRateRange,
    displayPackageRate,
    displayDesiredAmount,
    displayPackageAmount,
    displayTimeReceiveInterest: getTimeReceiveInterest({
      isShortTermDeposit: transaction.isShortTermDeposit,
      timeReceiveInterestId: transaction.timeReceiveInterestId,
      intl,
    }),
    displayPaymentMethod: transaction.paymentMethodId ?
      `${intl.formatMessage(matchPaymentMethodName(transaction.paymentMethodId))}` :
      '',
    displayPaymentSchedule,
  };
};

export const getPaymentMethodOptions = ({ paymentMethods, paymentMethodIds, intl }) => (
  paymentMethods
    .filter((el) => paymentMethodIds.includes(el))
    .map((id) => ({
      value: id,
      label: intl.formatMessage(matchPaymentMethodName(id)),
      tooltip: intl.formatMessage(getPaymentMethodTooltip(id)),
    }))
);

export const getPaymentScheduleOptions = ({ paymentSchedules, intl }) => (
  paymentSchedules.map((value) => ({
    value,
    label: `${value} ${intl.formatMessage(messagesStep1.month)}`,
  }))
);

/**
 * Tiền lãi hàng tháng (yêu cầu gửi ngân hàng)
 */
export const getMonthlyInterest = (desiredAmount, rate) => {
  if (!desiredAmount || !rate) return 0;

  return (numeral(desiredAmount).value() * rate) / 12;
};

const MIN_RATE_PERCENT = 0;
const MAX_RATE_PERCENT = 15;



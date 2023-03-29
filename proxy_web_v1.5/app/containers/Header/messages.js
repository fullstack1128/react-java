import { defineMessages } from 'react-intl';

const scope = 'app.components.Header';
export default defineMessages({
  banks_in_this_area: {
    id: `${scope}.banks_in_this_area`,
    defaultMessage: 'Ngân Hàng gần đây',
  },
  news: {
    id: `${scope}.news`,
    defaultMessage: 'Tin Tức',
  },
  recruitment: {
    id: `${scope}.recruitment`,
    defaultMessage: 'Tuyển dụng',
  },
  depositInterestRateP2P: {
    id: `${scope}.depositInterestRateP2P`,
    defaultMessage: 'Lãi suất',
  },
  introduction: {
    id: `${scope}.introduction`,
    defaultMessage: 'Giới thiệu',
  }
});

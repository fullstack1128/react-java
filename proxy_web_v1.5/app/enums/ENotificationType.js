import { defineMessages } from 'react-intl';

export const eNotificationType = {
  SEA: 'SEA',
  AIR: 'AIR',
  DOMESTIC: 'DOMESTIC',
  TRUCK: 'TRUCK',
  CONT: 'CONT',
  INSURANCE: 'INSURANCE',
  EXPRESS: 'EXPRESS',
};

export const scope = 'app.common';

export const eNotificationTypeMessages = defineMessages({
  SEA: {
    id: `${scope}.eNotificationType.SEA`,
    defaultMessage: 'Báo giá SEA',
  },
  AIR: {
    id: `${scope}.eNotificationType.AIR`,
    defaultMessage: 'Báo giá AIR',
  },
  DOMESTIC: {
    id: `${scope}.eNotificationType.DOMESTIC`,
    defaultMessage: 'Báo giá DOMESTIC',
  },
  TRUCK: {
    id: `${scope}.eNotificationType.TRUCK`,
    defaultMessage: 'Báo giá TRUCK',
  },
  CONT: {
    id: `${scope}.eNotificationType.CONT`,
    defaultMessage: 'Báo giá CONT',
  },
  INSURANCE: {
    id: `${scope}.eNotificationType.INSURANCE`,
    defaultMessage: 'Báo giá INSURANCE',
  },
  EXPRESS: {
    id: `${scope}.eNotificationType.EXPRESS`,
    defaultMessage: 'Báo giá EXPRESS',
  },
});

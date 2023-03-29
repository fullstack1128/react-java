import { defineMessages } from 'react-intl';

export const eNotificationStatus = {
  READ: 1,
  UNREAD: 0,
};

export const scope = 'app.common';

export const notificationStatusMessages = defineMessages({
  0: {
    id: `${scope}.eNotificationStatus.0`,
    defaultMessage: 'Chưa đọc',
  },
  1: {
    id: `${scope}.eNotificationStatus.1`,
    defaultMessage: 'Đã đọc',
  },
});

import { defineMessages } from 'react-intl';

const scope = 'app.enums';

export const eUserStatus = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  INACTIVE: 'INACTIVE',
  LOCKED: 'LOCKED',
};

export const userStatusMessages = defineMessages({
  ACTIVE: {
    id: `${scope}.eUserStatus.Active`,
    defaultMessage: 'Đang hoạt động',
  },
  PENDING: {
    id: `${scope}.eUserStatus.Pending`,
    defaultMessage: 'Chưa hoạt động',
  },
  INACTIVE: {
    id: `${scope}.eUserStatus.Inactive`,
    defaultMessage: 'Đã xóa',
  },
  LOCKED: {
    id: `${scope}.eUserStatus.Locked`,
    defaultMessage: 'Tạm khóa',
  },
});

import { defineMessages } from 'react-intl';

export const eProfilePosition = {
  MANAGER: 4,
  DEPUTY: 3,
  LEADER: 2,
  STAFF: 1,
};

export const scope = 'app.common';

export const eProfilePositionMessages = defineMessages({
  1: {
    id: `${scope}.eProfilePosition.staff`,
    defaultMessage: 'Nhân viên',
  },
  2: {
    id: `${scope}.eProfilePosition.leader`,
    defaultMessage: 'Trưởng nhóm',
  },
  3: {
    id: `${scope}.eProfilePosition.deputy`,
    defaultMessage: 'Phó phòng',
  },
  4: {
    id: `${scope}.eProfilePosition.manager`,
    defaultMessage: 'Trưởng phòng',
  },
});

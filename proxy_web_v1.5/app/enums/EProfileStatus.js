import { defineMessages } from 'react-intl';

export const eProfileStatus = {
  WORK_PREPARE: 1,
  WORKING: 2,
  WORK_LEAVE: 3,
};

export const scope = 'app.common';

export const eProfileStatusMessages = defineMessages({
  1: {
    id: `${scope}.eProfileStatus.workprepare`,
    defaultMessage: 'Dự trù',
  },
  2: {
    id: `${scope}.eProfileStatus.working`,
    defaultMessage: 'Đang làm việc',
  },
  3: {
    id: `${scope}.eProfileStatus.workleave`,
    defaultMessage: 'Đã nghỉ việc',
  },
});

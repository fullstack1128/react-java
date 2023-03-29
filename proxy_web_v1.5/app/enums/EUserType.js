import { defineMessages } from 'react-intl';

export const eUserType = {
  // INDIVIDUAL: 'INDIVIDUAL',
  // USER: 'USER',
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
};

const scope = 'app.enums.eUserType';

export const userTypeMessages = defineMessages({
  ALL: {
    id: `${scope}.all`,
    defaultMessage: 'All',
  },

  INDIVIDUAL: {
    id: `${scope}.individual`,
    defaultMessage: 'Khách hàng',
  },

  USER: {
    id: `${scope}.user`,
    defaultMessage: 'Khách hàng',
  },

  ADMIN: {
    id: `${scope}.admin`,
    defaultMessage: 'Quản Trị Viên',
  },

  CLIENT: {
    id: `${scope}.client`,
    defaultMessage: 'Khách hàng',
  },

});

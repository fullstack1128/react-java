import { defineMessages } from 'react-intl';

export const eLicenseStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
};

export const scope = 'app.common';

export const licenseStatusMessages = defineMessages({
  PENDING: {
    id: `${scope}.eLicenseStatus.PENDING`,
    defaultMessage: 'Pending',
  },
  ACTIVE: {
    id: `${scope}.eLicenseStatus.ACTIVE`,
    defaultMessage: 'Active',
  },
  EXPIRED: {
    id: `${scope}.eLicenseStatus.EXPIRED`,
    defaultMessage: 'Expired',
  },
});

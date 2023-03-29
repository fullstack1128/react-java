import { eLicenseStatus, licenseStatusMessages } from 'enums/ELicenseStatus';

export const getLicenseStatusOptions = (intl) => [
  {
    name: intl.formatMessage(licenseStatusMessages[eLicenseStatus.ACTIVE]),
    id: eLicenseStatus.ACTIVE,
  },
  {
    name: intl.formatMessage(licenseStatusMessages[eLicenseStatus.EXPIRED]),
    id: eLicenseStatus.EXPIRED,
  },
  {
    name: intl.formatMessage(licenseStatusMessages[eLicenseStatus.PENDING]),
    id: eLicenseStatus.PENDING,
  },
];

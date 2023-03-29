import { defineMessages } from 'react-intl';

const scope = 'app.components.Transactions.PersonalAddress';

export default defineMessages({
  temporaryAddress: {
    id: `${scope}.temporaryAddress`,
    defaultMessage: 'Địa chỉ tạm trú',
  },
  temporaryAddressPlaceholder: {
    id: `${scope}.temporaryAddressPlaceholder`,
    defaultMessage: 'Nhập địa chỉ tạm trú',
  },
  province: {
    id: `${scope}.province`,
    defaultMessage: 'Tỉnh/Thành phố',
  },
  provincePlaceholder: {
    id: `${scope}.provincePlaceholder`,
    defaultMessage: 'Chọn tỉnh/thành phố',
  },
  district: {
    id: `${scope}.district`,
    defaultMessage: 'Quận/Huyện',
  },
  districtPlaceholder: {
    id: `${scope}.districtPlaceholder`,
    defaultMessage: 'Chọn quận/huyện',
  },
  ward: {
    id: `${scope}.ward`,
    defaultMessage: 'Phường/Xã',
  },
  wardPlaceholder: {
    id: `${scope}.wardPlaceholder`,
    defaultMessage: 'Chọn phường/xã',
  },
});

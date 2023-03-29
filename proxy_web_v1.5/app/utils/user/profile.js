import get from 'lodash/get';
import upperFirst from 'lodash/upperFirst';
import { defineMessages } from 'react-intl';

const scope = 'app.common';

const messages = defineMessages({
  district: {
    id: `${scope}.district`,
    defaultMessage: 'quận',
  },
  ward: {
    id: `${scope}.ward`,
    defaultMessage: 'phường',
  },
  province: {
    id: `${scope}.province`,
    defaultMessage: 'thành phố',
  },
});

export const getFullName = (firstName, lastName) => (
  `${lastName} ${firstName}`
);

/** Tạm thời thống nhất các page khác - Chỉ hiển thị tên */
/** HienNT: thống nhất thêm type*/

export const getProvinceName = (selectedProvince) => selectedProvince ? `${get(selectedProvince, 'type', '')} ${get(selectedProvince, 'name', '')}` : '';

const getWardName = (selectedWard) => selectedWard ? `${get(selectedWard, 'type', '')} ${get(selectedWard, 'name', '')}` : '';

const getDistrictName = (selectedDistrict) => selectedDistrict ? `${get(selectedDistrict, 'type', '')} ${get(selectedDistrict, 'name', '')}` : '';

export const getFullAddress = ({
  streetAddress,
  provinceId,
  districtId,
  wardId,
  provinces,
}) => {
  const selectedProvince = provinces.find((element) => element.id === provinceId);
  const districts = get(selectedProvince, 'Districts', []);
  const selectedDistrict = districts.find((element) => element.id === districtId);

  const wards = get(selectedDistrict, 'Wards', []);
  const selectedWard = wards.find((element) => element.id === wardId);

  const address = [];

  if (streetAddress) { address.push(streetAddress); }
  if (selectedWard) { address.push(getWardName(selectedWard)); }
  if (selectedDistrict) { address.push(getDistrictName(selectedDistrict)); }
  if (selectedProvince) { address.push(getProvinceName(selectedProvince)); }

  return address.join(', ');
};

export const getFullAddressV2 = ({
  streetAddress,
  district,
  ward,
  province,
  intl,
}) =>
  // const districtName = `${upperFirst(intl.formatMessage(messages.district))} ${district}`;
  // const wardName = `${upperFirst(intl.formatMessage(messages.ward))} ${ward}`;
  // const provinceName = `${upperFirst(intl.formatMessage(messages.province))} ${province}`;
  //
  // return [
  //   streetAddress,
  //   wardName,
  //   districtName,
  //   provinceName,
  // ].filter(Boolean).join(', ');
  /** Tạm thời thống nhất các page khác - Chỉ hiển thị tên */
   [streetAddress, ward, district, province].filter(Boolean).join(', ');

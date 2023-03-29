import { defineMessages } from 'react-intl';


const scope = 'app.components.common';

export default defineMessages({
  optional: {
    id: `${scope}.optional`,
    defaultMessage: 'tùy chọn',
  },
  submitError: {
    id: `${scope}.submitError`,
    defaultMessage: 'Vui lòng kiểm tra lại thông tin',
  },
  noDataFound: {
    id: `${scope}.noDataFound`,
    defaultMessage: 'Không tìm thấy dữ liệu.',
  },
  noOptional: {
    id: `${scope}.noOptional`,
    defaultMessage: 'Không có tùy chọn.',
  },
  tableLoading: {
    id: `${scope}.tableLoading`,
    defaultMessage: 'Đang tải...',
  },

  noOptionMessage: {
    id: `${scope}.noOptionMessage`,
    defaultMessage: 'Không tìm thấy',
  },

  selectMessage: {
    id: `${scope}.selectMessage`,
    defaultMessage: 'Vui lòng chọn',
  },
  inputMessage: {
    id: `${scope}.inputMessage`,
    defaultMessage: 'Nhập',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  readMore: {
    id: `${scope}.readMore`,
    defaultMessage: 'Xem thêm',
  },
  toggleOn: {
    id: `${scope}.toggleOn`,
    defaultMessage: 'Bật',
  },
  toggleOff: {
    id: `${scope}.toggleOff`,
    defaultMessage: 'Tắt',
  },
});

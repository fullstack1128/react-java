import { defineMessages } from 'react-intl';

const scope = 'app.components.common.AssignDialog';

export default defineMessages({
  noResult: {
    id: `${scope}.noResult`,
    defaultMessage: 'Không tìm thấy kết quả',
  },
  btnCancelPopup: {
    id: `${scope}.btnCancelPopup`,
    defaultMessage: 'Bỏ qua',
  },
  btnConfirmPopup: {
    id: `${scope}.btnConfirmPopup`,
    defaultMessage: 'Confirm',
  },
});

/*
 * UploadTextFile Messages
 *
 * This contains all the text for the UploadTextFile component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.common.ImportExcelPopup';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Nhập từ file excel',
  },
  downloadTemplateText: {
    id: `${scope}.downloadTemplateText`,
    defaultMessage: 'Tải xuống file mẫu',
  },
  btnCancelText: {
    id: `${scope}.btnCancelText`,
    defaultMessage: 'Bỏ qua',
  },
  btnConfirmText: {
    id: `${scope}.btnConfirmText`,
    defaultMessage: 'Lưu',
  },
  dataMotFoundMessage: {
    id: `${scope}.dataMotFoundMessage`,
    defaultMessage: 'Data not found',
  },
  filesRequiredMessage: {
    id: `${scope}.filesRequiredMessage`,
    defaultMessage: 'Vui lòng tải lên file excel',
  },
});

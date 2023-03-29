/*
 * UploadTextFile Messages
 *
 * This contains all the text for the UploadTextFile component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.common.UploadTextFile';

export default defineMessages({
  upload: {
    id: `${scope}.upload`,
    defaultMessage: 'Tải lên',
  },
  formFileSizeError: {
    id: `${scope}.formFileSizeError`,
    defaultMessage: 'Tải file không thành công. Vui lòng tải lên file có dung lượng dưới {maxSize}.',
  },
  formFileFormatError: {
    id: `${scope}.formFileFormatError`,
    defaultMessage: 'File tải lên chưa đúng định dạng ({format})',
  },
});

/*
 * ChatPage Messages
 *
 * This contains all the text for the ChatPage component.
 */
import { defineMessages } from 'react-intl';


const scope = 'app.containers.ChatPage.ReviewPopup';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Nhận xét về ',
  },

  note: {
    id: `${scope}.note`,
    defaultMessage: 'Lưu ý: Thông tin đánh giá và nhận xét của bạn sẽ được công bố sau 7 ngày',
  },

  content: {
    id: `${scope}.content`,
    defaultMessage: 'Nội dung',
  },

  btnSubmit: {
    id: `${scope}.btnSubmit`,
    defaultMessage: 'Gửi',
  },
});

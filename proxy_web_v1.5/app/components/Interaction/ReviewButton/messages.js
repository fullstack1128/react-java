/*
 * ChatPage Messages
 *
 * This contains all the text for the ChatPage component.
 */
import { defineMessages } from 'react-intl';


const scope = 'app.containers.ChatPage.ReviewButton';

export default defineMessages({
  btnReview: {
    id: `${scope}.btnReview`,
    defaultMessage: 'Đánh giá',
  },

  reviewed: {
    id: `${scope}.reviewed`,
    defaultMessage: 'Bạn đã đánh giá',
  },
});

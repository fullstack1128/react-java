/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.NotFoundPage';

export default defineMessages({
  message: {
    id: `${scope}.message`,
    defaultMessage: 'We couldn\'t find the page you\'re looking for.\n' +
    'Please go back to the previous page, to the Home page or Contact for support.',
  },

  btnBackToHome: {
    id: `${scope}.btnBackToHome`,
    defaultMessage: 'Homepage',
  },

  btnContact: {
    id: `${scope}.btnContact`,
    defaultMessage: 'Contact',
  },
});

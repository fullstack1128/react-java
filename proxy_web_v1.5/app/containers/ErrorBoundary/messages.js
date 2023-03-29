import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ErrorBoundary';

export default defineMessages({
  messageError: {
    id: `${scope}.messageError`,
    defaultMessage: 'An error has occurred. Please reload the page.',
  },
});

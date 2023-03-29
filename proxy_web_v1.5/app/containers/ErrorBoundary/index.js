import React from 'react';
import * as Sentry from '@sentry/browser';
import env from 'env';
import StyledComponent from './styled';
import messages from './messages';
import { injectIntl } from 'react-intl';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error });
    // You can also log the error to an error reporting service

    if (env.SENTRY_ENABLE) {
      Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      if (env.ENVIRONMENT === 'dev') {
        console.error(`[ErrorBoundary]: ${this.state.error}`);
      }
      // You can render any custom fallback UI
      return (
        <StyledComponent>
          <h1>{ this.props.intl.formatMessage(messages.messageError)}</h1>
        </StyledComponent>
      );
    }
    return this.props.children;
  }
}

export default injectIntl(ErrorBoundary);

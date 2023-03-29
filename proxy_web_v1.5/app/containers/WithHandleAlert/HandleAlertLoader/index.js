import React from 'react';
import { CommonToaster } from 'components/CommonToaster';
import { Intent } from '@blueprintjs/core/lib/esm/index';
import { injectIntl } from 'react-intl';
import { getErrorMessageFromError } from '../../../constants/responseCode/utils';

class HandleAlertLoader extends React.Component {
  isString(s) {
    return typeof (s) === 'string' || s instanceof String;
  }

  handleAlertError = (error) => {
    CommonToaster.show({
      message: this.isString(error) ? error : this.props.intl.formatMessage(getErrorMessageFromError(error)),
      intent: Intent.DANGER,
    });
  };

  handleAlertSuccess = (message) => {
    CommonToaster.show({
      message: this.isString(message) ? message : this.props.intl.formatMessage(message),
      intent: Intent.SUCCESS,
    });
  };

  handleApiResponse = (err, response, cb) => {
    if (err) {
      this.handleAlertError(err);
    } else if (response.code === 0) {
      this.handleAlertError(response.message);
    } else {
      cb();
    }
  };

  cloneChild = (child) => React.cloneElement(child, {
    handleAlertError: this.handleAlertError,
    handleAlertSuccess: this.handleAlertSuccess,
    handleApiResponse: this.handleApiResponse,
  });

  render() {
    const { children } = this.props;

    const clonedChildren = React.Children.map(children, this.cloneChild);

    return <React.Fragment>{clonedChildren}</React.Fragment>;
  }
}

export default injectIntl(HandleAlertLoader);

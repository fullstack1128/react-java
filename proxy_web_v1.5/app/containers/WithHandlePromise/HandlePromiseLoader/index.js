import React from 'react';
import { cancelablePromise } from 'utils/utilHelper';
import { Intent } from '@blueprintjs/core/lib/esm/index';
import { CommonToaster } from 'components/CommonToaster';
import isString from 'lodash/isString';
import { injectIntl } from 'react-intl';
import { getErrorMessageFromError } from 'constants/responseCode/utils';

class HandlePromiseLoader extends React.Component {
  pendingPromises = [];

  appendPendingPromise = (promise) => {
    this.pendingPromises = [...this.pendingPromises, promise];
  }

  removePendingPromise = (promise) => {
    this.pendingPromises = this.pendingPromises.filter((p) => p !== promise);
  }

  componentWillUnmount = () => {
    this.pendingPromises.map((p) => p.cancel());
  }

  handlePromise = (promise, cbSuccess, cbError) => {
    const wrappedPromise = cancelablePromise(promise);
    this.appendPendingPromise(wrappedPromise);

    return wrappedPromise.promise
      .then((data) => {
        if (cbSuccess) {
          cbSuccess(data);
        }
      })
      .then(() => this.removePendingPromise(wrappedPromise))
      .catch((error) => {
        this.removePendingPromise(wrappedPromise);
        if (cbError) {
          cbError(error);
        } else {
          CommonToaster.show({
            message: isString(error) ? error : this.props.intl.formatMessage(getErrorMessageFromError(error)),
            intent: Intent.DANGER,
          });
        }
      });
  }

  cloneChild = (child) => React.cloneElement(child, {
    handlePromise: this.handlePromise,
  });

  render() {
    const { children } = this.props;

    const clonedChildren = React.Children.map(children, this.cloneChild);

    return <React.Fragment>{clonedChildren}</React.Fragment>;
  }
}

export default injectIntl(HandlePromiseLoader);

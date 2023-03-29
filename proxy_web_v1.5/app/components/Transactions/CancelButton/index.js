import React from 'react';
import { withRouter } from 'react-router';
import { routes } from 'containers/Routes/routeHelper';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import ButtonLink from '../../ButtonLink';

const handleCancel = (history) => {
  history.push(routes.HOME);
  window.scrollTo(0, 0);
};

// staticContext should be excluded from rest object. Otherwise, warning message thrown
const CancelButton = ({ text, onClick, intl, history, staticContext, ...rest }) => (
  <ButtonLink
    className={classNames(Classes.FILL, 'cancel-button')}
    text={text || intl.formatMessage(messages.backButton)}
    onClick={onClick || (() => handleCancel(history))}
    textDecoration
    {...rest}
  />
);

export default withRouter(injectIntl(CancelButton));

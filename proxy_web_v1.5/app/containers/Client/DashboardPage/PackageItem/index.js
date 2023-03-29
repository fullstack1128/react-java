import React, { Fragment } from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import ProxyPageIcon from 'images/sidebarIcon/ic_currency.svg';
import { Card, Elevation } from '@blueprintjs/core';
import { formatCurrency } from 'utils/numberHelper';
import Button from 'components/common/Button';
import messages from '../messages';

export class PackageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
      },
    };
  }

  render() {
    const {
      salePkg,
      unit,
      onClick,
      intl,
    } = this.props;

    return (
      <Card
        interactive
        elevation={Elevation.TWO}
        className="mb-2"
      >
        <div className="mb-5">
          <img src={ProxyPageIcon} height="50" width="50" />
        </div>
        <h5 className="title">{salePkg.name}</h5>
        {
          salePkg.content
            ? <span className="d-flex flex-column text-center" dangerouslySetInnerHTML={{ __html: salePkg.content }}></span>
            :
            <div className="d-flex flex-column text-center">
              <h7 className="text-black-51"> ✔ {intl.formatMessage(messages.pkgInfo1)}</h7>
              <h7 className="text-black-51"> ✔ {intl.formatMessage(messages.pkgInfo2)}</h7>
              <h7 className="text-black-51"> ✔ {intl.formatMessage(messages.pkgInfo3)}</h7>
              <h7 className="text-black-51"> ✔ {intl.formatMessage(messages.pkgInfo4)}</h7>
              <h7 className="text-black-51"> ✔ {intl.formatMessage(messages.pkgInfo5)}</h7>
            </div>
        }

        <h4 className="amount"> ${formatCurrency(salePkg.price)} / {salePkg.duration === 1 ? '' : salePkg.duration} {unit}s</h4>
        {salePkg.availableProxy === 0 ? <Button
          primary
          small
          type="button"
          className="mt-4 font-weight-bold text-white bg-primary"
          // onClick={onClick}
          loading={false}
        > {intl.formatMessage(messages.soldOut)} </Button>
          : <Button
            primary
            small
            type="button"
            className="mt-4 font-weight-bold text-white bg-primary"
            onClick={onClick}
            loading={false}
            style={{ background: 'blue' }}
          > {intl.formatMessage(messages.buynow)} </Button> }
      </Card>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(PackageItem);

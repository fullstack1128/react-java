import React, { Fragment } from 'react';
import { routes } from 'containers/Routes/routeHelper';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import { TO, convertDropdownList } from 'utils/utilHelper';
import { eModemStatus } from 'enums/EModemStatus';
import { eModemType } from 'enums/EModemType';
import auth from 'utils/auth';
import { Button, Card, Elevation } from '@blueprintjs/core';
import { getOverview } from 'services/admin/overview.service';

export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    const { intl, label, value, icon, css } = this.props;
    return (
      <Card interactive elevation={Elevation.TWO} className={css}>
        <h6 className="text-white">{label}</h6>
        <h2 className="text-white">{value}</h2>
        <div style={{ position: 'absolute', right: 25, bottom: 10 }}>
          <img src={icon} height="40" width="40" style={{ filter: 'grayscale(100%) invert(100%) brightness(200%)' }} />
        </div>
      </Card>
    );
  }
}

export default compose(
  injectIntl
)(Item);

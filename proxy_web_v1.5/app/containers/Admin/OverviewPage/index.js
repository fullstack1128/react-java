import React, { Fragment } from 'react';
import StyledContainer from 'containers/Admin/OverviewPage/styles';
import { forwardTo } from '../../../utils/history';
import { routes } from 'containers/Routes/routeHelper';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import { TO, convertDropdownList } from 'utils/utilHelper';
import { eModemStatus } from 'enums/EModemStatus';
import { eModemType } from 'enums/EModemType';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { Button, Card, Elevation } from '@blueprintjs/core';
import { Row, Col } from 'reactstrap';
import ProxyPageIcon from 'images/sidebarIcon/ic_currency.svg';
import CustomerPageIcon from 'images/sidebarIcon/ic_customer.svg';
import ModemPageIcon from 'images/sidebarIcon/ic_fee.svg';
import LicensePageIcon from 'images/sidebarIcon/ic-developer-board.svg';
import { getOverview } from 'services/admin/overview.service';
import Item from './Item';

export class OverviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overview: {},
      dataList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.props.handlePromise(getOverview(), (response) => {
      const { data } = response;
      this.setState({
        overview: {
          ...data,
        },
      });
    });
  }

  handleUpdateList = (data) => {
    this.setState({
      dataList: data,
    });
  }


  render() {
    const { intl } = this.props;
    const { dataList, overview } = this.state;
    return (
      <StyledContainer>
        <Row>
          <Col md={{ size: 8 }} className="pt-3">
            <h5>Statistical</h5>
            <Row>
              <Col md={{ size: 6 }}>
                <Item
                  label={'Total active users'}
                  value={overview.totalCustomers}
                  icon={CustomerPageIcon}
                  css={'bg-danger'}
                />
              </Col>
              <Col md={{ size: 6 }}>
                <Item
                  label={'Number of users with active license'}
                  value={overview.totalCusHaveActiveLicenses}
                  icon={CustomerPageIcon}
                  css={'bg-danger'}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col md={{ size: 8 }} className="pt-3">
            <h5>Proxy</h5>
            <div>
              <Row>
                <Col md={{ size: 6 }}>
                  <Item
                    label={'Total modem'}
                    value={overview.totalModems}
                    icon={ModemPageIcon}
                    css={'bg-info'}
                  />
                </Col>
                <Col md={{ size: 6 }}>
                  <Item
                    label={'Modem number is paused'}
                    value={overview.totalPendingModems}
                    icon={ModemPageIcon}
                    css={'bg-info'}
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={{ size: 6 }}>
                  <Item
                    label={'Total proxy'}
                    value={overview.totalProxies/2}
                    icon={ProxyPageIcon}
                    css={'bg-success'}
                  />
                </Col>
                <Col md={{ size: 6 }}>
                  <Item
                    label={'Number of available proxies'}
                    value={overview.totalAvailableProxies/2}
                    icon={ProxyPageIcon}
                    css={'bg-success'}
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={{ size: 6 }}>
                  <Item
                    label={'Total active license'}
                    value={overview.totalActiveLicenses}
                    icon={LicensePageIcon}
                    css={'bg-warning'}
                  />
                </Col>
                <Col md={{ size: 6 }}>
                  <Item
                    label={'License number expired today'}
                    value={overview.totalExpiredLicenses}
                    icon={LicensePageIcon}
                    css={'bg-warning'}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        {/*<Row className="pt-4">*/}
          {/*<Col md={{ size: 12 }}>*/}
            {/*<h5>Thông báo</h5>*/}
            {/*<Card>*/}
              {/*<NotificationList*/}
                {/*dataList={dataList}*/}
                {/*handleUpdateList={this.handleUpdateList}*/}
              {/*/>*/}
            {/*</Card>*/}
          {/*</Col>*/}
        {/*</Row>*/}

      </StyledContainer>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(OverviewPage);

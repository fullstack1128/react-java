import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { formatDataList } from 'utils/utilHelper';
import TransactionList from 'components/Transactions/TransactionList';
import { getLicenses } from 'services/admin/license.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { permission } from 'constants/permission';
import get from 'lodash/get';
import moment from 'moment';
import CheckboxPackage from 'components/Transactions/CheckboxPackage';
import Button from 'components/common/Button';
import styled, { css } from 'styled-components';

const getColumns = ({
                      intl,
                      handleSelectRow,
                      handleChangeIp,
                      handleSwitchModem,
                      handleSelectBox,
                      handleSelectAllRow,
                      isSelectedAll,
                      selectedIds,
                      togglePopupLocation,
                      handleExportTracking,
                    }) => (
  [
    {
      Header: intl.formatMessage(messages.no),
      accessor: 'index',
      headerClassName: 'table-header',
      width: 40,
    },
    {
      Header: <CheckboxPackage
        value={'ALL'}
        toggleSelection={(val, isSelected) => {
          handleSelectAllRow(!isSelected);
        }}
        isSelected={(val) => isSelectedAll}
      />,
      accessor: 'uuid',
      Cell: (row) => {
        if (row.original.status === 'EXPIRED') { return ''; }
        return (<CheckboxPackage
          value={row.value}
          toggleSelection={(val, isSelected) => {
            handleSelectBox(val, !isSelected);
          }}
          isSelected={(val) => selectedIds.includes(val)}
          full={row.original}
        />
        );
      },
      maxWidth: 40,
      sortable: false,
      headerStyle: { justifyContent: 'center' },
      style: { justifyContent: 'center' },
    },
    {
      Header: 'License',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const val = row.original;
        return (<div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
          {/* <span style={{ textAlign: 'left' }}><i className="fa fa-id-card" title={'License'} /> {val.uuid}</span> */}
          <span style={{ textAlign: 'left' }}><i className="fa fa-calendar" title={'Start'} /> {moment.utc(val.startDate).format('DD/MM/YYYY HH:mm:ss')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-calendar-star" title={'End'} /> {moment(val.expiredDate).format('DD/MM/YYYY HH:mm:ss')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-id-card" title={'Package'} /> {get(val, 'salePackage.name')}</span>
        </div>
        );
      },
      width: 200,
    },
    /* {
      Header: 'Package',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const val = row.original;
        let licenseLocation = get(val, 'location');
        if (licenseLocation === '') {
          licenseLocation = 'Unlimited';
        }
        return (<div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
          <span style={{ textAlign: 'left' }}><i className="fa fa-box-open" title="Package name" /> {get(val, 'salePackage.name')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-location-circle" title="Location" /> {licenseLocation}</span>
        </div>
        );
      },
      width: 120,
    }, */
    {
      Header: 'Status',
      accessor: 'status',
      headerClassName: 'table-header',
      sortable: false,
      width: 80,
    },
    {
      Header: 'Proxy',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        if (row.original.status === 'EXPIRED') { return ''; }
        const val = row.original;
        return (<div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }}>
          <span style={{ textAlign: 'left' }}><i className="fa fa-desktop" title="Modem" /> Modem: {get(val, 'httpProxy.modem.name')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-asterisk" title="Port http" /> Http Port: {get(val, 'httpProxy.sharedPort')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-atom" title="Port socks5" /> Sock Port: {get(val, 'sockProxy.sharedPort')}</span>

        </div>
        );
      },
      width: 200,
    },
    {
      Header: 'Authentication',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        if (row.original.status === 'EXPIRED') { return ''; }
        const val = row.original;
        return (<div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }}>
          <span style={{ textAlign: 'left' }}><i className="fa fa-user-lock" title="Authentication User" /> {get(val, 'authUser')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-globe" title="Authentication Ips" /> {get(val, 'ipWhitelist')}</span>
        </div>
        );
      },
      width: 160,
    },
    {
      Header: 'Customer',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const val = row.original;
        return (<div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
          <span style={{ textAlign: 'left' }}><i className="fa fa-id-card" title="Customer Name" /> {get(val, 'customer.email')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-badge-dollar" title="Transaction" /> {get(val, 'transaction.uuid')}</span>
        </div>
        );
      },
      width: 280,
    },
    {
      Header: 'Rotation Time',
      accessor: 'autoRotationTime',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Lasted',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const val = row.original;
        return (<div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
          <span style={{ textAlign: 'left' }}><i className="fa fa-calendar-check" title="Last time I changed IP" /> {val.lastChangeIp === null ? '' : moment(val.lastChangeIp).format('DD/MM/YYYY HH:mm:ss')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-calendar-check" title="Last time changed location" /> {val.lastChangeLocation === null ? '' : moment(val.lastChangeLocation).format('DD/MM/YYYY HH:mm:ss')}</span>
        </div>
        );
      },
      width: 200,
    },
    {
      Header: 'Action',
      accessor: 'uuid',
      headerClassName: 'table-header',
      sortable: false,
      width: 110,
      Cell: (row) => {
        if (row.original.status === 'EXPIRED') {
          return (
            <Fragment>
              <div className="flex flex-column align-content-end action-btn">
                <div className="text-left">
                  <Button
                    primary
                    small
                    onClick={() => { handleSelectRow(row.original.uuid); }}
                    type="button"
                  ><i className="fa fa-edit" /> Update</Button>
                </div>
              </div>
            </Fragment>
          );
        }

        return (
          <Fragment>
            <div className="flex flex-column align-content-end action-btn">
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleSelectRow(row.original.uuid); }}
                  type="button"
                ><i className="fa fa-edit" /> Update</Button>
              </div>
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleChangeIp(get(row.original, 'uuid')); }}
                  type="button"
                ><i className="fa fa-wrench" /> Change IP</Button>
              </div>
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleSwitchModem(row.original.uuid); }}
                  type="button"
                ><i className="fa fa-desktop" /> Switch modem</Button>
              </div>
            </div>
          </Fragment>
        );
      },
    },
  ]
);

const DEFAULT_PAGES = -1;

const StyledComponent = styled.div`
  .action-btn {
    .bp3-button {
      font-size: 9px;
      padding: 0 3px 0 3px;
      margin-bottom: 1px;
      width: 100%;
    }
  }
  
`;

class LicenseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      pages: DEFAULT_PAGES,
    };
  }

  fetchData = async (state) => {
    this.setState({ isLoading: true });
    const { handleUpdateModemList } = this.props;
    const { page, pageSize, sorted } = state;
    const requestBody = {
      filtered: this.toFilteredList(),
      pageSize,
      page,
      sorted,
    };

    this.props.handlePromise(getLicenses(requestBody), (response) => {
      const { data, pages } = response.data;
      handleUpdateModemList(formatDataList(data, page, pageSize));
      this.setState({
        pages,
        isLoading: false,
      });
    });
  };

  toFilteredList = () => {
    const { filteredList } = this.props;
    return Object
      .entries(filteredList)
      .map((entry) => ({
        id: entry[0],
        value: Array.isArray(entry[1]) ? entry[1].join(',') : entry[1],
      }));
  };

  render() {
    const {
      intl,
      dataList,
      getKeyFromFilteredList,
      handleSelectRow,
      handleChangeIp,
      handleSwitchModem,
      handleSelectBox,
      handleSelectAllRow,
      isSelectedAll,
      selectedIds,
      togglePopupLocation,
      handleExportTracking,
    } = this.props;

    const { pages, isLoading } = this.state;
    const columns = getColumns({
      intl,
      handleSelectRow,
      handleChangeIp,
      handleSwitchModem,
      handleSelectBox,
      handleSelectAllRow,
      isSelectedAll,
      selectedIds,
      togglePopupLocation,
      handleExportTracking,
    });

    return (
      <StyledComponent>
        <TransactionList
          key={getKeyFromFilteredList()}
          manual
          data={dataList}
          pages={pages}
          loading={isLoading}
          columns={columns}
          onFetchData={this.fetchData}
          defaultSorted={[
            {
              id: 'createdDate',
              desc: true,
            },
          ]}
        />
      </StyledComponent>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl,
)(LicenseList);

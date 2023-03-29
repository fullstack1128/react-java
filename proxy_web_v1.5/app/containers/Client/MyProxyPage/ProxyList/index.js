import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { formatDataList, bytesToSize } from 'utils/utilHelper';
import TransactionList from 'components/Transactions/TransactionList';
import { getLicenses } from 'services/user.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { permission } from 'constants/permission';
import get from 'lodash/get';
import moment from 'moment';
import ButtonCopy from 'components/common/ButtonCopy';
import CheckboxPackage from 'components/Transactions/CheckboxPackage';
import ProxyInfo from 'components/common/ProxyInfo';
import Button from 'components/common/Button';
import styled, { css } from 'styled-components';

const getColumns = ({
                      intl,
                      selectedIds,
                      handleSelectRow,
                      handleAction,
                      togglePopup,
                      handleSelectOneRow,
                      handleSelectAllRow,
                      isSelectedAll,
                      togglePopupAutoRotation,
                      handleGetLinkChangeIp,
                      handleStatusApi,
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
        const rowItem = row.value;
        return (
          <CheckboxPackage
            value={rowItem}
            toggleSelection={(val, isSelected) => {
              handleSelectRow(val, !isSelected);
            }}
            isSelected={(val) => selectedIds.includes(val)}
            full={null}
          />
        );
      },
      maxWidth: 50,
      sortable: false,
      headerStyle: { justifyContent: 'center' },
      style: { justifyContent: 'center' },
    },
    {
      Header: 'Detail Proxy',
      accessor: 'id',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const val = row.original;
        if (val.status === 'EXPIRED') { return ''; }
        return (<ProxyInfo
          httpProxy={val.httpProxy}
          sockProxy={val.sockProxy}
          location={get(val, 'httpProxy.modem.location')}
          proxy={get(val, 'salePackage.name')}
        />);
      },
      width: 330,
    },
    {
      Header: 'Start date / Expired',
      accessor: 'startDate',
      headerClassName: 'table-header',
      sortable: false,
      width: 190,
      Cell: (row) => {
        const val = row.original;
        return (<div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }}>
          <span style={{ textAlign: 'left' }}><i className="fa fa-calendar" title="Start date" /> {moment.utc(val.startDate).format('DD/MM/YY HH:mm:ss')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-calendar-check" title="Expired" /> {moment.utc(val.expiredDate).format('DD/MM/YY HH:mm:ss')}</span>
        </div>
        );
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const val = row.original;
        const statusTxt = row.value === 'ACTIVE' ? 'Active' : 'Expired';
        if (row.value === 'ACTIVE') {
          const proxyStatus = get(val, 'httpProxy.status');
          const uuid = get(val, 'uuid');
          if (proxyStatus === 'CONNECTED') {
            return (<div className="d-flex flex-column">
              <span style={{ fontSize: 16, color: '#65df65', fontWeight: 'bold' }}>{get(val, 'httpProxy.publicIp')}</span>
              <span><b>{statusTxt}</b>&nbsp;
                <a
                  onClick={() => { handleSelectOneRow(uuid); handleAction('CHANGE_IP'); }}
                >
                  <i className="fa fa-sync" title="Change IP" style={{ cursor: 'pointer' }} /></a>
              </span>
            </div>);
          }

          return (<Fragment>
            <span style={{ fontSize: 16, color: '#df544e', fontWeight: 'bold' }}>{proxyStatus}</span>
          </Fragment>);
        }

        return (<Fragment>
          <b>{statusTxt}</b>
        </Fragment>);
      },
      width: 150,
    },
    {
      Header: 'Upload/Download Counter',
      accessor: 'status',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const ul = get(row, 'original.httpProxy.counterUlUsedBytes', 0) + get(row, 'original.sockProxy.counterUlUsedBytes', 0);
        const dl = get(row, 'original.httpProxy.counterDlUsedBytes', 0) + get(row, 'original.sockProxy.counterDlUsedBytes', 0);
        return (<Fragment>{bytesToSize(ul)}/{bytesToSize(dl)}</Fragment>);
      },
      width: 170,
    },
    {
      Header: 'Action',
      accessor: 'uuid',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        if (row.original.status === 'EXPIRED') {
          return '';
        }

        const val = row.value;
        return (
          <Fragment>
            <div className="flex flex-column align-content-end action-btn">
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleStatusApi(val); }}
                  type="button"
                ><i className="fa fa-badge" /> Status API</Button>
              </div>
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleGetLinkChangeIp(val); }}
                  type="button"
                ><i className="fa fa-globe-asia" /> Link change IP</Button>
              </div>
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleSelectOneRow(val); togglePopupAutoRotation(true, get(row, 'original.autoRotationTime'), get(row, 'original.salePackage.minTimeChangeIp')); }}
                  type="button"
                ><i className="fa fa-sync" /> Auto rotation</Button>
              </div>
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleSelectOneRow(val); handleAction('REBOOT_DEVICE'); }}
                  type="button"
                ><i className="fa fa-wrench" /> Reboot device</Button>
              </div>
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleSelectOneRow(val); togglePopup(true); }}
                  type="button"
                ><i className="fa fa-user-lock" /> Authentication</Button>
              </div>
              <div className="text-left">
                <Button
                  primary
                  small
                  onClick={() => { handleSelectOneRow(val); handleAction('EXTEND_LICENSE'); }}
                  type="button"
                ><i className="fa fa-redo" /> Extend</Button>
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

class ModemList extends React.Component {
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
      selectedIds,
      getKeyFromFilteredList,
      handleSelectRow,
      handleAction,
      togglePopup,
      handleSelectOneRow,
      handleSelectAllRow,
      isSelectedAll,
      togglePopupAutoRotation,
      handleGetLinkChangeIp,
      handleStatusApi,
    } = this.props;

    const { pages, isLoading } = this.state;
    const columns = getColumns({
      intl,
      selectedIds,
      handleSelectRow,
      handleAction,
      togglePopup,
      handleSelectOneRow,
      handleSelectAllRow,
      isSelectedAll,
      togglePopupAutoRotation,
      handleGetLinkChangeIp,
      handleStatusApi,
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
)(ModemList);

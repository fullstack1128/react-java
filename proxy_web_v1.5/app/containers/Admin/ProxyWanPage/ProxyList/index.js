import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { formatDataList, bytesToSize } from 'utils/utilHelper';
import TransactionList from 'components/Transactions/TransactionList';
import { getProxies } from 'services/admin/proxy.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { permission } from 'constants/permission';
import get from 'lodash/get';
import moment from 'moment';
import { formatCurrency } from 'utils/numberHelper';
import CheckboxPackage from 'components/Transactions/CheckboxPackage';

const getColumns = ({
                      intl,
                      handleSelectBox,
                      handleSelectAllRow,
                      isSelectedAll,
                      selectedIds,
                    }) => (
  [
    {
      Header: intl.formatMessage(messages.no),
      accessor: 'index',
      headerClassName: 'table-header',
      width: 50,
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
      Cell: (row) => (<CheckboxPackage
        value={row.value}
        toggleSelection={(val, isSelected) => {
          handleSelectBox(val, !isSelected);
        }}
        isSelected={(val) => selectedIds.includes(val)}
        full={row.original}
      />
        ),
      maxWidth: 40,
      sortable: false,
      headerStyle: { justifyContent: 'center' },
      style: { justifyContent: 'center' },
    },
    {
      Header: 'Modem',
      accessor: 'id',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const val = row.original;
        return (<div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
          <span style={{ textAlign: 'left' }}><i className="fa fa-desktop" title="Modem Name" /> {get(val, 'modem.name')}</span>
          <span style={{ textAlign: 'left' }}><i className="fa fa-globe" title="Domain" /> {get(val, 'modem.domain')}</span>
        </div>
        );
      },
      width: 190,
    },
    {
      Header: 'Position',
      accessor: 'xproxyPosition',
      headerClassName: 'table-header',
      sortable: false,
      width: 70,
    },
    {
      Header: 'Shared Port',
      accessor: 'sharedPort',
      headerClassName: 'table-header',
      sortable: false,
      width: 120,
      Cell: (row) => {
        const val = row.original;
        const brotherPort = get(val, 'brotherPort', '');
        return (
          <span>{row.value}{brotherPort !== '' && brotherPort !== null ? `/${brotherPort}` : ''}</span>
        );
      } },
    {
      Header: 'Port Type',
      accessor: 'portType',
      headerClassName: 'table-header',
      sortable: false,
      width: 90,
    },
    {
      Header: 'Ul Bytes',
      accessor: 'counterUlUsedBytes',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span>{bytesToSize(row.value)}</span>
      ),
    },
    {
      Header: 'Dl Bytes',
      accessor: 'counterDlUsedBytes',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span>{bytesToSize(row.value)}</span>
      ),
    },
    {
      Header: 'All Bytes',
      accessor: 'counterAllUsedBytes',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span>{bytesToSize(row.value)}</span>
      ),
    },
    {
      Header: 'Counter Updated',
      accessor: 'counterAllUpdated',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Authentication user',
      accessor: 'authenticationUsers',
      headerClassName: 'table-header',
      sortable: false,
      width: 130,
    },
    {
      Header: 'Authorization_ips',
      accessor: 'authorizationIps',
      headerClassName: 'table-header',
      sortable: false,
      width: 140,
    },
    {
      Header: 'Usage Status',
      accessor: 'saleStatus',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Status',
      accessor: 'status',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'License',
      accessor: 'id',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => {
        const val = row.original;
        return (<span style={{ fontSize: 11 }}>{get(val, 'license.uuid', get(val, 'licenseSock.uuid', ''))}</span>);
      },
      width: 250,
    },
  ]
);

const DEFAULT_PAGES = -1;

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

    this.props.handlePromise(getProxies(requestBody), (response) => {
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
      handleSelectBox,
      handleSelectAllRow,
      isSelectedAll,
      selectedIds,
    } = this.props;

    const { pages, isLoading } = this.state;
    const columns = getColumns({
      intl,
      handleSelectBox,
      handleSelectAllRow,
      isSelectedAll,
      selectedIds,
    });

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl,
)(ModemList);

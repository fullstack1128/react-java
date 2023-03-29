import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { formatDataList } from 'utils/utilHelper';
import TransactionList from 'components/Transactions/TransactionList';
import { getCustomers } from 'services/admin/customer.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { formatCurrency } from '../../../../utils/numberHelper';
import { permission } from 'constants/permission';
import get from 'lodash/get';
import moment from 'moment';

const getColumns = ({
                      intl,
                      handleSelectRow,
                      handleTopup,
                      handleRefund,
                      handleUpdateCustomer,
                    }) => (
  [
    {
      Header: intl.formatMessage(messages.no),
      accessor: 'index',
      headerClassName: 'table-header',
      width: 50,
    },
    {
      Header: 'Customer ID',
      accessor: 'uuid',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span style={{ fontSize: 11 }}>{row.value}</span>
      ),
      width: 270,
    },
    {
      Header: 'Name',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Email',
      accessor: 'email',
      headerClassName: 'table-header',
      sortable: false,
      width: 280,
    },
    {
      Header: 'Address',
      accessor: 'address',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
          <span style={{ textAlign: 'left' }}>Address: {get(row, 'original.address')}</span>
          <span style={{ textAlign: 'left' }}>City: {get(row, 'original.city')}</span>
          <span style={{ textAlign: 'left' }}>Country: {get(row, 'original.country')}</span>
        </div>
      ),
      width: 200,
    },
    {
      Header: 'Balance',
      accessor: 'balance',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span>{formatCurrency(row.value)}</span>
      ),
    },
    {
      Header: 'Date Created',
      accessor: 'createdAt',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span>{moment.utc(row.value).format('DD/MM/YYYY')}</span>
      ),
    },
    {
      Header: intl.formatMessage(messages.action),
      accessor: 'id',
      className: 'action-cell',
      sortable: false,
      width: 100,
      Cell: (row) => (
        <Fragment>
          <a onClick={() => handleSelectRow(row.original.uuid)} className="ml-2 color-edit" title="Change password"><i className="fa fa-user-lock" /></a>
          <a onClick={() => handleUpdateCustomer(true, row.original.uuid)} className="ml-2 color-edit" title="Change email"><i className="fa fa-user-crown" /></a>
          <a onClick={() => handleTopup(true, row.original.uuid)} className="ml-2 color-edit" title="Topup"><i className="fa fa-money-bill" /></a>
          <a onClick={() => handleRefund(true, row.original.uuid)} className="ml-2 color-edit" title="Refund"><i className="fa fa-money-check" /></a>
        </Fragment>
      ),
      headerStyle: { justifyContent: 'center' },
      style: { justifyContent: 'center' },
    },
  ]
);

const DEFAULT_PAGES = -1;

class CustomerList extends React.Component {
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

    this.props.handlePromise(getCustomers(requestBody), (response) => {
      const { data, pages } = response.data;
      handleUpdateModemList(formatDataList(data, page, pageSize));
      this.setState({
        pages,
        isLoading: false,
      });
    });
  }

  toFilteredList = () => {
    const { filteredList } = this.props;
    return Object
      .entries(filteredList)
      .map((entry) => ({
        id: entry[0],
        value: Array.isArray(entry[1]) ? entry[1].join(',') : entry[1],
      }));
  }

  render() {
    const {
      intl,
      dataList,
      getKeyFromFilteredList,
      handleSelectRow,
      handleTopup,
      handleRefund,
      handleUpdateCustomer,
    } = this.props;

    const { pages, isLoading } = this.state;
    const columns = getColumns({
      intl,
      handleSelectRow,
      handleTopup,
      handleRefund,
      handleUpdateCustomer,
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
  injectIntl
)(CustomerList);

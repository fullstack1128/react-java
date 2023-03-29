import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { formatDataList } from 'utils/utilHelper';
import TransactionList from 'components/Transactions/TransactionList';
import { getTransactions } from 'services/admin/transaction.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { permission } from 'constants/permission';
import { formatCurrency } from '../../../../utils/numberHelper';
import moment from 'moment';
import FormTextArea from 'components/common/FormTextArea';

const getColumns = ({
                      intl,
                      handleSelectRow,
                    }) => (
  [
    {
      Header: intl.formatMessage(messages.no),
      accessor: 'index',
      headerClassName: 'table-header',
      width: 50,
    },
    {
      Header: 'Transaction code',
      accessor: 'uuid',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span style={{ fontSize: 11 }}>{row.value}</span>
      ),
      width: 270,
    },
    {
      Header: 'Customer',
      accessor: 'customer.email',
      headerClassName: 'table-header',
      width: 150,
      sortable: false,
    },
    {
      Header: 'Transaction Type',
      accessor: 'type',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span>{formatCurrency(row.value)}</span>
      ),
    },
    {
      Header: 'Trading date',
      accessor: 'createdAt',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <span>{moment.utc(row.value).format('DD/MM/YYYY')}</span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Description',
      accessor: 'description',
      headerClassName: 'table-header',
      sortable: false,
      width: 300,
      Cell: (row) => (
        <FormTextArea
          rows={2}
          value={row.value}
        />),
    },
  ]
);

const DEFAULT_PAGES = -1;

class PackageList extends React.Component {
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

    this.props.handlePromise(getTransactions(requestBody), (response) => {
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
      handleRemoveRow,
      associates,
    } = this.props;

    const { pages, isLoading } = this.state;
    const columns = getColumns({
      intl,
      handleSelectRow,
      handleRemoveRow,
      associates,
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
)(PackageList);

import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { formatDataList } from 'utils/utilHelper';
import TransactionList from 'components/Transactions/TransactionList';
import { getTransactions } from 'services/user.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import moment from 'moment';
import { permission } from 'constants/permission';
import { formatCurrency } from 'utils/numberHelper';
import FormTextArea from 'components/common/FormTextArea';

const getColumns = ({
                      intl,
                      handleGuide,
                    }) => (
  [
    {
      Header: 'No.',
      accessor: 'index',
      headerClassName: 'table-header',
      width: 50,
    },
    {
      Header: 'Created date',
      accessor: 'createdAt',
      headerClassName: 'table-header',
      Cell: (row) => (<Fragment>{moment.utc(row.value).format('DD/MM/YY HH:mm:ss')}</Fragment>),
    },
    {
      Header: 'Transaction type',
      accessor: 'type',
      headerClassName: 'table-header',
      Cell: (row) => {
        let text;
        switch (row.value) {
          case 'TOPUP':
            text = 'Topup';
            break;
          case 'PURCHASE':
            text = 'Purchase Proxy';
            break;
          case 'EXTEND':
            text = 'Extend license';
            break;
          case 'REFUND':
            text = 'Refund';
            break;
          default:
            text = '';
        }
        return (<Fragment>{text}</Fragment>);
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      headerClassName: 'table-header',
      Cell: (row) => {
        if (row.value === 'PROCESSING') {
          return (<div style={{ color: 'red' }}> {row.value}</div>);
        }
        return (<div style={{ color: 'green' }}>{row.value}</div>);
      },
    },
    {
      Header: 'Amount (USD)',
      accessor: 'amount',
      headerClassName: 'table-header',
      Cell: (row) => (<Fragment>{formatCurrency(row.value)}</Fragment>),
    },
    {
      Header: 'Description',
      accessor: 'description',
      headerClassName: 'table-header',
      width: 300,
      Cell: (row) => (
        <FormTextArea
          rows={2}
          value={row.value}
        />),
    },
    {
      Header: 'Action',
      accessor: 'uuid',
      className: 'action-cell',
      sortable: false,
      width: 110,
      Cell: (row) => {
        if (row.original.type === 'TOPUP' && row.original.status === 'PROCESSING') {
          return (
            <Fragment>
              <a
                onClick={() => handleGuide(true, row.value)}
                className="ml-2 color-edit"
                title="Transfer Information"
              >
                <i className="fa fa-book-alt fa-2x" /></a>
            </Fragment>
          );
        }
        return '';
      },
      headerStyle: { justifyContent: 'center' },
      style: { justifyContent: 'center' },
    },
  ]
);

const DEFAULT_PAGES = -1;

class ClientTransactionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      pages: DEFAULT_PAGES,
    };
  }

  fetchData = async (state) => {
    this.setState({ isLoading: true });
    const { handleUpdateList } = this.props;
    const { page, pageSize, sorted } = state;
    const requestBody = {
      pageSize,
      page,
      sorted,
    };

    this.props.handlePromise(getTransactions(requestBody), (response) => {
      const { data, pages } = response.data;
      handleUpdateList(formatDataList(data, page, pageSize));
      this.setState({
        pages,
        isLoading: false,
      });
    });
  }


  render() {
    const {
      intl,
      dataList,
      handleGuide,
      getKeyFromFilteredList,
    } = this.props;

    const { pages, isLoading } = this.state;
    const columns = getColumns({
      intl,
      handleGuide,
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
)(ClientTransactionList);

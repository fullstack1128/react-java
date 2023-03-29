import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { formatDataList } from 'utils/utilHelper';
import TransactionList from 'components/Transactions/TransactionList';
import { getModems } from 'services/admin/modem.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import moment from 'moment';
import { permission } from 'constants/permission';

const getColumns = ({
                      intl,
                      handleSelectRow,
                      handlePause,
                      handleResume,
                      handleSync,
                      handleDelete,
                    }) => (
  [
    {
      Header: intl.formatMessage(messages.no),
      accessor: 'index',
      headerClassName: 'table-header',
      width: 50,
    },
    {
      Header: 'Modem Name',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Domain',
      accessor: 'domain',
      headerClassName: 'table-header',
      sortable: false,
      width: 250,
      Cell: (row) => (
        <a href={row.value} target="_blank">{row.value}</a>
        ),
    },
    {
      Header: 'Location',
      accessor: 'location',
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
      Header: 'ISP',
      accessor: 'isp',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Modem Type',
      accessor: 'type',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Created Date',
      accessor: 'createdAt',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => moment.utc(row.original.createdDate).format('DD/MM/YYYY'),
    },
    {
      Header: intl.formatMessage(messages.action),
      accessor: 'status',
      className: 'action-cell',
      sortable: false,
      width: 110,
      Cell: (row) => (
        <Fragment>
          <a onClick={() => handleSelectRow(row.original.uuid)} className="ml-2 color-edit" title="Update"><i className="fa fa-edit" /></a>
          <a onClick={() => handleSync(row.original.uuid)} className="ml-2 color-edit" title="Sync"><i className="fa fa-sync" /></a>
          {row.value === 'READY'
            ? <a onClick={() => handlePause(row.original.uuid)} className="ml-2 color-edit" title="Pause"><i className="fa fa-pause" /></a>
            : <a onClick={() => handleResume(row.original.uuid)} className="ml-2 color-edit" title="Ready"><i className="fa fa-play-circle" /></a> }
          <a onClick={() => handleDelete(row.original.uuid)} className="ml-2 color-edit" title="Delete"><i className="fa fa-trash" /></a>
        </Fragment>
        ),
      headerStyle: { justifyContent: 'center' },
      style: { justifyContent: 'center' },
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

    this.props.handlePromise(getModems(requestBody), (response) => {
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
      handlePause,
      handleResume,
      handleSync,
      handleDelete,
    } = this.props;

    const { pages, isLoading } = this.state;
    const columns = getColumns({
      intl,
      handleSelectRow,
      handlePause,
      handleResume,
      handleSync,
      handleDelete,
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

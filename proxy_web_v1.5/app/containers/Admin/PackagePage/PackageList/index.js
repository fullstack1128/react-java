import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { formatDataList } from 'utils/utilHelper';
import TransactionList from 'components/Transactions/TransactionList';
import { getPackages } from 'services/admin/package.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { permission } from 'constants/permission';
import isEmpty from 'lodash/isEmpty';

const getColumns = ({
                      intl,
                      handleRemoveRow,
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
      Header: 'Package name',
      accessor: 'name',
      headerClassName: 'table-header',
      sortable: false,
      width: 150,
    },
    {
      Header: 'Time unit',
      accessor: 'packageUnit',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Time',
      accessor: 'duration',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Price',
      accessor: 'price',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: intl.formatMessage(messages.status),
      accessor: 'status',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'Allow IP change',
      accessor: 'allowChangeIp',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <Fragment>
          {row.value === 1 ? 'Yes' : 'No'}
        </Fragment>
      ),
    },
    {
      Header: 'Allow Location Change',
      accessor: 'allowChangeLocation',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <Fragment>
          {row.value === 1 ? 'Yes' : 'No'}
        </Fragment>
      ),
    },
    {
      Header: 'Minimum IP Change Time (seconds)',
      accessor: 'minTimeChangeIp',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: 'ISP',
      accessor: 'isp',
      headerClassName: 'table-header',
      sortable: false,
      Cell: (row) => (
        <Fragment>
          {isEmpty(row.value) ? 'Unlimited' : row.value}
        </Fragment>
      ),
    },
    {
      Header: 'Order',
      accessor: 'seq',
      headerClassName: 'table-header',
      sortable: false,
    },
    {
      Header: intl.formatMessage(messages.action),
      accessor: 'id',
      className: 'action-cell',
      sortable: false,
      width: 100,
      Cell: (row) => (
        <Fragment>
          <a onClick={() => handleSelectRow(row.original.uuid)} className="ml-2 color-edit" title="Update"><i className="fa fa-edit" /></a>
          <a onClick={() => handleRemoveRow(row.original.uuid)} className="ml-2 color-edit" title="Delete"><i className="fa fa-eraser" /></a>
        </Fragment>
        ),
      headerStyle: { justifyContent: 'center' },
      style: { justifyContent: 'center' },
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

    this.props.handlePromise(getPackages(requestBody), (response) => {
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

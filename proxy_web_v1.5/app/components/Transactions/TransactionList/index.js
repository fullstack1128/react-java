import React from 'react';
import StyledComponent from './styled';
import NoDataComponent from './NoDataComponent';
import LoadingComponent from './LoadingComponent';
import * as PropTypes from 'prop-types';

const TABLE_HEIGHT = 200;
const ROW_HEIGHT = 50;
const PAGINATION_HEIGHT = 70;

// eslint-disable-next-line react/prefer-stateless-function
class TransactionList extends React.Component {
  render() {
    const { loading, messageNoData, data, defaultPageSize, hideNoData = false, ...rest } = this.props;

    const height = `${defaultPageSize ? ((defaultPageSize * ROW_HEIGHT) + PAGINATION_HEIGHT) : TABLE_HEIGHT}px`;

    return (<StyledComponent
      {...rest}
      data={loading ? [] : data}
      resizable={false}
      noDataComponent={() => {
        if (!loading && !hideNoData) {
          return (<NoDataComponent
            message={messageNoData}
            height={height}
          />);
        }
        return null;
      }}
      LoadingComponent={() => {
        if (loading) {
          return <LoadingComponent height={height} />;
        }
        return null;
      }}
    />);
  }

  static propTypes = {
    loading: PropTypes.bool,
    messageNoData: PropTypes.string,
  }
}


export default TransactionList;

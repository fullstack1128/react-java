import React from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import Pagination from 'components/common/Pagination';
import NotFoundTable from 'components/common/Table/NotFoundTable';
import messages from '../messages';
import * as PropTypes from 'prop-types';
import { DEFAULT_TABLE_PAGE_SIZE } from 'utils/transactions/constants';
import iconNoSort from '../../../images/noSort.svg';
import sortDesc from '../../../images/sortDesc.svg';
import sortAsc from '../../../images/sortAsc.svg';

const StyledTable = styled(ReactTable)`
  &.ReactTable {
    border: none !important;
    font-size: ${(props) => props.theme.fontSizes.small};
    
    .rt-thead {
      &.-headerGroups,
      &.-header {
        box-shadow: inset 0 -1px #e6ebf1 !important;

        .rt-th {
          color: #313131cc;
          font-size: ${(props) => props.theme.fontSizes.small12};
          font-weight: ${(props) => props.theme.fontWeights.strong700};
          padding-top: 15px;
          padding-bottom: 15px;
          text-transform: uppercase;
          white-space: normal;
        }
      }

      &.-header {
        .rt-th {
          border-right: none !important;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          text-align: left;

          & > div {
            display: flex;
            flex-flow: column wrap;
          }

          &:last-child {
            padding-right: 20px;
          }
          &:first-child {
            padding-left: 20px;
          }
        }

        .rt-th, .rt-td {
          &.-cursor-pointer {
            box-shadow: none;

            &:after {
              content: '';
              background-image: url("${iconNoSort}");
              margin-left: 5px;
              height: 16px;
              width: 8px;
              background-position: center;
              background-repeat: no-repeat;
            }

            &.-sort-desc {
              &:after {
                background-image: url("${sortDesc}");
              }
            }

            &.-sort-asc {
              &:after {
                background-image: url("${sortAsc}");
              }
            }
          }
        }

        .unit {
          font-size: ${(props) => props.theme.fontSizes.small10};
          font-weight: ${(props) => props.theme.fontWeights.strong300};
        }
      }
    }

    .rt-tbody{
      .rt-td {
        padding: 13px 5px;
        border-right: none !important;
        // color: #313131b3;
        text-align: center;
        justify-content: flex-start;
        align-items: center;
        display: flex;

        &:last-child {
          padding-right: 20px;
        }
        &:first-child {
          padding-left: 20px;
        }
      }

      .rt-tr-group:last-child {
        border-bottom: solid 1px rgba(0,0,0,0.05);
      }
    }

    .rt-tfoot{
      box-shadow: none;

      .rt-td {
        padding: 13px 5px;
        border-right: none !important;
        color: #313131cc;
        font-weight: ${(props) => props.theme.fontWeights.strong700};
        text-align: center;
        justify-content: flex-start;
        align-items: center;
        display: flex;

        &:last-child {
          padding-right: 20px;
        }
        &:first-child {
          padding-left: 20px;
        }
      }
    }
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class Table extends React.Component {
  render() {
    const { data, intl, columns, noDataComponent } = this.props;
    // console.log(this.props);

    let showPagination = false;
    if (data && data.length > 0) {
      showPagination = true;
    }

    // Config hiển thị tooltips cho cell
    const newColumns = columns.map((col) => {
      if (!col.Cell) {
        col.Cell = (row) => (typeof row.value === 'string' || row.value instanceof String) ?
          <span
            title={row.value}
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >{row.value}</span>
          :
          row.value;
      }
      return col;
    });

    return (
      <StyledTable
        showPagination={showPagination}
        showPageSizeOptions
        PaginationComponent={Pagination}
        NoDataComponent={noDataComponent || NotFoundTable}
        defaultPageSize={DEFAULT_TABLE_PAGE_SIZE}
        loadingText={intl.formatMessage(messages.tableLoading)}
        columns={newColumns}
        getTrProps={this.getTrProps}
        {...this.props}
        minRows={0}
        resizable={false}
      />
    );
  }
}

Table.propTypes = {
  noDataComponent: PropTypes.any,
};

export default injectIntl(Table);

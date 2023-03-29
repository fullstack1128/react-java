import styled from 'styled-components';
import Table from '../../common/Table';


const StyledComponent = styled(Table)`
  &.ReactTable {
    .rt-thead {
      &.-headerGroups {
        border-radius: 10px 10px 0 0;
        background-color: #f4f3f8;

        &+.-header {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }

      &.-header {
        border-radius: 10px;
        background-color: #f4f3f8;
      }

      .rt-th.-sort-desc{
        box-shadow: none !important;
      }
    }
  }
  
  .red{
    color: #BF0101 !important;
  }

  .green{
    color: #41B652 !important;
  }

  .rt-tbody {
    .rt-td {
      color: #000000cc;
    }
  }
`;


export default StyledComponent;

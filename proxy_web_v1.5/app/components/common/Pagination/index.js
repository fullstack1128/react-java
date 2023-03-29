import React, { Component } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { Icon } from '@blueprintjs/core';
import DropdownList from 'components/DropdownList';

export const StyledPagination = styled.div`
  margin: 30px 0 20px;
  display: flex;

  .select-page{
    width: 10%;
    .react-select__single-value {
      font-weight: 500;
    }
  }
  
  .item-page {
    margin-left: 35%;
  }
  
  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    justify-content: center;
    padding: 0;
    
    li {
      a { 
        border-radius: 50%;
        width: 20px;
        height: 20px;  
        color: #313131;
        font-size: ${(props) => props.theme.fontSizes.small12};
        font-weight: 300;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:active, &:focus {        
          text-decoration: none;
        }
        
        svg {          
          color: #313131;
        }
      }
        
      &:not(.disabled) {
        &:hover, &:active {        
          a {            
            background: ${(props) => props.theme.colors.gray900};
          }
        }
          
        &.active {               
          a {
            background-color: #41B652;
            color: #ffffff;
            font-weight: 500;
          }
        }
      }
      
      &.disabled {
        opacity: 0.3;
      
        a {
          cursor: default;
        }
      }
        
      &:not(:last-child) {
        margin-right: 18px;
      }
    }  
  }
`;

class CommonPagination extends Component {// eslint-disable-line react/prefer-stateless-function
  render() {
    const { firstPageIsZero, page, pageSize, onPageSizeChange, pages, onPageChange, totalItemsCount } = this.props;
    const pagingOptions = [
      {
        label: '5/page',
        value: 5,
      },
      {
        label: '10/page',
        value: 10,
      },
      {
        label: '20/page',
        value: 20,
      },
      {
        label: '30/page',
        value: 30,
      },
      {
        label: '40/page',
        value: 40,
      },
      {
        label: '50/page',
        value: 50,
      },
      {
        label: '60/page',
        value: 60,
      },
      {
        label: '70/page',
        value: 70,
      },
      {
        label: '80/page',
        value: 80,
      },
      {
        label: '90/page',
        value: 90,
      },
      {
        label: '100/page',
        value: 100,
      },
    ];

    return (
      <StyledPagination>
        <div className="select-page">
          <DropdownList
            value={pagingOptions.find((i) => i.value === pageSize)}
            menuPlacement={'top'}
            options={pagingOptions}
            onChange={(option) => {
              onPageSizeChange(option.value);
            }}
          />
        </div>
        <div className="item-page">
          <ReactPaginate
            forcePage={page - (firstPageIsZero ? 0 : 1)}
            pageCount={pages || Math.ceil(totalItemsCount / pageSize)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            breakLabel={'...'}
            onPageChange={({ selected }) => {
              onPageChange(selected + (firstPageIsZero ? 0 : 1));
            }}
            activeClassName={'active'}
            previousLabel={<Icon icon="chevron-left" />}
            nextLabel={<Icon icon="chevron-right" />}
          />
        </div>
      </StyledPagination>
    );
  }
}

CommonPagination.defaultProps = {
  firstPageIsZero: true,
};

export default CommonPagination;

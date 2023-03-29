import styled from 'styled-components';
import iconDropdown from 'images/icons/drop-down-arrow.svg';

export default styled.div`
  flex-grow: 1;
  border-left: 1px solid #d8d8d8;
  z-index: 8;
  
  .bp3-form-group {
    margin-bottom: 0;
  }
  
  .bp3-label {
    font-size: 12px;
    color: black;
    font-weight: 300;
    padding-left: 10px;
    margin-bottom: 2px !important;
    line-height: 1em;
  }

  .bp3-form-content > div {
    line-height: 1;
    
    & > div:first-of-type {      
      cursor:pointer;  
      background: none;
      border: none;
      box-shadow: none !important;
      min-height: unset;
      
      & > div:first-child {      
        height: 1em;
        line-height: 1em;
        padding: 0 8px;
      
        div:first-child {
          color: black;
          font-weight: 700;
        }
        
        div:not(:first-child) {
          margin: 0;
          padding: 0;
        }
      }
      
      & > div:last-child {
        & > span {
          display: none;
        }
        
        & > div {
          width: 10px;
          height: 10px;
          background-image: url(${iconDropdown});
          background-position: center center;
          background-size: cover;
          padding: 0;
          margin-right: 10px;
        
          & > svg{
            display: none;
          }
        }
      }
    }
  }
`;

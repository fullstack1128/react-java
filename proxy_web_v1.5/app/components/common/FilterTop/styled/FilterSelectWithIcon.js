import styled from 'styled-components';
import iconDropdown from 'images/icons/drop-down-arrow.svg';

export default styled.div`
  & > div {
    & > div:first-of-type {      
      cursor:pointer;  
      background: none;
      border: none;
      box-shadow: none !important;
      min-height: unset;
      
      & > div:first-child {      
        padding: 0;
      
        div:first-child {
          color: black;
          font-weight: 700;
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

import styled from 'styled-components';
import { focusControl } from '../../../../styles/commonCss';
import breakpoint from '../../../../styles/breakpoint';

export default styled.div`
  margin-right: 10px;
  background-color: white;
  box-shadow: inset -1px -1px 1px 0 rgba(0,0,0,0.1);
  position: relative;
  border-radius: 4px;
  
  .bp3-input {
    width: 320px;
    height: 46px;
    font-size: 14px;
    color: black;
    padding: 14px 40px 14px 20px !important;
    border-radius: 4px;
    box-shadow: inset -1px -1px 1px 0 rgba(0,0,0,0.1);

    &:focus {
      ${focusControl}
    }
  }
  
  .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    height: 14px;
    
    &:hover {
      cursor: text;
    }
  }
  
  @media (max-width: ${breakpoint.md}) {
    margin-bottom: 10px;      
    width: 100%;
    margin-right: 0;
    
    .bp3-input {
      width: 100%;
    }
  }
`;

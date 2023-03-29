import styled from 'styled-components';
import StyledMoreFunctionDiv from './StyledMoreFunctionDiv';
import breakpoint from 'styles/breakpoint';

export default styled(StyledMoreFunctionDiv)`
  justify-content: center !important;
  .confirm-buttons {
        margin: 35px auto 0;
        display: flex;
        flex-direction: column;
        width: 300px;
        position: relative;
      }
  @media (max-width: ${breakpoint.md}){
    & > div{
      height: 56px;
      display: inline-flex !important;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      margin: 0 !important;
    }
  }
  
`;

import styled from 'styled-components';
// import { Dialog } from '@blueprintjs/core/lib/esm/index';
import breakpoint from 'styles/breakpoint';
import ActionDialog from '../ActionDialog';

export default styled(ActionDialog)`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;  
  max-width: ${(props) => props.large ? '800px' : (props.small ? '480px' : '640px')};
  border-radius: 20px;
  box-shadow: 0.5px 1px 2px 0 rgba(0, 0, 0, 0.1);
  padding-bottom: 0;
  position: relative;

  .bp3-dialog {    
    &-header {
      background-color: #f4f4f4;
      box-shadow: none;
      padding: ${(props) => props.noPadding ? '0' : '40px 90px 30px'};
      position: relative;
    }
    
    &-close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      
      .bp3-icon {
        color: black;
      }
    }
    
    &-body {
      padding: ${(props) => props.noPadding ? '0' : '50px 90px 40px'};
      margin: 0;
      
      .close-btn {
        position: absolute;
        top: 4px;
        right: 10px;
        height: 24px;
        width: 24px;
        color: #000000;
        opacity: 0.8;

        @media (min-width: ${breakpoint.md}) {
          top: 0;
          right: unset;
          left: calc(100% + 20px);
          color: white; !important;
        }
      }
    }
    
    &-footer {
      display: none;
    }
  }

`;

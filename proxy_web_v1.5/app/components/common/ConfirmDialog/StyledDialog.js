import styled from 'styled-components';
import { Classes } from '@blueprintjs/core';

import ActionDialog from 'components/common/ActionDialog';

export default styled(ActionDialog)`
  background-color: white;
  
  .${Classes.DIALOG_HEADER} {
    text-align: center;
    padding: 19px 20px 17px;
    font-size: ${(props) => props.theme.fontSizes.big20};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
  }
  
  .${Classes.DIALOG_BODY} {
    text-align: center;
    padding: 20px 20px 30px;
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-weight: ${(props) => props.theme.fontWeights.strong300};
    line-height: 1.5;
    opacity: 0.8;
  }
  
  /* .${Classes.DIALOG_FOOTER} {
    display: flex;
    justify-content: center;
    
    button:first-child {
      box-shadow: none;
      color: ${(props) => props.theme.colors.primary};
      font-weight: ${(props) => props.theme.fontWeights.strong};
    }
  } */
`;

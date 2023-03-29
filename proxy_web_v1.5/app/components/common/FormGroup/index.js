import styled from 'styled-components';
import { focusControl } from '../../../styles/commonCss';

const FormGroup = styled.div`
  margin-bottom: 10px;
  
  .bp3-input {
    min-height: 40px;
    font-size: ${(props) => props.theme.fontSizes.small} !important;    
    border-radius: 6px;
    box-shadow: none;
    border: solid 0.5px #d8d8d8;
    color: #000000;

    &:focus {
      ${focusControl}
    }
  }
`;

export default FormGroup;

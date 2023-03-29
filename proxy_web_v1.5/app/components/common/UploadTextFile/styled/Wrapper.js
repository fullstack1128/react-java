import styled from 'styled-components';
import FormGroup from '../../FormGroup';


export default styled(FormGroup)`
  border: none !important;
  width: 100%;
  height: auto;
  position: relative;
  
  .label {
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    color: ${(props) => props.theme.colors.black900};
    margin-bottom: 5px;
    min-height: 24px;
  }
  
  .list-file {
    border-radius: 6px;
    border: solid 0.5px #d8d8d8;
    background-color: #ffffff;
    &.no-data {
      border: none;
    }
  }
  
  .btn-upload {
    font-size: ${(props) => props.theme.fontSizes.small};    
    font-weight: 300;
    color: #4a90e2;
    text-align: center;
    line-height: 1;
    padding: 10px 0;

    >img {
      width: 18px;
      height: 18px;
    }
    
    &.no-data {
      border-radius: 6px;
      border: solid 0.5px rgb(216, 216, 216);
      background-color: rgb(255, 255, 255);
    }    
  }
`;

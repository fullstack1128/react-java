import styled from 'styled-components';
import FormGroup from '../FormGroup';

const StyledContainer = styled(FormGroup)`
  .select-dropdown {  
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.strong300};
    
    .dropdown-list__control {
      border: solid 0.5px #d8d8d8;
      border-radius: 6px;
      height: 40px;
      
      .dropdown-list__indicator {
        padding: 8px 20px;
      }
    }
  }

  .dropdown-list__single-value{
    color: black;
    opacity: 1;
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: 400;
   }

  .errors {
    color: ${(props) => props.theme.colors.redError};
    list-style-type: none;
    padding: 0;
    font-size: ${(props) => props.theme.fontSizes.small};
  }

  .btn-group {
    width: 100%;
  }

  .dropdown-toggle {
    &::after {
      position: absolute;
      right: 0;
      top: 42%;
      margin-right: 12px;
    }
  }

  .dropdown-menu {
    right: 0;
  }

  // .dropdown-list__value-container{
  //   padding-left: 20px;
  // }

  .dropdown-list__menu {
    z-index: 10;
  }

  .dropdown-list__control--is-disabled {
    /* background-color: ${(props) => props.theme.colors.green200};  */
    border: solid 1px ${(props) => props.theme.colors.gray300} !important;
    box-shadow: none;

    .dropdown-list__single-value {
      color: #000000;
    }
    .dropdown-list__indicators {
      display: none;
    }
  }

  // CSS Modules
  .menu {
     animation: fade--in .2s ease-in-out;
  }

  @keyframes fade--in {
    0% {
        opacity: 0;
        transform: translateY(-2rem);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
  }

  .select-container.disabled {
    cursor: not-allowed;
  }
`;

export default StyledContainer;

import styled from 'styled-components';
import breakpoint from '../../../styles/breakpoint';


export default styled.div`
  margin: 60px;
  
  .form {
    &__content {
      max-width: 500px;
      margin: 0 auto;
      
      & > .row {
        margin-bottom: 20px;
        padding: 0 50px;
      }
      
      form {
        background-color: ${(props) => props.theme.colors.white};
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1);
        padding: 30px 50px 40px;
        border-radius: 4px;
      }
    }
    
    &__title {
      font-size: 20px;
      font-weight: bold;
      color: black;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    
    &__subtitle {
      font-size: ${((props) => props.theme.fontSizes.small)};
      color: #000000;
      opacity: 0.8;
      font-weight: ${((props) => props.theme.fontWeights.strong300)};
    }
    
    &__icon {
      text-align: center;
      
      img {
        width: 100%;
      }
    }
    
    &__link {
      margin-top: 20px;
      font-size: ${(props) => props.theme.fontSizes.small};
    }
  }
    
  .tos-container {
    border-top: 1px solid ${(props) => props.theme.colors.gray300};
    margin-top: 10px;
    padding-top: 15px;
    font-size: ${(props) => props.theme.fontSizes.small} !important;

    .tos {
      a {
        color: ${(props) => props.theme.colors.blue300};
      }
    }
  }
  
  @media (max-width: ${breakpoint.md}) {    
    margin: 20px 0;
    
    .form {
      &__content {
        form {
        padding: 30px 20px 40px;
        }
      }
    }
  }
`;

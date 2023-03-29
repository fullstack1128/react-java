import styled from 'styled-components';
import breakpoint from '../../styles/breakpoint';
import Container from 'reactstrap/es/Container';
import background from 'images/background.png';
import { darken } from 'polished';

export const StyledAuthForm = styled.div`
  .title-header {
    text-align: center;
    margin-bottom: 25px;

    .form-icon {
      height: 80px;

      img {
        height: 100%;
      }
    }

    .message {
      max-width: 260px;
      display: inline-block;
      margin-top: 25px;
      font-size: ${(props) => props.theme.fontSizes.small};
      font-weight: 500;
      opacity: 0.8;
    }
  }

  .register-wrapper {
    margin-top: 35px;
    margin-bottom: 10px;
    text-align: center;

    &.login {
      margin-top: 20px;
      .skip-step {
        font-size: ${(props) => props.theme.fontSizes.small};
        width: 100%;
        transition: 0.15s;
        font-weight: 300;
        border-radius: 30.5px;
        box-shadow: none !important;
        height: 50px;
        border: 1px solid #11988d;
        background: transparent;
        color: #11988d;
      }
      .divider {
        margin: 20px auto;
        position: relative;
        hr {
          margin: 0;
          border-top: 1px solid #979797;
        }
        .divider-context {
          background: white;
          padding: 0 15px;
          position: absolute;
          top: 0;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`;

const StyledContainer = styled.div`
  flex-grow: 1;
  padding-top: 30px;
  padding-bottom: 10px;

  .step-controls {
    margin: 50px auto 0;
    display: flex;
    flex-direction: column;
    position: relative;

    @media (min-width: ${breakpoint.md}) {
      width: 300px;
    }
  }

  .form-wrapper {
    padding: 30px;
    background-image: url(${background});
    background-position: center top;
    background-size: 100%;
    background-color: white;
    background-repeat: no-repeat;

    @media (min-width: ${breakpoint.md}) {
      padding: 30px 50px;
    }

    .row {
      margin-left: -10px;
      margin-right: -10px;

      div[class*=col-] {
        padding: 0 10px;
      }
    }

    div[class*=form-] {
      margin-left: auto;
      margin-right: auto;
    }

    .form-1-col {
      @media (min-width: ${breakpoint.sm}) {
        width: 300px;
      }
    }

    .form-2-col {
      padding-top: 40px;

      @media (min-width: ${breakpoint.lg}) {
        width: 610px;
      }
    }
  }
`;

export default StyledContainer;

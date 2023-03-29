import React, { Fragment } from 'react';
import { Button as ButtonBluePrint } from '@blueprintjs/core';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { backgroundColorButton } from '../../../styles/commonCss';
import * as PropTypes from 'prop-types';

const StyledError = styled.div`
  color: ${(props) => props.theme.colors.redError};
  font-size: ${(props) => props.theme.fontSizes.small12};
  position: absolute;
  left: 0;
  top: -20px;
`;


const StyledContainer = styled(ButtonBluePrint)`
  &.min-width-100 {
    min-width: 100px;
  }

  &.min-width-200 {
    min-width: 200px;
  }

  &.min-width-300 {
    min-width: 300px;
  }

  &.min-width-400 {
    min-width: 400px;
  }

  &.margin-button-15{
    margin: 0 15px;
  }

  &.bp3-button {
    transition: 0.15s; 
    font-weight: 300;
    border-radius: 10.5px;  
    box-shadow: none !important;
    text-transform: uppercase;

    ${
      (props) => props.small ?
      `font-size: ${(props) => props.theme.fontSizes.small};
      padding: 8px 16px;
      height: auto;` :
      `font-size: ${(props) => props.theme.fontSizes.small};
      padding: 10px 25px;
      height: 50px;`
    }
    
    border: 1px solid #d8d8d8;    
    color: ${(props) => props.theme.colors.black900};
    background-image: none;
    ${(props) => backgroundColorButton(props.theme.colors.gray20)}
    
    ${(props) => props.additionalCss}

    &.bp3-disabled {
      &:hover {
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        background-color: rgba(206, 217, 224, 0.5);
        background-image: none;
        cursor: not-allowed;
        color: rgba(92, 112, 128, 0.5);
      }
    }
  }
`;

class Button extends React.Component {
  render() {
    const { children, text, isInValid, errMessage, intl, ...rest } = this.props;

    let additionalCss = css``;

    if (rest.primary) {
      additionalCss = css`
        background-image: linear-gradient(100deg, #618fb6, #1b385f);
        color: #ffffff;
        border: none;
        &:active {
          background-color: transparent;
          background-image: linear-gradient(100deg, #465bb6, #16335f);
        }
      `;
    }

    if (rest.redWarning) {
      additionalCss = css`
        color: #ffffff;
        ${(props) => backgroundColorButton(props.theme.colors.redWarning)};
        border: none;
      `;
    }

    if (rest.blue) {
      additionalCss = css`
        color: ${(props) => props.theme.colors.activeBorder};
        ${(props) => backgroundColorButton(props.theme.colors.white)};
        border: none;
      `;
    }

    return (
      <Fragment>
        {isInValid && (<StyledError>
          <i className="far fa-exclamation-circle" /> {errMessage || intl.formatMessage(messages.submitError)}
        </StyledError>)}
        <StyledContainer
          {...rest}
          additionalCss={additionalCss}
        >
          {children || text}
        </StyledContainer>
      </Fragment>
    );
  }
}

Button.propTypes = {
  primary: PropTypes.bool,
  blue: PropTypes.bool,
  redWarning: PropTypes.bool,
};

export default injectIntl(Button);

import { css } from 'styled-components';
import { darken } from 'polished';

export const imageCenterAlign = css`
  text-align: center;
  position: relative;
  padding-top: 64.29%;
  
  img, .bp3-spinner {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
`;


export const focusControl = css`    
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue500}; // ${(props) => props.theme.colors.blue500}, 0 0 0 2px ${(props) => props.theme.colors.blue200}, inset 0 1px 1px ${(props) => props.theme.colors.blue300};
`;


export function backgroundColorButton(backgroundColor) {
  return css`
    background-color: ${backgroundColor};
    
    &:hover {
      background-color: ${darken(0.05, backgroundColor)};
    }
    
    &:active {
      background-color: ${darken(0.1, backgroundColor)};
    }
  `;
}

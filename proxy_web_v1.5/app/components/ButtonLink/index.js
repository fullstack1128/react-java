/**
 *
 * ButtonLink
 *
 */

import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import * as PropTypes from 'prop-types';
import breakpoint from 'styles/breakpoint';

const StyledButton = styled(Button)`  

  &.bp3-button {
    height: 50px;
    opacity: .8;
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.strong300};
    color: ${(props) => props.theme.colors.activeBorder};
    box-shadow: none !important;
    background: none !important;
    text-transform: unset;
    border: none;
    &:hover {
      text-decoration: underline ${(props) => props.theme.colors.activeBorder};
    }

    @media (min-width: ${breakpoint.md}) {
      width: 300px;
    }
  }

  &.cancel-button{
  color: ${(props) => props.theme.colors.activeBorder} !important;
   &:hover {
      text-decoration: underline ${(props) => props.theme.colors.activeBorder} !important;
    }
  }
`;

class ButtonLink extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <StyledButton
        {...this.props}
      />
    );
  }
}

ButtonLink.propTypes = {
  textDecoration: PropTypes.bool,
};

export default ButtonLink;

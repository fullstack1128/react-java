/**
*
* Card
*
*/

import React from 'react';
import styled from 'styled-components';
import { Card as BP3Card } from '@blueprintjs/core';
import * as PropTypes from 'prop-types';

const StyledComponent = styled(BP3Card)`
  background-color: white;
  // border-radius: 20px;
  box-shadow: 0.5px 1px 2px 0 rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.noPadding ? '0' : '10px 20px'};
  overflow: hidden;
`;

const Card = (props) => {
  const { children, noPadding, ...rest } = props;

  return (
    <StyledComponent
      noPadding={noPadding}
      className="app-card"
      {...rest}
    >
      {children}
    </StyledComponent>
  );
};

Card.propTypes = {
  noPadding: PropTypes.bool,
};

export default Card;

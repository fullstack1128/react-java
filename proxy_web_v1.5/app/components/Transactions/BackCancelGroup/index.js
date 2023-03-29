import React from 'react';
import styled from 'styled-components';

import BackButton from 'components/Transactions/BackButton';
import CancelButton from 'components/Transactions/CancelButton';
import breakpoint from '../../../styles/breakpoint';

const StyledContainer = styled.div`
  display: flex;
  
  @media (max-width: ${breakpoint.md}) {
    flex-direction: column;
  }
`;

const BackCancelGroup = ({ handleBack }) => (
  <StyledContainer>
    <BackButton handleBack={handleBack} />
    <CancelButton />
  </StyledContainer>
);

export default BackCancelGroup;

import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;  
  font-size: 24px;
  font-weight: 300;
  color: #000000;
  opacity: 0.8;
`;

const HeaderForm = ({ title, className = '' }) => (
  <StyledContainer className={`header-form ${className}`}>
    {title}
  </StyledContainer>
);

export default HeaderForm;

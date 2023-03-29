import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(100deg, #11988d, #173c44);
  height: 25px;
  max-width: 80px;
  width: 80px;
  margin-top: 5px;
  color: #ffffff;
  border: none;
  &:active {
    background-color: transparent;
    background-image: linear-gradient(100deg, #11988d, #173c44);
  }
  border-radius: 30.5px;  
  font-size: ${(props) => props.theme.fontSizes.small12};
  box-shadow: none !important;
  float: right;
`;

const SmallButton = ({ text, handleClick = () => {} }) => (
  <StyledWrapper onClick={handleClick}>
    { text }
  </StyledWrapper>
);

export default SmallButton;


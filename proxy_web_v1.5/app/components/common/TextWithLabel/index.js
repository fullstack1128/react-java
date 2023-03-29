import React from 'react';
import styled from 'styled-components';

const StyledTextWithLabel = styled.div`
  min-height: 60px;
  padding: 10px 5px 10px 15px;

  .label {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSizes.small12};
    text-transform: uppercase;
    opacity: 0.3;
  }

  .text {
    color: ${(props) => props.contentColor};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
    font-size: ${(props) => props.theme.fontSizes.normal};
  }
`;

const TextWithLabel = ({ label, text, contentColor, className }) => (
  <StyledTextWithLabel contentColor={contentColor} className={className}>
    <div className="label">{label}</div>
    <div className="text">{text}</div>
  </StyledTextWithLabel>
);

export default TextWithLabel;

import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-bottom: 5px;
  
  .title {
    opacity: 0.8;
    font-size: 14px;
    font-weight: 300; 
    letter-spacing: 0.1px;
  }
  
  .content {
    font-weight: 500;
    a {
      color: #4a90e2;
    }
  }
`;

const TextLine = (props) => {
  const { title, content, isEmail } = props;
  return (
    <StyledContainer className={props.className}>
      <span className="title">{title}: &nbsp;</span>
      <span className="content">{isEmail ? <a>{content}</a> : content}</span>
    </StyledContainer>
  );
};

export default TextLine;

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
  
  hr {
    margin-top: 5px;
  }
`;

const TextTitle = (props) => {
  const { title } = props;
  return (
    <StyledContainer>
      <div className="title">{title}</div>
      <hr />
    </StyledContainer>
  );
};

export default TextTitle;

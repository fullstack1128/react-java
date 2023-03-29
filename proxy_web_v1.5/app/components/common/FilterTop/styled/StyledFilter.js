import styled from 'styled-components';

export default styled.div`
  border-bottom: 1px solid #d8d8d8;
  height: 34px;
  position: relative;
  
  button {
    cursor: pointer;
    border-radius: 3px;
  
    &:focus {
      outline: none;
    }
    
    &:hover {
      background-color: rgba(0,0,0,0.05);
    }
  }

  .title-filter {
    font-size: 14px;
    color: black;
    font-weight: 400;
    position: relative;
    z-index: 10;
  }
`;

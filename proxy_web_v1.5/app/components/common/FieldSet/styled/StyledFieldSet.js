import styled, { css } from 'styled-components';

const btnStyle = () => css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #006F38;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border: solid 1px #efeaea;
`;

export default styled.div`
  .legend {
    padding: 15px 0 15px;
    
    .btn {
      border-radius: 6px;
      padding: 12px 20px;
      ${btnStyle};
      
      &:focus, &:active, &:active:focus {
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        ${btnStyle};
      }
      
      i {
        font-size: 14px;
        font-weight: 300;
      }
    }
  }
`;

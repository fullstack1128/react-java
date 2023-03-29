import React from 'react';
import styled from 'styled-components';
import checkIcon from 'images/input/check.svg';

const StyledContainer = styled.div`
  .custom-radio {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    cursor: pointer;
    border-radius: 10px;
    position: relative;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    line-height: 1;

    &:checked {
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-color: ${(props) => props.theme.colors.white};

      &::before {
        content: "";
        background-color: #16998f;
        width: 9px;
        height: 9px;
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 10px;
      }
    }
    &:focus {
      outline: none;
    }
  }
`;

const RadioPackage = (props) => {
  const { isSelected, value, toggleSelection, full } = props;
  const checked = isSelected(value);
  return (
    <StyledContainer>
      <input
        type="radio"
        className="custom-radio"
        checked={checked}
        onChange={() => toggleSelection(value, full)}
      />
    </StyledContainer>
  );
};

export default RadioPackage;

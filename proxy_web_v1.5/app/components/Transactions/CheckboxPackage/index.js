import React from 'react';
import styled from 'styled-components';

import checkIcon from 'images/input/check.svg';

const StyledContainer = styled.div`
  .custom-checkbox {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    border: 1px solid ${(props) => props.theme.colors.gray300};

    &:checked {
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-color: ${(props) => props.theme.colors.green1000};

      &::before {
        content: "";
        -webkit-mask-image: url(${checkIcon});
        mask-image: url(${checkIcon});
        background-color: ${(props) => props.theme.colors.white};
        width: 100%;
        height: 100%;
        position: absolute;
        top: -3px;
        left: -2px;
      }
    }
    &:focus {
      outline: none;
    }
  }
`;

const CheckboxPackage = (props) => {
  const { isSelected, value, toggleSelection } = props;
  const checked = isSelected(value);
  return (
    <StyledContainer>
      <input
        type="checkbox"
        className="custom-checkbox"
        checked={checked}
        onChange={() => toggleSelection(value, checked)}
      />
    </StyledContainer>
  );
};

export default CheckboxPackage;

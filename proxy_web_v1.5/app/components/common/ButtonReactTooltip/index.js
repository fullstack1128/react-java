import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import Button from 'components/common/Button';
import searchIcon from 'images/packages/search-icon@3x.png';

const ButtonReactTooltip = (props) => {
  const {
    tooltipMessage,
    handleOpenPopup,
  } = props;
  return (
    <StyledContainer>
      <Button
        data-tip
        data-for="search-button"
        className="search-button"
        icon={<img src={searchIcon} alt={'find'} width={13} height={13} />}
        onClick={handleOpenPopup}
      />
      <ReactTooltip
        place="bottom"
        id="search-button"
        type="light"
        effect="solid"
        className="custom-tooltip"
      >
        <span>{tooltipMessage}</span>
      </ReactTooltip>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  .search-button {
    padding: 0 10px;
    margin-left: 30px;
    min-width: 31px;
    min-height: 28px;
    border: none;
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.colors.green500}, inset 0 -1px 0 ${(props) => props.theme.colors.green500};

    &:hover {
      box-shadow: inset 0 0 0 1px ${(props) => props.theme.colors.green500}, inset 0 -1px 0 ${(props) => props.theme.colors.green500};
    }
  }

  .custom-tooltip {
    font-size: ${(props) => props.theme.fontSizes.small10};
    padding: 10px 10px 10px 15px;
    background-color: white;
    color: black;
    box-shadow: 3px 3px 5px 1px ${(props) => props.theme.colors.gray500};

    &.show {
      opacity: 1;
    }
  }
`;

export default ButtonReactTooltip;

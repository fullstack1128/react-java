import React from 'react';
import styled from 'styled-components';
import { Icon } from '@blueprintjs/core';

import { isEven } from 'utils/numberHelper';

const StyledContainer = styled.div`
  margin-left: 10px;

  .bank-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    max-width: 180px;
    min-width: 180px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    cursor: pointer;

    &:hover {
      background-color: rgba(0,0,0,0.05);
    }

    .bank-logo {
      align-self: stretch;
      height: 180px;
      overflow: hidden;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray300};

      img {
        width: 100%;
        min-height: 100%;
      }
    }

    .section {
      align-self: stretch;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        margin: 0;
        padding-left: 15px;
      }

      .title {
        color: ${(props) => props.theme.colors.black};
        opacity: 0.7;
        font-size: ${(props) => props.theme.fontSizes.small12};
        font-weight: ${(props) => props.theme.fontWeights.small};

        &::first-letter {
          text-transform: uppercase;
        }
      }

      .content {
        color: ${(props) => props.theme.colors.black};
        font-size: ${(props) => props.theme.fontSizes.small};
        font-weight: ${(props) => props.theme.fontWeights.strong500};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:first-letter {
          text-transform: uppercase;
        }
      }

      &.stripped {
        background-color: ${(props) => props.theme.colors.backgroundGray};
      }
    }

  }

  .section-active {
    display: block;
    position: relative;
    height: 60px;
    background-color: ${(props) => props.theme.colors.green300};
    margin-bottom: 62px;

    span {
      top: 25%;
      position: absolute;
      left: 43%;
    }
  }
`;

class BankPackage extends React.Component {
  handleClick = (event) => {
    const { onSelect, id } = this.props;
    event.preventDefault();
    onSelect(id);
  }

  render() {
    const {
      id,
      logo,
      packageDetailsList,
      currentId,
      onClick,
    } = this.props;

    return (
      <StyledContainer onClick={onClick} data-id={id} key={id}>
        <div className="bank-container">
          <div className="bank-logo">
            <img src={logo} alt="bank name" />
          </div>
          {packageDetailsList.map((packageDetails, index) => (
            <div className={`section ${isEven(index) ? 'stripped' : ''}`} key={`${id} ${index}`}>
              <p className="title">{packageDetails.title}</p>
              <p className="content">{packageDetails.value}</p>
            </div>
          ))}
        </div>
        {currentId === id && (
          <div className="section-active">
            <Icon icon="tick" iconSize="28" />
          </div>
        )}
      </StyledContainer>
    );
  }
}

export default BankPackage;

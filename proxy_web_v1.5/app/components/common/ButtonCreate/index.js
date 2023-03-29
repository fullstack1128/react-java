import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { Classes, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import addIcon from '../../../images/packages/clear@3x.png';
import * as PropTypes from 'prop-types';
import { forwardTo } from '../../../utils/history';


const StyledComponent = styled.div`
  .btn-create {
    background-color: #41B652;
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.15s;
    position: relative;
    animation: myanimation 3s infinite;
    
    @keyframes myanimation {
      0% {background-color: red;}
      25%{background-color:yellow;}
      50%{background-color:green;}
      75%{background-color:brown;}
      100% {background-color: red;}
    }

    &:before,
    &:after {
      content: '';
      display: block;
      width: 50%;
      height: 2px;
      background: #ffffff;
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 25%;
      margin-top: 50%;
    }

    &:before {
      transform: translateY(-50%);
    }

    &:after {
      transform: translateY(-50%) rotate(90deg);
    }

    &:hover {
      background-position-y: 100%;
    }
    
    img {
      margin-right: 10px;
    }
    
    span {
      font-size: ${(props) => props.theme.fontSizes.small12};
      font-weight: ${(props) => props.theme.fontWeights.strong500};
      color: ${(props) => props.theme.colors.black};
      line-height: 1;
    }
  }
`;

const DropdownButtons = styled.ul`
  list-style-type: none;
  margin-bottom: 0;
  padding: 0;
  text-align: left;

  li {
    padding: 0 10px;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
      background-color: ${(props) => props.theme.colors.gray60} !important;
    }

    a {
      text-decoration: none;
      color: red;
      font-weight: ${(props) => props.theme.fontWeights.strong300};
      font-size: ${(props) => props.theme.fontSizes.small};
      line-height: 50px;
      width: 100%;
    }

    .image {
      margin-right: 10px;
    }
    
    &:nth-child(odd) {
      background-color: ${(props) => props.theme.colors.gray10};
    }
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class ButtonCreate extends React.Component {
  render() {
    const { onClick, options } = this.props;

    const buttonCreate = (
      <a
        tabIndex={0}
        role={'button'}
        className="btn-create"
        onClick={onClick || ((e) => e.preventDefault())}
      ></a>
    );

    if (isEmpty(options)) {
      return (
        <StyledComponent>
          {buttonCreate}
        </StyledComponent>
      );
    }

    const content = (
      <DropdownButtons>
        {options.map((option, idx) => (
          <li
            key={`btnCreate-${idx}`}
          >
            <a
              className="link"
              onClick={option.onClick || (() => forwardTo(option.to))}
              role={'button'}
              tabIndex={-1}
            >
              <img
                className="image"
                src={addIcon}
                width="14"
                height="14"
                alt="add"
              />
              {option.text}
            </a>
          </li>
        ))}
      </DropdownButtons>
    );

    return (
      <StyledComponent>
        <Popover
          minimal
          content={content}
          interactionKind={PopoverInteractionKind.HOVER}
          position={Position.BOTTOM_RIGHT}
          popoverClassName={Classes.POPOVER_DISMISS}
        >
          {buttonCreate}
        </Popover>
      </StyledComponent>
    );
  }
}


ButtonCreate.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      text: PropTypes.string,
      to: PropTypes.string,
    })
  ),
};

export default ButtonCreate;


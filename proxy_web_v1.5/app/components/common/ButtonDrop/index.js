import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { Classes, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import addIcon from '../../../images/packages/clear@3x.png';
import * as PropTypes from 'prop-types';
import { forwardTo } from '../../../utils/history';


const StyledComponent = styled.div`
  .btn-action-group {
    
    color: #ffffff;
    display: block;
    text-align: center;
    padding: 5px 10px;
    border-radius: 10.5px; 
    font-weight: 300;
    transition: 0.15s;
    position: relative;
    background-image: linear-gradient(100deg, #618fb6, #1b385f);
    border: none;
    &:active {
      background-color: transparent;
      background-image: linear-gradient(100deg, #465bb6, #16335f);
    }
  }
`;

const DropdownButtons = styled.ul`
  list-style-type: none;
  margin-bottom: 0;
  padding: 0;
  text-align: left;
  min-width: ${(props) => props.minWidth ? `${props.minWidth}px` : 'auto'};

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
      color: ${(props) => props.theme.colors.black};
      font-weight: 300;
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
class ButtonDrop extends React.Component {
  render() {
    const { text, onClick, actions, dropdownOptions } = this.props;

    const buttonActionGroup = (
      <a
        tabIndex={0}
        role={'button'}
        className="btn-action-group"
        onClick={onClick || ((e) => e.preventDefault())}
      >{text}</a>
    );

    if (isEmpty(actions)) {
      return (
        <StyledComponent>
          {buttonActionGroup}
        </StyledComponent>
      );
    }

    const content = (
      <DropdownButtons {...dropdownOptions}>
        {actions.map((option, idx) => (
          <li
            key={`btnCreate-${idx}`}
          >
            <a
              className="link"
              onClick={option.onClick || (() => forwardTo(option.to))}
              role={'button'}
              tabIndex={-1}
            >
              {/* {*/}
              {/*  option.icon &&*/}
              {/*  (<img*/}
              {/*    className="image"*/}
              {/*    src={option.icon}*/}
              {/*    width="14"*/}
              {/*    height="14"*/}
              {/*    alt="add"*/}
              {/*  />)*/}
              {/* }*/}
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
          position={Position.RIGHT_TOP}
          popoverClassName={Classes.POPOVER_DISMISS}
        >
          {buttonActionGroup}
        </Popover>
      </StyledComponent>
    );
  }
}


ButtonDrop.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      text: PropTypes.string,
      to: PropTypes.string,
    })
  ),
};

export default ButtonDrop;


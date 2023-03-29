import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import breakpoint from 'styles/breakpoint';

export default styled(NavLink)`
  font-size: 14px;
  color: #ffffff !important;
  transition: 0.3s;
  display: flex;
  align-items: center;
  padding: 18px 20px;
  // opacity: 0.3;
  position: relative;
  margin-bottom: 5px;
  height: 50px;    
  font-weight: 500;
  
  &:after {
    content: '';
    width: 4px;
    height: 100%;
    background-color: #ffffff;
    position: absolute;
    left: 0;
    opacity: 0;
    transition: 0.3s;
  }
    &:hover{
    // opacity: 1;
    background-color: #81a0bd;
    }
    &.active {
    text-decoration: none;
    opacity: 1;
    background-color: #81a2bd;
    
    &:after {
      opacity: 1;
    }

    font-weight: 500;
  }
  
  img {
    filter: grayscale(100%) invert(100%) brightness(200%);
  }
  
  .label {
    margin-top: 3px;
  }
  
  @media (min-width: ${breakpoint.md}){
    &.is-collapse {
      .label {
        display: none;
      }
    }
  }
  .custom-tooltip {
    font-size: ${(props) => props.theme.fontSizes.small10};
    padding: 7px 7px 7px 7px;
    background-color: white !important;
    opacity: 1;
    box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.1);
  }
  .__react_component_tooltip.type-light.place-right {
    &:after {
    border-right-color: white !important;
    }
  }
  

`;

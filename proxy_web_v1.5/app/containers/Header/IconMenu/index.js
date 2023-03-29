import React from 'react';
import styled from 'styled-components';
import breakpoint from '../../../styles/breakpoint';


const StyledComponent = styled.div`
  margin-left: auto;
  
  @media (max-width: ${breakpoint.md}) {
    order: 2;
  }
 
`;


class IconMenu extends React.Component {
  render() {
    return (
      <StyledComponent></StyledComponent>
    );
  }
}

export default IconMenu;

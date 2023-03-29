import React from 'react';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledComponent = styled.div`
`;

class Logo extends React.Component {
  render() {
    return (
      <StyledComponent {...this.props}>
        <Link to="/">
          <img
            src={logo}
            alt={'logo'}
            height={50}
            width={50}
          />
        </Link>
      </StyledComponent>
    );
  }
}

export default Logo;

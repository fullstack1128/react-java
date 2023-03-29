import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

export default styled.h6`
  color: white;

  @media (max-width:${breakpoint.md}){
    margin: 25px 0 25px;
  }
`;

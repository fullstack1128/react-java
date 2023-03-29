import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export default styled(Link)`
  color: ${(props) => props.theme.colors.activeBorder};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 300;
  
  &:hover {
    color: ${(props) => darken(0.05, props.theme.colors.activeBorder)};
    text-decoration: underline ${(props) => darken(0.05, props.theme.colors.activeBorder)};
  }
  
  &:active {
    color: ${(props) => darken(0.1, props.theme.colors.activeBorder)};
    text-decoration: underline ${(props) => darken(0.1, props.theme.colors.activeBorder)};
  }
`;

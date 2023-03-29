import styled from 'styled-components';
import { Link } from 'react-router-dom';
import breakpoint from '../../../styles/breakpoint';

export const FooterLink = styled(Link)`
  color: ${(props) => props.theme.colors.white} !important;
  letter-spacing: 1px;

  &:hover {
    text-shadow: 0.5px 0 0 white, -0.5px 0 0 white;
  }
`;

export const FooterLinkMinimal = styled(Link)`
  font-size: 12px;
  font-weight: 300;
  color: #313131;
  
  &:not(:last-child) {
    margin-right: 40px;
  }
`;

import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

const StyledSignInUpGroup = styled.div`
  display: flex;
  
  .login, .register {
    padding: 7.5px 15px;
    font-size:${(props) => props.theme.fontSizes.small};
    transition:0.15s;
    box-shadow: none;
  }
  
  .register{
    background: no-repeat;
    font-weight:500;
    color: ${(props) => props.fixedToTop ? props.theme.colors.black : props.theme.colors.white};
    
    &:hover {
      background:none!important;
      box-shadow:none!important;
      text-decoration:underline;
    }
  }
  
  .login {
    border-right: 0;
    height: unset;
  }
  
  @media (max-width: ${breakpoint.md}) {
    .login {
      padding: 5px 10px;
      min-height: unset;
    }
    
    @media (min-width: ${breakpoint.md}) {
      .login {        
        min-height: unset;
      }
  }
`;

export default StyledSignInUpGroup;

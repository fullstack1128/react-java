import styled from 'styled-components';
import Button from 'components/common/Button';
import breakpoint from '../../../../styles/breakpoint';

export default styled(Button)`
  &.bp3-button {
    font-weight: ${(props) => props.theme.fontWeights.strong500};
    font-size: 14px;
    text-align: center;

  }
  
  @media (max-width: ${breakpoint.md}) {
    &.bp3-button {
      font-size: 12px;
    }
  }
  
`;

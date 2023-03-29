import styled from 'styled-components';
import breakpoint from '../../../styles/breakpoint'


export default styled.div`
  transform: translateY(20px);
  padding: 0 15px;
  
  .title {
    //text-align: right;
    word-break: break-word;
    margin-right: 10px;
  }

  .step {
    font-weight: ${(props) => props.theme.fontWeights.strong};
  }
  
  @media (min-width: ${breakpoint.md}) {
    display: none;
  }
`;

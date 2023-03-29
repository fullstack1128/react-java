import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

const StyledFooter = styled.div`
  color: white;
  line-height: 1.8;
  font-weight: 300;
  text-align: ${(props) => props.textAlign ? props.textAlign : 'center'};
  @media (max-width:${breakpoint.sm}){
    text-align:center;
    margin:10px -15px 0;
    padding:5px 0px;
  }
  @media (max-width:${breakpoint.mb}){
    text-align:center;
    margin:10px -15px 0;
    padding:5px 0px;
  }
`;

export default StyledFooter;

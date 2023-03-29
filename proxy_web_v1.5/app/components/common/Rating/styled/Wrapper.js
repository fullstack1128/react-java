import styled from 'styled-components';


export default styled.div`
  & > span > span:not(:last-child) {
    margin-right: ${(props) => props.space}px;
  }
`;

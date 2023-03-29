import styled from 'styled-components';

const StyledFlexBox = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'column')};
  flex: ${(props) => (props.flex !== undefined ? props.flex : 1)};
  overflow: ${(props) => (props.scrollable ? 'scroll' : 'hidden')};
  padding: ${(props) => (props.contentPadded ? '13px' : '0')};
  ${(props) =>
    props.center &&
    `
    justify-content: center;
    align-items: center;
  `}
  ${(props) =>
    props.fullscreen &&
    `
      width: 100%;
      height: 100%;
    `}
`;

export default StyledFlexBox;

import styled from 'styled-components';


export default styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 350px;
  min-width: 350px;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;

  .group-button {
    margin: 20px;
  }

  .list {
    flex-grow: 1;
  }

  .ReactVirtualized__List {
    &:focus {
      outline-style: none;
    }
  }
`;

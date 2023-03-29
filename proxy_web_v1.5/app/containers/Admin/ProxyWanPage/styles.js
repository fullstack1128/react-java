import styled from 'styled-components';

export default styled.div`
  .content-container {
    margin-top: 20px;
    padding: 20px 5px;
    background-color: white;
    box-shadow: 2px 2px 5px 0 ${(props) => props.theme.colors.black10};
  }

  .filter-tabs-group {
    margin-bottom: 10px;
  }

  .filter-dropdown-group {
    padding: 0;
  }
`;

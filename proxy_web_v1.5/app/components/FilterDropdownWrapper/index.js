import styled from 'styled-components';

const StyledFilterDropdownGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  .dropdown-list {
    margin-right: 10px;
    background-color: white;
    border-radius: 4px;
    box-shadow: inset -1px -1px 1px 0 rgba(0,0,0,0.1);

    .label {
      margin-left: 18px;
      margin-top: 8px;
      margin-bottom: 0px;
      opacity: 0.8;
      font-size: 10px;
      font-weight: 400;
      line-height: 5px;
    }

    .react-select__value-container {
      background-color: transparent;
      height: 14px;
      min-height: 25px;
      margin-left: 8px;
      padding-left: 0px;
    }
    .react-select__single-value {
      margin-left: 8px;
      padding-left: 0px;
    }
    .react-select__control {
      background-color: transparent;
    }
  }

  .clear-filter-button {
    margin-left: 20px;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.small12};
    color: ${(props) => props.theme.colors.blue400};
    font-weight: ${(props) => props.theme.fontWeights.strong300};
    display: flex;
    align-items: center;
    padding-top: 10px;
  }
  
  .advance-search-button {
    margin-left: 20px;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.small12};
    color: ${(props) => props.theme.colors.black};
    font-weight: ${(props) => props.theme.fontWeights.strong300};
    display: flex;
    align-items: center;
    padding-top: 10px;
  }
`;

export default StyledFilterDropdownGroup;

import styled from 'styled-components';

export default styled.div`
  /* border-radius: 4px;
  border: solid 1px ${(props) => props.theme.colors.green300};
  display: inline-block;
  width: fit-content;
  overflow: hidden; */
  
  a {
    padding: 10px 20px;
    display: inline-block;
    line-height: 1;
    background-color: white;
    color: unset;
    font-size: 10px;
    height: 100%;
    
    span {
      font-weight: ${(props) => props.theme.fontWeights.strong500};
      opacity: 0.8;
    }
    
    &.active {
      background-image: linear-gradient(to bottom, ${(props) => props.theme.colors.green300}, ${(props) => props.theme.colors.green400});
      
      span {
        color: ${(props) => props.theme.colors.black};
      }
    }
    
    &:not(:last-child) {
      border-right: solid 1px ${(props) => props.theme.colors.green300};
    }
  }

  .bp3-tab {
    text-transform: capitalize;
    opacity: 0.5;
    transition: all .25s ease;
    outline: none;

    &[aria-selected="true"],
    &:hover {
      opacity: 1;
      color: #000000;
    }
  }

  .bp3-tab[aria-selected="true"] {
    border-radius: 0;
    box-shadow: inset 0 -3px 0 #417505 !important;
  }

  .bp3-tab-indicator{
	  background-image: linear-gradient(176deg,#11988d,#173c44);
    }
`;

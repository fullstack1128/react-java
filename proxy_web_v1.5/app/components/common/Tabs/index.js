import React from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from '@blueprintjs/core';


const Wrapper = styled(Tabs)`
  padding-top: 10px;
  .bp3-tab[aria-selected="true"], .bp3-tab:not([aria-disabled="true"]):hover {
    color: #41B652;
    font-weight: 700;
  }
  
  .bp3-tab-indicator-wrapper .bp3-tab-indicator {
    background-color: ${(props) => props.theme.colors.green500};
  }

  .bp3-tab{
    text-transform: capitalize;
    opacity: 0.5;
    transition: all .25s ease;
    outline: none;
    font-weight: 700;
    padding: 5px;
  }
  
  .bp3-tab[aria-selected="true"], .bp3-tab:hover {
    opacity: 1;
    color: #41B652;
  }
  
  .bp3-tab[aria-selected="true"] {
    border-radius: 0;
    box-shadow: inset 0 -3px 0 #417505!important;
  }
`;

const CommonTabs = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default CommonTabs;

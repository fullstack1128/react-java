import React from 'react';
import StyledScrollbar from './StyledScrollbar';


const Scrollbar = (props) => (
  <StyledScrollbar
    style={{ height: '100%', width: '100%' }}
    autoHide
    {...props}
  >
    {props.children}
  </StyledScrollbar>
);

export default Scrollbar;

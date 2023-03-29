import styled from 'styled-components';
import Scrollbar from 'react-custom-scrollbars';


export default styled(Scrollbar)`
  & > div:last-child {
    right: 7px !important;
  }
`;

import styled from 'styled-components';
import Dropzone from 'react-dropzone';

export default styled(Dropzone)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f4f4f4;
        
  img {
    height: 64px;
    width: 64px;
    object-fit: cover;
  }
`;

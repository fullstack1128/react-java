import styled from 'styled-components';
import cameraIcon from '../../../images/icons/camera.svg';

export default styled.div`
  position: relative;    
  overflow: hidden;
  
  border-radius: 50%;

  .bp3-form-content > div:first-child {
    padding: 0;
    
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
  }
  
  .bp3-form-group {
    margin-bottom: 0;
  }
  
  .preview {
    padding-top: 100% !important;
    
    img {
      object-fit: cover;
      
      height: ${(props) => props.height}px;
      width: ${(props) => props.width}px;
    }
  }
  
  .upload-avatar__overlay {
    position: absolute;
    top: 0;
    left: 0;
    
    height: 100%;
    width: 100%;
    
    background-image: url("${cameraIcon}");
    background-position: center center;
    background-size: ${(props) => props.width / 3}px ${(props) => props.height / 3}px;
    background-repeat: no-repeat;
    background-color: rgba(0,0,0,0.2);
    
    cursor: pointer;
  }
`;

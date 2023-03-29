import React from 'react';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { imageCenterAlign } from '../../../styles/commonCss';
import Image from 'react-shimmer';
import { Spinner } from '@blueprintjs/core';


const StyledComponent = styled.div`
  height: 104px;
  border-radius: 5px;
  border: 0px solid ${(props) => props.theme.colors.gray300};
  ${imageCenterAlign}
  width: 100%;
  
  .hint {
    height: 100%;
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.gray600};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  img{
        clip: rect(0px,auto,120px,0px);
  }

  
  .zoom {
    transition: transform .2s;
  }

  .zoom:hover {
    transform: scale(3.5);
    z-index: 1;
  }
`;

const UploadFilePreview = (props) => {
  const { file, hint } = props;

  return (
    <StyledComponent>
      {file ?
        // Use img because react-shimmer don't load base64
        <img src={file} alt={''} />
        :
        <span className="hint">{hint}</span>
      }
    </StyledComponent>
  );
};

export default UploadFilePreview;

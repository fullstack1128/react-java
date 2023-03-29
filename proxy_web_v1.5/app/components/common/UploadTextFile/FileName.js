import React, { Fragment } from 'react';
import RemoveFileButton from '../../RemoveFileButton';
import styled from 'styled-components';

const StyledComponent = styled.div`
  position: relative;  

  .file-name {
    margin-left: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;  
    opacity: 0.5;
    font-size: 12px;
    font-weight: 300;
    color: #000000;
    padding: 8px 20px 8px 0;
    line-height: 1;
    border-bottom: 0.5px solid #d8d8d8;
  }

  &.last {
    &:not(:last-child) {
      .file-name {
        margin-left: 0px;
        padding-left: 20px;
      }
    }

    &:last-child {
      .file-name {
        border-bottom: none;
      }
    }
  }
`;

const FileName = (props) => {
  const { fileName, href, handleRemove, readonly, isFirst, isLast, allowRemove } = props;

  return (
    <StyledComponent className={`${isFirst ? 'first' : ''} ${isLast ? 'last' : ''}`}>
      <a target="_blank" rel="noopener noreferrer" href={href} className="file-name">{fileName}</a>

      {!readonly && allowRemove && <RemoveFileButton
        top={2}
        right={10}
        handleRemove={handleRemove}
      />}
    </StyledComponent>
  );
};

export default FileName;

import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../Button';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';

const StyledComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background-color: #E8ECEF;
  margin: 1px;
  font-size: 12px;
  font-weight: 420;
  
  .title {    
    min-width: 60px;
    border-left: 1px solid #c6c6c6;
    border-top: 1px solid #bcc0c2;
    border-bottom: 1px solid #bcc0c2;
    
    padding-top: 5px;
  }
  .area {
    padding: 7px 5px 2px 5px;
    min-width: 160px;
    text-align: left;
    
    border-top: 1px solid #bcc0c2;
    border-bottom: 1px solid #bcc0c2;
    border-left: 1px solid #c6c6c6;
  }
  
  .bp3-button {
    padding: 7px 9px 7px 9px;
    background-color: #6C757F;
    font-weight: bold;
    color: #FEFEFE;
    border-radius: 0px;
    margin: 0;
    border: 1px solid #bcc0c2;
  }
  
  .fa-copy {
    font-size: 12px;
  }
  
`;

class ButtonCopy extends React.Component {
  render() {
    const {
      title,
      content,
      copyValue,
      btnText,
      className,
      style,
      isPlus,
      copyValue2,
      btnText2,
    } = this.props;

    if (content === null || content === '') {
      return '';
    }

    return (
      <StyledComponent>
        {title && <div className="title">
          <div className={className} style={style}>{title}</div>
        </div>}
        <div className="area">
          <div className={className} style={style}>{content}</div>
        </div>
        <CopyToClipboard
          text={copyValue}
          onCopy={() => this.props.handleAlertSuccess('Copy to clipboard successful!')}
        >
          <Button
            small
            type="button"
            style={{ fontSize: 10 }}
            title={btnText}
          ><i className="fa fa-copy" /></Button>
        </CopyToClipboard>
        {isPlus && <CopyToClipboard
          text={copyValue2}
          onCopy={() => this.props.handleAlertSuccess('Copy to clipboard successful!')}
        >
          <Button
            small
            type="button"
            style={{ fontSize: 10 }}
            title={btnText2}
          ><i className="fa fa-copy" /></Button>
        </CopyToClipboard>
        }
      </StyledComponent>
    );
  }
}

export default compose(
  WithHandleAlert,
  injectIntl,
)(ButtonCopy);

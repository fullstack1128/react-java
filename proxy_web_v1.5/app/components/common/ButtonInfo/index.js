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
  font-weight: 440;
  
  .title {    
    min-width: 60px;
    border-left: 1px solid #c6c6c6;
    border-top: 1px solid #bcc0c2;
    border-bottom: 1px solid #bcc0c2;    
    padding-top: 5px;
  }
  .area {
    padding: 7px 5px 2px 5px;
    min-width: ${(props) => props.mobile ? '258px' : '220px'};
    text-align: left;
    
    border-top: 1px solid #bcc0c2;
    border-bottom: 1px solid #bcc0c2;
    border-left: 1px solid #c6c6c6;
    border-right: 1px solid #c6c6c6;
  }
  
`;

class ButtonInfo extends React.Component {
  render() {
    const { title, content, className, style, mobile } = this.props;

    if (content === null || content === '') {
      return '';
    }

    return (
      <StyledComponent mobile={mobile}>
        {title && <div className="title">
          <div className={className} style={style}>{title}</div>
        </div>}
        <div className="area">
          <div className={className} style={style}>{content}</div>
        </div>
      </StyledComponent>
    );
  }
}

export default compose(
  WithHandleAlert,
  injectIntl,
)(ButtonInfo);

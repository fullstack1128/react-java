import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import ButtonCopy from 'components/common/ButtonCopy';
import ButtonInfo from 'components/common/ButtonInfo';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  .item {
    display: flex;
    align-items: center;
  }
`;

class ProxyInfo extends React.Component {
  render() {
    const { httpProxy, sockProxy, location, proxy } = this.props;
    const authen = get(httpProxy, 'authenticationUsers', '');
    const publicIp = get(httpProxy, 'host');

    const portV4 = `${isEmpty(authen) ? '' : `${authen}@`}${publicIp}:${get(httpProxy, 'sharedPort')}`;
    const sockPortV4 = `${isEmpty(authen) ? '' : `${authen}@`}${publicIp}:${get(sockProxy, 'sharedPort')}`;

    const portV4Type2 = `${publicIp}:${get(httpProxy, 'sharedPort')}${isEmpty(authen) ? '' : `:${authen}`}`;
    const sockPortV4Type2 = `${publicIp}:${get(sockProxy, 'sharedPort')}${isEmpty(authen) ? '' : `:${authen}`}`;

    return (
      <StyledComponent>
        {/* <ButtonInfo title="Location" content={location} /> */}
        <ButtonInfo title="Proxy" content={proxy} />
        <ButtonCopy
          title="Socks5"
          content={`${publicIp}:${get(sockProxy, 'sharedPort')}`}
          copyValue={sockPortV4Type2}
          btnText={'IP:Port:User:Pass'}
          isPlus
          copyValue2={sockPortV4}
          btnText2={'User:Pass@IP:Port'}
        />
        <ButtonCopy
          title="HTTP"
          content={`${publicIp}:${get(httpProxy, 'sharedPort')}`}
          copyValue={portV4Type2}
          btnText={'IP:Port:User:Pass'}
          isPlus
          copyValue2={portV4}
          btnText2={'User:Pass@IP:Port'}
        />
      </StyledComponent>
    );
  }
}

export default compose(
  WithHandleAlert,
  injectIntl,
)(ProxyInfo);

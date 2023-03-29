import React, { Fragment } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import styled from 'styled-components';
import notFoundPackageImg from 'images/transactions/notfound-package@3x.png';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 120px auto;

  .text {
    color: ${(props) => props.theme.colors.black};
    text-align: center;
    margin-top: 10px;
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
  }

  .notfound-img {
    margin-bottom: 20px;
  }
`;

const scope = 'app.components.Transactions.NotFoundPackage';

const messages = defineMessages({
  noPackageContent: {
    id: `${scope}.noPackageContent`,
    defaultMessage: 'Hiện không có Ngân hàng cung cấp gói sản phẩm phù hợp yêu cầu của bạn',
  },
  adjustRateContent: {
    id: `${scope}.adjustRateContent`,
    defaultMessage: 'Vui lòng điều chỉnh lãi suất cho phù hợp',
  },
});

const NotFoundPackage = ({ intl, noPackageContent, infoMessage }) => (
  <StyledWrapper>
    <img className="notfound-img" src={notFoundPackageImg} width={270} height={170} alt="Not Found Package" />
    {!infoMessage ?
      <Fragment>
        <div className="text">{noPackageContent || intl.formatMessage(messages.noPackageContent)}</div>
        <div className="text">{intl.formatMessage(messages.adjustRateContent)}</div>
      </Fragment> :
      <div className="text">{infoMessage}</div>
    }
  </StyledWrapper>
);

export default injectIntl(NotFoundPackage);

import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import messages from './messages';
import { formatCurrency } from '../../../utils/transactions/currencies';
import isNil from 'lodash/isNil';

const InterestIncomeTable = ({
  intl,
  interestLastPeriod,
  duration,
  title,
  subtitle,
  currencyUnit,
  minInterestLastPeriod,
  maxInterestLastPeriod,
}) => (
  <StyledContainer>
    <Row>
      <Col sm="12">
        <div className="title">
          <span className="font-weight-bold">{title} </span>
          {subtitle && (<span>{`(${subtitle})`}</span>)}
        </div>
      </Col>
    </Row>
    <Row className="bg-row">
      <Col sm="6" className="group">
        <div className="label">
          {intl.formatMessage(messages.endPeriodLabel)} ({duration} {intl.formatMessage(messages.suffixMonth)})
        </div>
        <div className="bold-text">
          {`${!isNil(interestLastPeriod) ? formatCurrency(interestLastPeriod, currencyUnit) : ''}`}

          {`${(!isNil(minInterestLastPeriod) && !isNil(maxInterestLastPeriod)) ?
            `${formatCurrency(minInterestLastPeriod, currencyUnit)} ~ ${formatCurrency(maxInterestLastPeriod, currencyUnit)}` :
            ''
          }`}
        </div>
      </Col>
    </Row>
  </StyledContainer>
);

const StyledContainer = styled.div`
  margin-bottom: 150px;

  .title {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSizes.small};
    margin: 10px 0;
  }

  .label {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSizes.small};
    opacity: 0.3;
    text-transform: uppercase;
  }

  .bold-text {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: bold;
  }

  .bg-row {
    height: 64px;
    margin: 0;
    border: 1px solid ${(props) => props.theme.colors.gray300};

    &:nth-child(even) {
      background-color: ${(props) => props.theme.colors.backgroundGray}
    }

    &:first-child {
      margin: 0;
    }
  }

  .group {
    padding: 10px 0 10px 40px;
  }
`;

export default InterestIncomeTable;

import React from 'react';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import Checkbox from 'components/common/FormCheckBox';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';
import sortBy from 'lodash/sortBy';

import ErrorMessage from 'components/common/ErrorMessage';


const StyledContainer = styled(Row)`
  margin-top:20px;
  .label {
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.strong};
    color: ${(props) => props.theme.colors.black900};
    margin-bottom: 5px;
    min-height: 24px;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .errors {
    color: ${(props) => props.theme.colors.redError};
    list-style-type: none;
    padding: 0;
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const StyledCheckBox = styled(Checkbox)`
  margin-bottom: 10px;
`;

class BankListChecker extends React.Component {
  handleOnChange = (e) => {
    const { values, name, banks, setFieldValue, setFieldTouched } = this.props;

    const target = e.target;
    const targetId = parseInt(target.id, 10);
    let newBankIDs = [...get(values, name)] || [];

    if (target.checked && targetId === -1) {
      newBankIDs = [...banks.map((bank) => bank.id)];
    }

    if (target.checked && targetId !== -1) {
      newBankIDs.push(targetId);
    }

    if (!target.checked && targetId === -1) {
      newBankIDs = [];
    }

    if (!target.checked && targetId !== -1) {
      newBankIDs.splice(newBankIDs.indexOf(targetId), 1);
    }

    setFieldValue(name, newBankIDs);
    setFieldTouched(name, true);
  }

  render() {
    let { banks, values, name, label, intl } = this.props;

    banks = sortBy(banks, (bank) => bank.value);

    return (
      <StyledContainer>
        <Col sm="12" className="label">{label}</Col>

        <Col sm="12" className="mt-3">
          <StyledCheckBox
            checked={get(values, name).length === banks.length}
            label={intl.formatMessage(messages.bankAllTitle)}
            onChange={this.handleOnChange}
            id={-1}
          />
        </Col>
        <Col sm="12">
          <Row>
            {
              banks.map((bank) => (
                <Col sm="3" key={`${bank.id}`}>
                  <StyledCheckBox
                    checked={get(values, name).includes(bank.id)}
                    label={bank.value}
                    onChange={this.handleOnChange}
                    id={bank.id}
                  />
                </Col>
              ))
            }
          </Row>
          <ErrorMessage name={name} />
        </Col>
      </StyledContainer>
    );
  }
}

export default injectIntl(BankListChecker);

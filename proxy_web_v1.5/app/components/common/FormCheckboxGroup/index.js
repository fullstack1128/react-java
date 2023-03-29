import React from 'react';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import styled from 'styled-components';
import Checkbox from 'components/common/FormCheckBox';
import ErrorMessage from 'components/common/ErrorMessage';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';

const StyledContainer = styled(FormGroup)`  
  .errors {
    color: ${(props) => props.theme.colors.redError};
    list-style-type: none;
    padding: 0;
    font-size: ${(props) => props.theme.fontSizes.small};
  }
  
  .group {
    margin-top: 10px;
  }
  
  .bp3-checkbox {
    margin-bottom: 10px;
  }
`;

const SELECT_ALL_ID = -1;

class FormCheckboxGroup extends React.Component {
  handleOnChange = (e) => {
    const { values, name, options, setFieldValue, setFieldTouched } = this.props;

    const target = e.target;
    const targetId = parseInt(target.id, 10);
    let newValues = [...get(values, name)] || [];

    if (target.checked && targetId === SELECT_ALL_ID) {
      newValues = [...options.map((option) => option.value)];
    }

    if (target.checked && targetId !== SELECT_ALL_ID) {
      newValues.push(targetId);
    }

    if (!target.checked && targetId === SELECT_ALL_ID) {
      newValues = [];
    }

    if (!target.checked && targetId !== SELECT_ALL_ID) {
      newValues.splice(newValues.indexOf(targetId), 1);
    }

    setFieldValue(name, newValues);
    setFieldTouched(name, true);
  }

  render() {
    const { options, values, name, label, optionWidth } = this.props;

    return (
      <StyledContainer>
        <FormLabel>{label}</FormLabel>

        <div className="group d-flex flex-wrap">
          {
            options && options.map((option, idx) => (
              <Checkbox
                className="option"
                style={{ width: `${optionWidth || '20%'}` }}
                key={`${name}-${idx}`}
                checked={get(values, name).includes(option.value)}
                label={option.label}
                onChange={this.handleOnChange}
                id={`${option.value}`}
                isGetEvt
              />
            ))
          }
        </div>

        <ErrorMessage name={name} />
      </StyledContainer>
    );
  }
}

export default injectIntl(FormCheckboxGroup);

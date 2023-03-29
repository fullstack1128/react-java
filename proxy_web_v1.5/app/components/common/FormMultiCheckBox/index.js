import React from 'react';
import { Checkbox } from '@blueprintjs/core';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import ErrorMessage from '../ErrorMessage';
import messages from '../messages';
import FormCheckBox from '../FormCheckBox';
import remove from 'lodash/remove';
import includes from 'lodash/includes';
import * as PropTypes from 'prop-types';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';

const StyledContainer = styled(FormGroup)`
  .label {
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.black900};
    margin-bottom: 5px;
    min-height: 24px;

    &:first-letter {
      text-transform: uppercase;
    }
  }
  
  .bp3-control {
    margin-bottom: 10px !important;
  }
`;

class FormMultiCheckBox extends React.Component {
  onChange = (checked, value, children, relationVal) => {
    const { name, setFieldValue, onChange, value: valueProps } = this.props;

    if (checked) {
      valueProps.push(value);
      if (relationVal) {
        valueProps.push(relationVal);
      }
    } else {
      remove(valueProps, (item) => item === value);
      if (children && children.length > 0) {
        children.forEach((el) => {
          remove(valueProps, (item) => item === el);
        });
      }
    }

    valueProps.sort((a, b) => a - b);

    if (setFieldValue) {
      setFieldValue(name, valueProps);
    }

    if (onChange) {
      onChange(valueProps);
    }
  }

  onAllChange(checked) {
    const { name, setFieldValue, onChange, checkboxes, value: valueProps } = this.props;
    if (checked) {
      checkboxes.map((el) => valueProps.push(el.value));
    } else {
      checkboxes.map((el) => remove(valueProps, (item) => item === el.value));
    }

    valueProps.sort((a, b) => a - b);

    if (setFieldValue) {
      setFieldValue(name, valueProps);
    }

    if (onChange) {
      onChange(valueProps);
    }
  }

  render() {
    const { label, name, intl, isRequired, checkboxes, value, disabled = false, isAllCheckbox, ...rest } = this.props;
    let isCheckAll = false;
    if (isAllCheckbox) {
      const allValues = checkboxes.map((el) => el.value);
      isCheckAll = allValues.every((el) => value.indexOf(el) > -1);
    }
    return (
      <StyledContainer {...rest}>
        {label && <FormLabel>{label} {!isRequired && `(${intl.formatMessage(messages.optional)})`}</FormLabel>}

        {
          isAllCheckbox && (
            <FormCheckBox
              label={'Chọn tất cả'}
              className={'mb-1'}
              onChange={(e) => this.onAllChange(e.target.checked)}
              checked={isCheckAll}
              disabled={disabled}
            />
          )
        }
        {checkboxes.map((item) => {
          let isDisabled = false;
          if (item.required) {
            isDisabled = !value.includes(item.required);
          }
          return (
            <FormCheckBox
              label={item.label}
              className={'mb-1'}
              onChange={(e) => this.onChange(e.target.checked, item.value, item.children || [], item.relationVal)}
              checked={value && value.includes(item.value)}
              disabled={disabled || isDisabled}
            />
          );
        }
        )}
        <ErrorMessage name={name} />
      </StyledContainer>
    );
  }
}

FormMultiCheckBox.propTypes = {
  onChange: PropTypes.func,
  checkboxes: PropTypes.array,
};

FormMultiCheckBox.defaultProps = {
  isRequired: true,
};

export default injectIntl(FormMultiCheckBox);

import React from 'react';
import { RadioGroup, Radio } from '@blueprintjs/core';
import styled from 'styled-components';
import ErrorMessage from 'components/common/ErrorMessage';
import * as PropTypes from 'prop-types';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import Tooltip from 'components/Tooltip';
import { TooltipPlace } from 'components/Tooltip/constant';

const StyledContainer = styled(FormGroup)`
  .bp3-label {
    margin-bottom: 0;
  }

  .bp3-radio.bp3-inline {
    margin-right: 80px;
    font-size: ${(props) => props.theme.fontSizes.small};
  }

  .bp3-control {
    color: ${(props) => props.theme.colors.black80};

    input:focus ~ span.bp3-control-indicator {
      outline: none;
    }

    input:checked {
      & ~ .bp3-control-indicator {
        background-color: ${(props) => props.theme.colors.green1000} !important;
      }
    }
  }
`;
class FormRadioGroup extends React.Component {
  onChange = (e) => {
    const { name, setFieldValue, onChange } = this.props;
    setFieldValue(name, e.currentTarget.value);

    if (onChange) {
      onChange(e.currentTarget.value);
    }
  }

  render() {
    const { label, name, options, selectedValue, inline, isAsterisk, ...rest } = this.props;
    return (
      <StyledContainer>
        <RadioGroup
          {...rest}
          label={label ? (<FormLabel isAsterisk={isAsterisk}>{label}</FormLabel>) : ''}
          inline={inline}
          onChange={this.onChange}
          selectedValue={selectedValue}
        >
          {options.map((option) => (
            <Radio
              className="mt-2"
              key={option.value}
              value={option.value}
              labelElement={<span data-tip={option.tooltip} data-for={'registerTooltip'}>{option.label}</span>}
            />
          ))}
          <Tooltip
            place={TooltipPlace.RIGHT}
            id={'registerTooltip'}
          />
        </RadioGroup>
        <ErrorMessage name={name} />
      </StyledContainer>
    );
  }
}

FormRadioGroup.propTypes = {
  onChange: PropTypes.func,
};

FormRadioGroup.defaultProps = {
  inline: true,
};

export default FormRadioGroup;

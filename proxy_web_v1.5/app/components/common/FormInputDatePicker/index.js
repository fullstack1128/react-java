import React from 'react';
import { DateInput } from '@blueprintjs/datetime';
import styled from 'styled-components';
import { Icon, Position } from '@blueprintjs/core';
import moment from 'moment';
import { eDateFormat } from 'enums/EDateFormat';
import { convertToDateWithFormat } from 'utils/dateHelper';
import isEmpty from 'lodash/isEmpty';

import ErrorMessage from 'components/common/ErrorMessage';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { focusControl } from '../../../styles/commonCss';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';

const Container = styled(FormGroup)`
  position: relative;

  .bp3-popover-target {
    display: block;
  }

  .bp3-input {
    height: 40px;
    line-height: 40px;
    font-size: ${(props) => props.theme.fontSizes.small};

    &:focus {
      ${focusControl}
    }
  }

  .label {
    font-size: ${(props) => props.theme.fontSizes.small};
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

const IconHolder = styled.div`
  position: absolute;
  top: 33px;
  right: 15px;
  opacity: 0.5;
  font-size: 16px;
`;

class DatePicker extends React.Component {
  onChange = (e) => {
    const { name, setFieldValue, handleSearch } = this.props;
    try {
      if (handleSearch) {
        handleSearch(name, e);
      } else {
        setFieldValue(name, e);
        this.props.onChange && this.props.onChange(e);
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { label, name, isRequired, intl, placeholder, usePortal, isAsterisk } = this.props;
    const format = this.props.format || eDateFormat.DD_MM_YYYY;
    const locale = this.props.locale || 'en';
    const currentDate = new Date();
    const minDate = this.props.minDate || new Date(currentDate.getFullYear() - 5, 0, 1);
    const maxDate = this.props.maxDate || new Date(currentDate.getFullYear() + 5, 0, 1);

    return (
      <Container {...this.props}>
        <FormLabel isAsterisk={isAsterisk}>{label} {!isRequired && `(${intl.formatMessage(messages.optional)})`}</FormLabel>

        <DateInput
          large
          locale={locale}
          popoverProps={{ position: Position.BOTTOM, usePortal: typeof usePortal === 'boolean' ? usePortal : true }}
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          {...this.props}
          formatDate={(date) => moment(date).format(format)}
          parseDate={(str) => convertToDateWithFormat(str, format)}
          onChange={this.onChange}
          placeholder={isEmpty(placeholder) ? `${intl.formatMessage(messages.inputMessage)} ${(label || '').toLowerCase()}` : placeholder}
        />

        <IconHolder>
          <Icon icon="calendar" />
        </IconHolder>

        <ErrorMessage name={name} />
      </Container>
    );
  }
}

DatePicker.defaultProps = {
  isRequired: true,
};

export default injectIntl(DatePicker);

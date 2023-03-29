import React from 'react';
import $ from 'jquery';
import Slider from 'react-rangeslider';
import { Col } from 'reactstrap';
import { defineMessages, injectIntl } from 'react-intl';
import styled, { css } from 'styled-components';
import theme from 'styles/themeStyle';
import FormLabel from '../FormLabel';
import * as PropTypes from 'prop-types';

const DEFAULT_STEP = 0.01;

const scope = 'app.common.year';

const messages = defineMessages({
  rangeSliderUnit: {
    id: scope,
    defaultMessage: 'năm',
  },
});

const StyledContainer = styled.div`
  position: relative;

  .label {
    margin-bottom: 25px;
  }

  .rangeslider-horizontal {
    height: 3px;
    border-radius: 10px;
    background-image: linear-gradient(to right, #10998e, #fba34a);
    margin: 25px 0 20px;
  }

  .rangeslider__fill {
    background-color: transparent;
  }

  .rangeslider__labels {
    color: ${theme.colors.black900};
    font-weight: 500;
    font-size: ${theme.fontSizes.small10};
    opacity: 0.7;

    li {
      font-size: ${theme.fontSizes.small10};

      &:first-child {
        transform: translateX(-100%);
      }

      &:last-child {
        transform: translateX(0);
      }
    }
  }

  .rangeslider__handle {
    width: 0;
    height: 0;

    &:focus {
      outline: none;
    }

    &::after {
      background-image: linear-gradient(135deg, #11988d, #173c44);
      width: 26px;
      height: 26px;
      top: -13px;
      left: -13px;
      box-shadow: none;
    }

    &::before {
      content: attr(data-tooltip-content);
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
      font-size: ${(props) => props.theme.fontSizes.small};
      font-weight: ${(props) => props.theme.fontWeights.strong500};
      border-radius: 4px;
      opacity: 0.7;
      color: #000000;

      ${(props) => props.backgroundTooltip ? css`
        background: ${props.theme.colors.green1000};
        color: ${props.theme.colors.white};
        top: -45px;
        width: 100px;
        text-align: center;
      ` : ''}
    }

    &-tooltip {
      background: transparent;
      color: ${theme.colors.black900};
      top: -40px;
      width: 100px;

      &::after {
        border: 0;
        bottom: 0;
      }
    }
  }
`;

class FormSlider extends React.Component {
  getTooltipContent = () => {
    const { value, rates, intl } = this.props;
    if (value === rates.min || value === rates.max) return '';

    return `${value.toFixed(2)}%/${intl.formatMessage(messages.rangeSliderUnit)}`;
  };

  handleChange = (e) => {
    const {
      setFieldValue,
      name,
    } = this.props;
    setFieldValue(name, e);
  };

  handleOnChangeRate() {
    const { tooltipContent } = this.props;
    if (tooltipContent) {
      $('.rangeslider__handle').attr('data-tooltip-content', tooltipContent);
      return;
    }
    $('.rangeslider__handle').attr('data-tooltip-content', this.getTooltipContent());
  }

  componentDidMount() {
    this.handleOnChangeRate();
  }

  componentWillReceiveProps() {
    this.handleOnChangeRate();
  }

  render() {
    const { intl, value, rates, label, name, onChange, showMinMax, step, backgroundTooltip } = this.props;

    return (
      <StyledContainer backgroundTooltip={backgroundTooltip}>
        <FormLabel className={'label'}>{label}</FormLabel>

        <Slider
          min={rates.min}
          max={rates.max}
          step={step || DEFAULT_STEP}
          value={value}
          name={name}
          onChange={onChange || this.handleChange}
          format={(rateValue) => `${rateValue.toFixed(2)}% / ${intl.formatMessage(messages.rangeSliderUnit)}`}
          labels={showMinMax ? { [rates.min]: `${rates.min}%`, [rates.max]: `${rates.max}%` } : {}}
          tooltip={false}
        />
      </StyledContainer>
    );
  }
}

FormSlider.propTypes = {
  showMinMax: PropTypes.bool,
  tooltipContent: PropTypes.string,
  step: PropTypes.number,
  backgroundTooltip: PropTypes.bool,
};

FormSlider.defaultProps = {
  showMinMax: true,
};

export default injectIntl(FormSlider);

import React, { Fragment } from 'react';
import Select, { components } from 'react-select';

import ErrorMessage from 'components/common/ErrorMessage';
import StyledContainer from './styles';
import themeStyle from 'styles/themeStyle';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';
import FormLabel from '../FormLabel';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { Icon } from '@blueprintjs/core';
import Scrollbar from '../Scrollbar';

const colorStyles = {
  option: (styles) => ({
    ...styles,
    color: themeStyle.colors.black,
    backGroundColor: themeStyle.colors.black,
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: themeStyle.fontWeights.normal,
  }),

  singleValue: (provided) => ({
    ...provided,
    color: themeStyle.colors.black,
    opacity: 0.3,
    backGroundColor: themeStyle.colors.black,
  }),

  placeholder: (provided) => ({
    ...provided,
    color: themeStyle.colors.black,
    opacity: 0.4,
    fontSize: themeStyle.fontSizes.small,
    fontWeight: themeStyle.fontWeights.normal,
  }),

  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused ?
      `0 0 0 1px ${themeStyle.colors.green1000}, 0 0 0 2px ${themeStyle.colors.green800}, inset 0 1px 1px ${themeStyle.colors.green200}` :
      'none',
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),

  menuList: (provided) => ({
    ...provided,
    overflow: 'visible',
  }),
};

const StyledTooltip = styled(ReactTooltip)`
  &.custom-tooltip {
    font-size: ${(props) => props.theme.fontSizes.small10};
    width: 200px;
    padding: 10px 10px 10px 15px;
    background-color: white;
    color: black;
    box-shadow: 3px 3px 5px 1px ${(props) => props.theme.colors.gray500};
    text-transform: none;
  
    &::after {
      border-right-color: ${(props) => props.theme.colors.gray20} !important;
    }
  }  
`;

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <Icon icon="chevron-down" />
  </components.DropdownIndicator>
);

const Menu = (props) => (
  <Fragment>
    <components.Menu {...props} className={'menu'}>
      {props.children}
    </components.Menu>
  </Fragment>
);

const MenuList = (props) => (
  <Fragment>
    <Scrollbar
      autoHeight
    >
      <components.MenuList {...props} >
        {props.children}
      </components.MenuList>
    </Scrollbar>
  </Fragment>
);

const NoOptionsMessage = (props) => (
  <components.NoOptionsMessage {...props}>
    <FormattedMessage {...messages.noOptionMessage} />
  </components.NoOptionsMessage>
);

const Option = (props) => {
  if (props.data.tooltip) {
    return (<Fragment>
      <components.Option
        {...props}
      >
        <span
          data-tip={props.data.tooltip}
          data-for={`option-tooltip-${props.data.value}`}
        >{props.data.label}</span>

        <StyledTooltip
          place="right"
          id={`option-tooltip-${props.data.value}`}
          type="dark"
          effect="solid"
          className="custom-tooltip"
        />
      </components.Option>
    </Fragment>);
  }

  return (
    <components.Option {...props} />
  );
};

const Group = (props) => {
  if (props.data.tooltip) {
    return (<Fragment>
      <components.Group
        {...props}
        Heading={(propsHeader) =>
          (<components.GroupHeading {...propsHeader}>
            <span
              data-tip={props.data.tooltip}
              data-for={`group-heading-tooltip-${props.data.value}`}
            >{props.data.label}</span>

            <StyledTooltip
              place="right"
              id={`group-heading-tooltip-${props.data.value}`}
              type="dark"
              effect="solid"
              className="custom-tooltip"
            />
          </components.GroupHeading>)
        }
      />
    </Fragment>);
  }

  return (
    <components.Group {...props} />
  );
};

class DropdownList extends React.Component {
  handleOnChange = (e) => {
    const { name, setFieldValue } = this.props;
    setFieldValue(name, e ? e.value : null);
  };

  render() {
    const { label, name, errors, isRequired, isAsterisk, intl, placeholder, disabled, ...rest } = this.props;

    return (
      <StyledContainer>
        {label && (
          <div className={'d-flex '}>
            <FormLabel
              isRequired={isRequired}
              isAsterisk={isAsterisk}
            >{label}</FormLabel>
          </div>)}

        <div className={`select-container ${disabled ? 'disabled' : ''}`}>
          <Select
            className="select-dropdown"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: themeStyle.colors.green200,
                primary50: themeStyle.colors.green100,
                primary25: themeStyle.colors.green100,
              },
            })}
            classNamePrefix="dropdown-list"
            components={{ Menu, DropdownIndicator, NoOptionsMessage, Option, Group, MenuList }}
            styles={colorStyles}
            onChange={this.props.onChange || this.handleOnChange}
            maxMenuHeight={220}
            isDisabled={disabled}
            {...rest}
            placeholder={intl.formatMessage(messages.selectMessage)}
          />
        </div>

        <ErrorMessage name={name} />
      </StyledContainer>
    );
  }
}

DropdownList.defaultProps = {
  isRequired: true,
};

export default injectIntl(DropdownList);

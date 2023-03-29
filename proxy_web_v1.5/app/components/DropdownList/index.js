import React, { Fragment } from 'react';
import Select, { components } from 'react-select';
import { defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import themeStyle from 'styles/themeStyle';
import breakpoint from '../../styles/breakpoint';
import Scrollbar from 'components/common/Scrollbar';

const scope = 'app.components.ManagePackages.DropdownList';

const messages = defineMessages({
  noOptionMessage: {
    id: `${scope}.noOptionMessage`,
    defaultMessage: 'Không tìm thấy',
  },
});

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: themeStyle.colors.black,
    backGroundColor: themeStyle.colors.black,
    paddingLeft: 20,
    fontSize: 13,
    marginTop: 0,
  }),

  singleValue: (provided) => ({
    ...provided,
    fontSize: 14,
    fontWeight: 700,
    paddingLeft: 10,
    color: themeStyle.colors.black80,
    backGroundColor: themeStyle.colors.black,
    opacity: 0.8,
  }),

  placeholder: (provided) => ({
    ...provided,
    color: themeStyle.colors.black80,
    opacity: 0.4,
    fontSize: themeStyle.fontSizes.small,
    paddingLeft: 10,
    margin: 0,
  }),

  container: (provided) => ({
    ...provided,
  }),

  control: (provided) => ({
    ...provided,
    height: 34,
    minHeight: 34,
    boxShadow: 'none',
    border: 'none !important',
    borderRadius: 3,
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),

  menuList: (provided) => ({
    ...provided,
    overflow: 'visible',
  }),
  input: (styles) => ({
    ...styles,
    paddingLeft: 10,
  }),
};

const NoOptionsMessage = (props) => (
  <components.NoOptionsMessage {...props}>
    <FormattedMessage {...messages.noOptionMessage} />
  </components.NoOptionsMessage>
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
const DropdownList = (props) => {
  const { label, handleOnChange, ...rest } = props;

  return (
    <StyledContainer>
      { label && <div className="label">
          {label}
        </div>
      }
      <Select
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: themeStyle.colors.green200,
            primary25: themeStyle.colors.graygreen,
          },
        })}
        styles={customStyles}
        onChange={handleOnChange}
        classNamePrefix="react-select"
        components={{
          NoOptionsMessage,
          Menu,
          MenuList,
        }}
        {...rest}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  line-height: 1;

  .label {
    letter-spacing: -0.5px;
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-bottom: 0;
    min-height: 24px;
    position: relative;
    opacity: 0.9;
    font-weight: 500;
    color: #000000;

    &:first-letter {
      text-transform: uppercase;
    }
  }
  
  .react-select__value-container {
    cursor: pointer;
    background-color: transparent;
    margin-left: 8px;
    padding: 0;
    //margin-top: 12px;
    
    
    & > div:nth-child(2) {
      margin: 0;
    }
  }

  .react-select__option {
    &:active {
      background-color: ${(props) => props.theme.colors.green200};
    }
  }
  
  .react-select__control {
    background-color: transparent;
    height: 40px;
    min-height: unset;
    cursor: pointer;
    padding: 8px 0;
    border-radius: 6px;
    box-shadow: none;
    border: solid 0.5px #d8d8d8!important;
  }
  
  .react-select__single-value {
    margin-left: 10px;
    padding-left: 0;
  }
  
  .react-select__indicator {
    padding: 0 10px 0 0;
  }
  
  @media (max-width: ${breakpoint.md}) {
    margin-bottom: 10px;      
    width: 100%;
    margin-right: 0;
  }
  

  // CSS Modules
  .menu {
     animation: fade--in .2s ease-in-out;
  }

  @keyframes fade--in {
    0% {
        opacity: 0;
        transform: translateY(-2rem);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
  }
`;

export default DropdownList;

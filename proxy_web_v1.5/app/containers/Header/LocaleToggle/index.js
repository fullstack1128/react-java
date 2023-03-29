import React from 'react';
import { Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import vnFlag from 'images/icons/vn-flag.png';
import enFlag from 'images/icons/en-flag.png';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { changeLocale } from '../../LanguageProvider/actions';
import { makeSelectLocale } from '../../LanguageProvider/selectors';
import breakpoint from '../../../styles/breakpoint';


const EN_LOCALE = 'en';
const VI_LOCALE = 'vi';

const StyledComponent = styled.div`
  position: absolute;
  right: 10px;
  top: 15px;
    
  @media (max-width: ${breakpoint.md}) {
    margin-right: 5px;
  }
`;

const StyledTarget = styled.div`
  a {
    img {
      border-radius: 50%;
      overflow: hidden;
      width: 26px;
      height: 26px;
      object-fit: cover;
      margin-right:5px;
    }
  }

`;

const StyledContent = styled.div`

`;


export class LocaleToggle extends React.PureComponent {
  onChangeLocale = (locale) => {
    this.props.onLocaleToggle(locale);
  };

  render() {
    const { locale } = this.props;

    const content = (
      <StyledContent>
        <Menu>
          {locale === VI_LOCALE ?
            <MenuItem
              text="EN"
              icon={<img src={enFlag} alt={EN_LOCALE} style={{ height: 20 }} />}
              onClick={() => this.onChangeLocale(EN_LOCALE)}
            /> :
            <MenuItem
              text="VN"
              icon={<img src={vnFlag} alt={VI_LOCALE} style={{ height: 20 }} />}
              onClick={() => this.onChangeLocale(VI_LOCALE)}
            />}
        </Menu>
      </StyledContent>
    );

    const target = (
      <StyledTarget>
        {locale === VI_LOCALE ?
          <a>
            <img src={vnFlag} alt={VI_LOCALE} />
          </a> :
          <a>
            <img src={enFlag} alt={EN_LOCALE} />
          </a>}
      </StyledTarget>);
    return (
      <StyledComponent>
        <Popover content={content} target={target} position={Position.BOTTOM} />
      </StyledComponent>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (locale) => dispatch(changeLocale(locale)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);

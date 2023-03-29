/**
 *
 * FilterTop
 *
 */

import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import * as PropTypes from 'prop-types';
import * as filterTypes from './constants';
import FilterButton from './styled/FilterButton';
import FilterInput from './styled/FilterInput';
// import { isEqual, isEmpty } from 'lodash';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { InputGroup } from '@blueprintjs/core';
import searchIcon from 'images/packages/search-icon@3x.png';


class FilterTop extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      itemSelected: {},
      options: [],
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    if (!this.props.value) {
      this.setState({
        itemSelected: isEmpty(this.props.options) ? {} : this.props.options[0],
      });
    } else {
      this.setState({
        itemSelected: this.props.value,
      });
    }
  }

  handleSelectItem(value) {
    const { options } = this.props;
    const item = options.find(btn => btn.value === value);

    this.setState({
      itemSelected: item,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(item);
      }
    });
  }

  render() {
    const { options, type, label, children, value, placeholder, onChange } = this.props;

    switch (type) {
      case filterTypes.BUTTON: {
        return (
          <FilterButton>
            <Tabs onChange={(newTabId) => this.handleSelectItem(newTabId)} selectedTabId={value}>
              {options.map((btn) => (
                <Tab id={btn.value} title={btn.label} />
              ))}
            </Tabs>
          </FilterButton>
        );
      }

      case filterTypes.INPUT: {
        return (
          <FilterInput>
            <InputGroup
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              inputRef={(ref) => {
                this.inputSearch = ref;
              }}
              maxLength={30}
            />
            <img
              src={searchIcon}
              alt={'search'}
              className="search-icon"
              onClick={() => {
                this.inputSearch.focus();
              }}
            />
          </FilterInput>
        );
      }

      default:
        return (
          <div>
            <h4>{label}</h4>
            {children}
          </div>
        );
    }
  }
}

FilterTop.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.object,
};

FilterTop.defaultProps = {
  options: [],
  value: null,
};

export default FilterTop;

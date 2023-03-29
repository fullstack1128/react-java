import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import { Row, Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import orderBy from 'lodash/orderBy';

import DropdownList from 'components/common/DropdownList';
import FormInputGroup from 'components/common/FormInputGroup';

import messages from './messages';
import { MAX_LENGTH_STREET_ADDRESS } from 'utils/transactions/constants';
import { convertLocationWithType } from 'utils/stringHelper';

const StyledContainer = styled.div`
  .legend {
    padding: 0px 0 5px;
    font-size: 14px;
  }
`;

const toAddressOptions = (list) => {
  list = orderBy(convertLocationWithType(list), ['seq', 'name'], ['asc', 'asc']);
  return list.map((item) => ({ value: item.id, label: item.name }));
};

class TemporaryAddress extends React.Component {
  getAddressesOptions = () => {
    const { values, provinceIdName, districtIdName, provinces } = this.props;
    const selectedProvinceId = get(values, provinceIdName);
    const selectedDistrictId = get(values, districtIdName);
    const selectedProvince = provinces.find((element) => element.id === selectedProvinceId);

    const provinceOptions = toAddressOptions(provinces);

    const districts = get(selectedProvince, 'Districts', []);
    const districtOptions = toAddressOptions(districts);
    const selectedDistrict = districts.find((element) => element.id === selectedDistrictId);

    const wards = get(selectedDistrict, 'Wards', []);
    const wardOptions = toAddressOptions(wards);

    return {
      provinceOptions,
      districtOptions,
      wardOptions,
    };
  }

  handleOnChange = (type) => (e) => {
    const { setFieldValue, districtIdName, wardIdName, provinceIdName } = this.props;

    if (type === 'province') {
      setFieldValue(provinceIdName, e.value);
      setFieldValue(districtIdName, null);
      setFieldValue(wardIdName, null);
    }

    if (type === 'district') {
      setFieldValue(districtIdName, e.value);
      setFieldValue(wardIdName, null);
    }
  }

  render() {
    const {
      intl,
      streetAddress,
      provinceIdName,
      districtIdName,
      wardIdName,
      legend,
    } = this.props;

    const {
      provinceOptions,
      districtOptions,
      wardOptions,
    } = this.getAddressesOptions();

    return (
      <StyledContainer>
        { legend && <div className="legend"><i>{legend}</i></div>}
        <Row>
          <Col sm="12" md="6" className={'input-field-left'}>
            <FormInputGroup
              maxLength={MAX_LENGTH_STREET_ADDRESS}
              placeholder={intl.formatMessage(messages.temporaryAddressPlaceholder)}
              label={intl.formatMessage(messages.temporaryAddress)}
              name={streetAddress}
              value={get(this.props.values, streetAddress)}
              onChange={this.props.handleChange}
            />
          </Col>
          <Col sm="12" md="6">
            <DropdownList
              placeholder={intl.formatMessage(messages.provincePlaceholder)}
              label={intl.formatMessage(messages.province)}
              name={provinceIdName}
              options={provinceOptions}
              value={provinceOptions.find((option) =>
                option.value === get(this.props.values, provinceIdName)
              ) || null}
              onChange={this.handleOnChange('province')}
              {...this.props}
            />
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="6">
            <DropdownList
              placeholder={intl.formatMessage(messages.districtPlaceholder)}
              label={intl.formatMessage(messages.district)}
              name={districtIdName}
              options={districtOptions}
              value={districtOptions.find((option) =>
                option.value === get(this.props.values, districtIdName)
              ) || null}
              onChange={this.handleOnChange('district')}
              {...this.props}
            />
          </Col>

          <Col sm="12" md="6">
            <DropdownList
              placeholder={intl.formatMessage(messages.wardPlaceholder)}
              label={intl.formatMessage(messages.ward)}
              name={wardIdName}
              options={wardOptions}
              value={wardOptions.find((option) =>
                option.value === get(this.props.values, wardIdName)
              ) || null}
              {...this.props}
            />
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}

export default injectIntl(TemporaryAddress);

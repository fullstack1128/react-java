import React, { Fragment } from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { TO, convertDropdownList } from 'utils/utilHelper';
import { formatCurrency } from 'utils/numberHelper';
import DropdownList from 'components/common/DropdownList';
import FormRadioGroup from 'components/common/FormRadioGroup';
import FormInputGroup from 'components/common/FormInputGroup';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';

export class BandwidthLimit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      formikProps,
      label,
      bwLimitEnabled,
      bwLimitRate,
    } = this.props;

    return (
      <Fragment>
        <Col md={{ size: 12 }}>
          <FormRadioGroup
            options={[{
              value: '0',
              label: 'Unlimited',
            },
            {
              value: '1',
              label: 'Limited',
            }]}
            name={bwLimitEnabled}
            label={label}
            selectedValue={get(formikProps.values, bwLimitEnabled)}
            {...formikProps}
            onChange={(value) => {
              formikProps.setFieldValue(bwLimitEnabled, value);
            }}
          />
        </Col>
        { get(formikProps.values, bwLimitEnabled) === '1' && <Fragment>
          <Col md={{ size: 6 }}>
            <FormInputGroup
              label={'Rate limit by Mbps'}
              name={bwLimitRate}
              type={'number'}
              value={get(formikProps.values, bwLimitRate, 0)}
              onChange={(e) => {
                formikProps.handleChange(e);
                formikProps.setFieldTouched(bwLimitRate, true, true);
              }}
            />
          </Col>
        </Fragment>
        }
      </Fragment>
    );
  }
}

export default compose(
  injectIntl
)(BandwidthLimit);

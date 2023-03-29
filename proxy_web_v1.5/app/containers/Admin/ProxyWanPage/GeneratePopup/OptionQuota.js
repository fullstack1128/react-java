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

export class OptionQuota extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      formikProps,
      label,
      data1Name,
      data2Name,
      data3Name,
    } = this.props;

    const quotaOptions = convertDropdownList([
      {
        id: 1,
        name: 'Daily',
      },
      {
        id: 2,
        name: 'Weekly',
      },
      {
        id: 3,
        name: 'Monthly',
      },
      {
        id: 4,
        name: 'End of quota',
      },
    ]);

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
              label: 'Limited (MB)',
            }]}
            name={data1Name}
            label={label}
            selectedValue={get(formikProps.values, data1Name)}
            {...formikProps}
            onChange={(value) => {
              formikProps.setFieldValue(data1Name, value);
            }}
          />
        </Col>
        { get(formikProps.values, data1Name) === '1' && <Fragment>
          <Col md={{ size: 6 }}>
            <DropdownList
              value={quotaOptions.find((option) =>
                option.value === get(formikProps.values, data2Name, 0)
              )}
              name={data2Name}
              options={quotaOptions}
              {...formikProps}
            />
          </Col>
          <Col md={{ size: 6 }}>
            <FormInputGroup
              name={data3Name}
              type={'number'}
              value={get(formikProps.values, data3Name, 0)}
              onChange={(e) => {
                formikProps.handleChange(e);
                formikProps.setFieldTouched(data3Name, true, true);
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
)(OptionQuota);

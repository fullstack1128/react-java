import { defineMessages } from 'react-intl';

const messages = defineMessages({
  max_length: {
    id: 'Validation.max_length',
    defaultMessage: '{field} không quá {length} ký tự',
  },
  field_required: {
    id: 'Validation.field_required',
    defaultMessage: 'Xin đừng để trống',
  },
  invalid_email: {
    id: 'Validation.invalid_email',
    defaultMessage: 'Xin nhập email hợp lệ', // Please enter a valid email address
  },
});

function validationRuleCreator(intl) {
  return {
    isMaxLength: (max, fieldName) => ({
      isMaxLength: {
        message: intl.formatMessage(messages.max_length, {
          field: fieldName,
          length: max,
        }),
        length: max,
      },
    }),
    isEmail: { isEmail: `${intl.formatMessage(messages.invalid_email)}` },
    isRequired: {
      isRequired: `${intl.formatMessage(messages.field_required)}`,
    },
  };
}

export const extraValidators = {
  isNull: (config, { fields, errors }) => (value) =>
    value === null || value === undefined ? config.message : null,
};

export default validationRuleCreator;

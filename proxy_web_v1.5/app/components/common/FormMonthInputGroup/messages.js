
import { defineMessages } from 'react-intl';

const scope = 'app.components.common.FormMonthInputGroup';

const messages = defineMessages({
  month: {
    id: `${scope}.month`,
    defaultMessage: '{value, plural, =0 {tháng} one {tháng} other {tháng}}',
  },
  year: {
    id: `${scope}.year`,
    defaultMessage: '{value, plural, =0 {năm} one {năm} other {năm}}',
  },
});

export default messages;

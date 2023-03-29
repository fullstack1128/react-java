// TODO remove this in next print - using Formik & Yup instead
export const isRequired = (message = null) => ({
  isRequired: message || 'This field is required',
});

// TODO remove this in next print - using Formik & Yup instead
export const isMinLength = (length, message = null) => ({
  isMinLength: {
    message: message || `Password must at least be ${length} characters long`,
    length,
  },
});

// TODO remove this in next print - using Formik & Yup instead
export const isMaxLength = (length, message = null) => ({
  isMaxLength: {
    message: message || `You can at most have ${length} characters`,
    length,
  },
});

// TODO remove this in next print - using Formik & Yup instead
export const isComparePassword = (fieldName, message = null) => ({
  isEqual: ({ fields }) => ({
    message: message || 'The two password must match',
    value: fields[fieldName],
    validateIf: fields[fieldName].length > 0,
  }),
});

// TODO remove this in next print - using Formik & Yup instead
export const isNotEqualField = (fieldName, message = 'This field invalid') => ({
  isBlacklisted: ({ fields }) => ({
    message,
    blacklist: [fields[fieldName]],
  }),
});

// TODO remove this in next print - using Formik & Yup instead
export const isBlacklisted = (blacklist, message = 'This field invalid') => ({
  isBlacklisted: () => ({
    message,
    blacklist: [blacklist],
  }),
});

// TODO remove this in next print - using Formik & Yup instead
export const isEmailValid = (str) => (
  str.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
);

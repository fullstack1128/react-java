import React from 'react';
import { Field, getIn } from 'formik';
import styled from 'styled-components';

const StyledContainer = styled.div`
  color: ${(props) => props.theme.colors.redError};
  padding: 0;
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-top: 5px
`;

const ErrorMessageNestedField = ({ name }) => (
  <StyledContainer>
    <Field
      name={name}
      render={({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    />
  </StyledContainer>
);

export default ErrorMessageNestedField;

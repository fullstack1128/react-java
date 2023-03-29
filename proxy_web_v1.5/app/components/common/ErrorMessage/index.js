import React from 'react';
import { ErrorMessage as ErrorMessageFormik } from 'formik';
import styled from 'styled-components';

const StyledContainer = styled.div`
  color: ${(props) => props.theme.colors.redError};
  padding: 0;
  font-size: ${(props) => props.theme.fontSizes.small12};
  margin-top: 5px
`;

const ErrorMessage = ({ name }) => (
  <ErrorMessageFormik component={StyledContainer} name={name} />
);

export default ErrorMessage;

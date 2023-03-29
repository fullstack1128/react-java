import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import messages from '../../messages';

const StyledContainer = styled.div`
    background-color: ${(props) => props.theme.colors.gray10};
   .label {
      padding: 20px;
   }
`;

const NotFoundTable = (props) => {
  const { intl } = props;

  return (
    <StyledContainer>
      <div className="label text-center">{intl.formatMessage(messages.noDataFound)}</div>
    </StyledContainer>
  );
};

export default injectIntl(NotFoundTable);

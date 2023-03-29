import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import split from 'lodash/split';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';


import { Breadcrumbs, Boundary } from '@blueprintjs/core';
import { Container } from 'reactstrap';
import { injectIntl } from 'react-intl';

const StyledDiv = styled.div`
  width: 100%;
  height: 54px;
  font-weight:bold;
  font-size: 16px;
  color: #ffffff;

  //background-image: linear-gradient(to bottom, #194a79, #153466);

  display: flex;
  justify-content: center;
  flex-direction: column;

  .bp3-breadcrumb {
    color: #ffffff;
  }
`;

class BreadcrumbBar extends PureComponent {
  buildData(path, getMessage, intl) {
    const segments = split(path, '/');
    const segmentsIncludingRoot = ['/', ...segments];

    return segmentsIncludingRoot
      .map((segment) => {
        const message = getMessage(segment);
        if (isEmpty(message)) {
          return null;
        }

        const name = intl.formatMessage(message);
        return { text: name };
      })
      .filter((item) => !isNull(item));
  }

  render() {
    const { showPath, getMessage, path, intl } = this.props;
    const data = this.buildData(path, getMessage, intl);

    return (
      <StyledDiv>
        <Container>
          {showPath ? (
            <Breadcrumbs collapseFrom={Boundary.START} items={data} />
          ) : null}
        </Container>
      </StyledDiv>
    );
  }
}

BreadcrumbBar.propTypes = {
  showPath: PropTypes.bool,
  path: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
};

BreadcrumbBar.defaultProps = {
  showPath: true,
  path: '',
};

export default injectIntl(BreadcrumbBar);

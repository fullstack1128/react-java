import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import styled from 'styled-components';
import range from 'lodash/range';

import themeStyle from 'styles/themeStyle';

const EmptyInlineContainer = () => (
  <div>
    <div className="label" />
    <div className="bold-text" />
  </div>
);

const InlineContainer = ({
  title,
  content,
  contentColor,
}) => (
  <div>
    <div className="label">{title}</div>
    <div className="bold-text" style={{ color: contentColor }}>{content}</div>
  </div>
);

const ActionPopupContent = (props) => {
  const { items } = props;
  const numberOfRows = Math.ceil(items.length / 2);
  return (
    <StyledContainer>
      {
        range(0, numberOfRows).map((index) => {
          const colors = (index % 2 === 0) ?
            [themeStyle.colors.gray, themeStyle.colors.white] :
            [themeStyle.colors.white, themeStyle.colors.gray];
          return (
            <Row className="bg-row">
              <Col sm="6" className="group" style={{ backgroundColor: colors[0] }}>
                <InlineContainer
                  title={items[index * 2].label}
                  content={items[index * 2].value}
                  contentColor={items[index * 2].textColor}
                />
              </Col>
              <Col sm="6" className="group" style={{ backgroundColor: colors[1] }}>
                {
                  (((index * 2) + 1) > items.length) ?
                    <EmptyInlineContainer /> :
                    <InlineContainer
                      title={items[(index * 2) + 1].label}
                      content={items[(index * 2) + 1].value}
                      contentColor={items[(index * 2) + 1].textColor}
                    />
                }
              </Col>
            </Row>
          );
        })
      }
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  border: solid 1px #d8d8d8;

  .label {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSizes.small12};
    opacity: 0.3;
  }

  .bold-text {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-weight: bold;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .bg-row {
    height: 64px;

    .group {
      padding: 10px 15px;
    }

    &:nth-child(odd) {
      background-color: ${(props) => props.theme.colors.backgroundGray}
    }
  }
`;

export default ActionPopupContent;

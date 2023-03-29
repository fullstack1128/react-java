import React, { Fragment } from 'react';
import { compose } from 'redux';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import { injectIntl } from 'react-intl';
import Block from './Block';
import iconExtension from 'images/chrome-extension-icon.jpg';
import Container from 'reactstrap/es/Container';
import Card from 'components/Card';
import styled from 'styled-components';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import { faq } from 'services/user.service';

const StyledComponent = styled.div`
  margin-top: 30px;
`;


export class FaqPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faq: '',
    };
  }

  componentWillMount() {
    this.props.handlePromise(faq(), (response) => {
      this.setState({
        faq: response.data,
      });
    });
  }

  render() {
    const { faq } = this.state;
    return (
      <StyledComponent>
        <Container>
          <Card>
            <span dangerouslySetInnerHTML={{ __html: faq }} />
          </Card>
        </Container>
      </StyledComponent>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(FaqPage);

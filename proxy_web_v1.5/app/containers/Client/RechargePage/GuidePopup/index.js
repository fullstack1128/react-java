import React from 'react';
import { injectIntl } from 'react-intl';
import Button from 'components/common/Button';
import ButtonLink from 'components/ButtonLink';
import ActionDialog from 'components/common/ActionDialog';
import messages from '../messages';
import styled from 'styled-components';
import get from 'lodash/get';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import { Row, Col } from 'reactstrap';
import FormLabel from 'components/common/FormLabel';
import { QRCode } from 'react-qrcode-logo';


const StyledContainer = styled(ActionDialog)`
  
`;

class GuidePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCopy = () => {
    const {
      transaction,
    } = this.props;

    navigator.clipboard.writeText(get(transaction, 'payAddress'));
    this.props.handleAlertSuccess('Copy to clipboard successful!');
  }

  render() {
    const {
      intl,
      isOpen,
      handleOnClose,
      transaction,
    } = this.props;

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Transfer information'}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width={650}
      >
        <Wrapper className="m-4">
          <div className="mb-4">
            <FormLabel className="label">
              <h6>Transfer Information:</h6>
            </FormLabel>

            <Row>


              <Col md={{ size: 9 }}>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: 14, fontWeight: 800 }} className="ml-4">
                  <span style={{ textAlign: 'left' }}> Price: {get(transaction, 'amount')} USD</span>
                  <span style={{ textAlign: 'left' }}> Amount: {get(transaction, 'payAmount')} {get(transaction, 'payCurrency')}</span>
                  <span style={{ textAlign: 'left' }}> Address: {get(transaction, 'payAddress')}&nbsp;
                    <i
                      className="fa fa-copy"
                      title="Copy"
                      style={{ color: '#44779f', cursor: 'pointer' }}
                      onClick={this.handleCopy}
                    />
                  </span>
                </div>
              </Col>
              <Col md={{ size: 3 }}>
                <QRCode
                  value={get(transaction, 'payAddress')}
                  size={100}
                />
              </Col>
            </Row>
          </div>
          <div className="mb-2">
            <FormLabel className="label">
              <h6>Guide:</h6>
            </FormLabel>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }} className="ml-4">
              <span style={{ textAlign: 'left' }}>
                <i className="fa fa-check" /> Please sends coins with the transfer information.</span>
              <span style={{ textAlign: 'left' }}>
                <i className="fa fa-check" /> After sends coins, system will processes and exchanges them, and settles the payment to your balance.</span>
            </div>
          </div>

          <div className="d-flex flex-column align-items-center">
            <ButtonLink
              onClick={handleOnClose}
              type={'button'}
            >{intl.formatMessage(messages.close)}</ButtonLink>
          </div>
        </Wrapper>
      </StyledContainer>
    );
  }
}


const Wrapper = styled.div`
  margin-bottom: 10px;
`;


export default compose(
  WithHandleAlert,
  injectIntl
)(GuidePopup);

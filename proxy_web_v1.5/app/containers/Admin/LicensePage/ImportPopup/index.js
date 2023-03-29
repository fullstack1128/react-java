import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import Button from 'components/common/Button';
import ButtonLink from 'components/ButtonLink';
import ActionDialog from 'components/common/ActionDialog';
import messages from '../messages';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import { importLicense } from 'services/admin/license.service';
import { TO } from 'utils/utilHelper';
import { errorCode } from 'constants/responseCode';


const StyledContainer = styled(ActionDialog)`
`;

class ImportPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      importResult: '',
      importLoading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      importResult: '',
    };
  }

  handleFileInput = (e) => {
    const file = e.target.files[0];
    this.setState({
      file,
    });
  }

  handleSubmit = async () => {
    const { intl } = this.props;
    const { file } = this.state;
    this.setState({
      importLoading: true,
    });

    const [err, response] = await TO(importLicense(file));

    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }

    this.setState({
      importResult: response.data.data,
      importLoading: false,
    });

    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgUpdateSuccess));
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }
  }

  render() {
    const self = this;
    const {
      intl,
      isOpen,
      handleOnClose,
    } = this.props;

    const {
      importResult,
      importLoading,
    } = self.state;

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Import license'}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width={700}
      >
        <Wrapper className="m-4 ml-5 mr-4">

          <Row>
            <Col md={{ size: 6 }}>
              <input type="file" onChange={this.handleFileInput} />
              <a href={'http://18.195.167.166/proxyapi/v1/admin/licenses/get-import-template'} download="Import_License.csv"> Download Template Here </a>
            </Col>
          </Row>
          <div className="mt-3">
            <h6>Guide:</h6>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }} className="ml-4">
              <span style={{ textAlign: 'left' }}>
                <i className="fa fa-check" /> Please prepare enough available proxies before import.</span>
              <span style={{ textAlign: 'left' }}>
                <i className="fa fa-check" /> Results will be displayed after successful import</span>
            </div>
          </div>

          <div className="mt-3">
            <h6>Import result:</h6>
            <div style={{ fontSize: 14, fontWeight: 600 }} className="ml-4">
              <span dangerouslySetInnerHTML={{ __html: importResult }} />
            </div>
          </div>

          <div className="d-flex flex-column align-items-center">
            <Button
              primary
              type="submit"
              className="min-width-300 mt-4"
              onClick={this.handleSubmit}
              loading={importLoading}
            >Import</Button>
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


ImportPopup.propTypes = {};

const Wrapper = styled.div`
  margin-bottom: 10px;
`;


export default compose(
  WithHandleAlert,
  injectIntl
)(ImportPopup);

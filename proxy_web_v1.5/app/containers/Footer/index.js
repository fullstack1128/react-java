import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import FooterTitle from './styled/FooterTitle';
import { FooterLink, FooterLinkMinimal } from './styled/FooterLink';
import MobileStoreButton from 'react-mobile-store-button';
import StyledComponent, { MiniFooter } from './styled';
import Copyright from './styled/Copyright';
import { FormattedMessage, injectIntl } from 'react-intl';
import { ButtonGroup, Divider } from '@blueprintjs/core';
import imgFB from 'images/icons/fb.svg';
import imgTwit from 'images/icons/twit.svg';
import imgLinkedin from 'images/icons/linkedin.svg';
import messages from './messages';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSocialMedia } from '../Pages/selectors';
import get from 'lodash/get';
import { getValueSocialMedia } from '../../utils/utilHelper';
import env from 'env';
import Logo from '../Header/Logo';
import { routes } from '../Routes/routeHelper';


const COPYRIGHT = '2008 © Green Dragon International Logistics Corporation';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends React.Component {
  render() {
    const { mini, responsive, socialMedia } = this.props;

    if (mini) {
      return (
        <MiniFooter className={responsive ? 'responsive' : ''}>
          <div className="d-flex">
            <div className="copyright">
              {COPYRIGHT}
            </div>

            <Divider />

            <div className="flex-fill version">
              Ver #{env.VERSION}
            </div>
          </div>

          <div className="footer-links">
            <FooterLinkMinimal to={routes.RECRUITMENT}>
              <FormattedMessage {...messages.recruitment} />
            </FooterLinkMinimal>

            <FooterLinkMinimal to={'#'}>
              <FormattedMessage {...messages.help} />
            </FooterLinkMinimal>

            <FooterLinkMinimal to={routes.CONTACT}>
              <FormattedMessage {...messages.contact} />
            </FooterLinkMinimal>
          </div>
        </MiniFooter>
      );
    }

    return (
      <StyledComponent className={'mt-auto'}>
        <div className="footer-divider" />

        <div className="footer-content">
          <Container>
            <Row>
              <Col lg={6} md={12}>
                <Row>
                  <Col md={4} lg={5} xl={4}>
                    <FooterTitle className={'bp3-heading'}>
                      <FormattedMessage {...messages.section_policy} />
                    </FooterTitle>
                    <ul>
                      <li>
                        <FooterLink to={'/dieu-khoan-su-dung'}>
                          <FormattedMessage {...messages.terms_of_use} />
                        </FooterLink>
                      </li>
                      <li>
                        <FooterLink to={'chinh-sach-quyen-rieng-tu'}>
                          <FormattedMessage {...messages.privacy_policy} />
                        </FooterLink>
                      </li>
                      <li>
                        <FooterLink to={'/chinh-sach-dang-tin'}>
                          <FormattedMessage {...messages.posting_policy} />
                        </FooterLink>
                      </li>
                      <li>
                        <FooterLink to={'/chinh-sach-cookie'}>
                          <FormattedMessage {...messages.cookie_policy} />
                        </FooterLink>
                      </li>
                    </ul>
                  </Col>
                  <Col md={4} lg={3} xl={4}>
                    <FooterTitle className={'bp3-heading'}>
                      <FormattedMessage {...messages.section_partner} />
                    </FooterTitle>

                    <ul>
                      <li>
                        <FooterLink to={'/moi-hop-tac'}>
                          <FormattedMessage {...messages.corporation} />
                        </FooterLink>
                      </li>
                      <li>
                        <FooterLink to={'/ngan-hang'}>
                          <FormattedMessage {...messages.bank} />
                        </FooterLink>
                      </li>
                      <li>
                        <FooterLink to={'/nhan-vien-ngan-hang'}>
                          <FormattedMessage {...messages.banker} />
                        </FooterLink>
                      </li>
                      <li>
                        <FooterLink to={'/nha-quang-cao'}>
                          <FormattedMessage {...messages.advertiser} />
                        </FooterLink>
                      </li>
                    </ul>
                  </Col>

                  {/* Contact Mobile View */}
                  <Col md={5} className={'d-block d-lg-none'}>
                    <FooterTitle className={'bp3-heading'}>
                      <FormattedMessage {...messages.section_support} />
                    </FooterTitle>

                    <ButtonGroup className={'support-group'} vertical={false}>
                      <FooterLink to={'/tuyen-dung'}>
                        <FormattedMessage {...messages.recruitment} />
                      </FooterLink>

                      <Divider className="divider" />

                      <FooterLink to={routes.CONTACT}>
                        <FormattedMessage {...messages.contact} />
                      </FooterLink>
                    </ButtonGroup>
                  </Col>


                </Row>
              </Col>

              <Col lg={6} md={12}>
                <Row>
                  <Col>
                    <Divider className={'line d-none d-lg-block'} />
                  </Col>
                </Row>

                {/* Contact Laptop View */}
                <Row>
                  <Col md={5} lg={3} xl={5} className={'d-none d-lg-block'}>
                    <FooterTitle className={'bp3-heading'}>
                      <FormattedMessage {...messages.section_support} />
                    </FooterTitle>
                    <ButtonGroup className={'support-group'} vertical={false}>
                      <FooterLink to={'/tuyen-dung'}>
                        <FormattedMessage {...messages.recruitment} />
                      </FooterLink>

                      <Divider className={'divider'} />

                      <FooterLink to={routes.CONTACT}>
                        <FormattedMessage {...messages.contact} />
                      </FooterLink>
                    </ButtonGroup>
                  </Col>

                  <Col md={12} lg={9} xl={7} style={{ alignSelf: 'flex-end' }}>
                    <Copyright textAlign={'right'}>
                      {COPYRIGHT}
                    </Copyright>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </StyledComponent>
    );
  }
}

Footer.propTypes = {
  mini: PropTypes.bool,
  socialMedia: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  socialMedia: makeSelectSocialMedia(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(Footer);

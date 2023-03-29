import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import styled, { css } from 'styled-components';
import { Divider, Navbar } from '@blueprintjs/core';
import Dropdown from 'reactstrap/es/Dropdown';
import DropdownToggle from 'reactstrap/es/DropdownToggle';
import DropdownMenu from 'reactstrap/es/DropdownMenu';
import DropdownItem from 'reactstrap/es/DropdownItem';
import breakpoint from '../../../styles/breakpoint';
import Popup from '../../../components/common/Popup';
import Card from '../../../components/Card';
import isNil from 'lodash/isNil';
import { managementLinks, personalLinks } from '../../Routes/userRoutes';
import isEmpty from 'lodash/isEmpty';
import { getMessageByPathSegment } from '../../Routes/messages';
import { userPath } from '../../Routes/routeHelper';


const StyledComponent = styled.div`
  margin-left: 50px;

  a {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;

    img {
      height: 30px;
      margin-right: 10px;
    }

    &:not(:last-child) {
      margin-right: 50px;
    }
  }

  .dropdown{
    .dropdown-toggle{
      margin-right: 5px;

      border: none;
      background: none;
      color: ${(props) => props.theme.colors.green1000};
      outline: none!important;
      padding: 0;

      i {
        font-weight:400;
        font-size: 24px;
        line-height: 28px;
      }

      &:active, &:focus{
        outline:none;
        background:none;
        box-shadow:none!important;
        color: #d8d8d8;
      }

      &::after{
        display:none;
      }
    }

    .dropdown-menu{
      position: absolute;
      will-change: transform;
      top: 10px !important;
      border-radius: 0;
      padding: 5px 0;

      .dropdown-header{
        padding: 0;

        div {
          display: flex;
          align-items: center;

          margin: 0 20px;
          width: 100%;
          height: 50px;
          padding-right: 60px;
        }

        a {
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.58px;
          color: #000000;
        }

        div:not(.no-border-bottom) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
      }

      .bp3-divider {
        margin: 0;

        border-right: 1px solid #f5f5f5;
        border-bottom: 10px solid #f5f5f5;
      }
    }
  }

  @media (max-width: ${breakpoint.lg}) {
    margin-left: 0;
    order: 0;
  }

  ${(props) => props.fixedToTop ? css`
    a {
      color: #313131;
      opacity: 0.8;

      img {
        filter: brightness(0.5);
      }
    }
  ` : ''}
`;


class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      isOpenPopupDepositP2P: false,
    };
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  togglePopupDepositP2P = (isOpen = true) => {
    this.setState({ isOpenPopupDepositP2P: isOpen });
  }

  getManagementLinks = () => {
    const permissionFeature = [];
    const { userInfo } = this.props;

    if (isNil(userInfo)) {
      return [];
    }

    // new update
    return [];
  }

  render() {
    const { intl, fixedToTop } = this.props;
    const { isOpenPopupDepositP2P } = this.state;

    const menuItems = [

    ];

    const dashboardMenuItems = [
      ...this.getManagementLinks(),
    ];

    const isInManagement = new RegExp(`^${userPath.replace('/', '\/')}`).test(location.pathname);

    return (
      <StyledComponent fixedToTop={fixedToTop}>
        <div className="d-block d-lg-none">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              <i className="fas fa-bars" />
            </DropdownToggle>

            <DropdownMenu>
              {isInManagement && <React.Fragment>
                {dashboardMenuItems.map((item, index) => (
                  <DropdownItem header key={item.path}>
                    <Link
                      to={item.path ? `${item.path}` : '#'}
                      onClick={(e) => {
                        this.toggle();
                        if (item.onClick) {
                          item.onClick(e);
                        }
                      }}
                    >
                      <div className={index === dashboardMenuItems.length - 1 ? 'no-border-bottom' : ''}>
                        {intl.formatMessage(getMessageByPathSegment(item.name))}
                      </div>
                    </Link>
                  </DropdownItem>
                ))}
                <Divider />
              </React.Fragment>}
              {/* {menuItems.map((item, index) => (*/}
              {/* <DropdownItem header key={item.path}>*/}
              {/* <Link*/}
              {/* to={item.path ? `/${item.path}` : '#'}*/}
              {/* onClick={(e) => {*/}
              {/* this.toggle();*/}
              {/* if (item.onClick) item.onClick(e);*/}
              {/* }}*/}
              {/* >*/}
              {/* <div className={index === menuItems.length - 1 ? 'no-border-bottom' : ''}>*/}
              {/* {item.title}*/}
              {/* </div>*/}
              {/* </Link>*/}
              {/* </DropdownItem>*/}
              {/* ))}*/}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* <div className="d-none d-lg-block">*/}
        {/* <Navbar.Group>*/}
        {/* {menuItems.map((item) => (*/}
        {/* <NavLink*/}
        {/* key={item.path}*/}
        {/* to={item.path ? `/${item.path}` : '#'}*/}
        {/* onClick={item.onClick}*/}
        {/* >*/}
        {/* <img src={item.icon} alt={item.title} />*/}
        {/* <span>{item.title}</span>*/}
        {/* </NavLink>*/}
        {/* ))}*/}
        {/* </Navbar.Group>*/}
        {/* </div>*/}

        <Popup
          isOpen={isOpenPopupDepositP2P}
          onClose={() => this.togglePopupDepositP2P(false)}
          noPadding
        >
          <Card>
          </Card>
        </Popup>
      </StyledComponent>
    );
  }
}


export default injectIntl(HeaderMenu);

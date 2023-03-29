import React, { Fragment, PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { Button, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import { userPath, routes } from 'containers/Routes/routeHelper';
import messages from './messages';
import StyledSignInUpGroup from './styled/SignInUpGroup';
import { forwardTo } from '../../../utils/history';
import LoginButton from './styled/LoginButton';
import styled from 'styled-components';
import userProfileIcon from '../../../images/icons/AuthButton/userProfileIcon.svg';
import userProfileIconActive from '../../../images/icons/AuthButton/userProfileIconActive.svg';
import logoutIcon from '../../../images/icons/AuthButton/logoutIcon.svg';
import logoutIconActive from '../../../images/icons/AuthButton/logoutIconActive.svg';
import defaultAvatar from 'images/default-avatar.png';
import breakpoint from '../../../styles/breakpoint';

const MenuWrapper = styled(Menu)`
  padding: 0;
  
  .danger {
    color: #ff3a3a;
  }

  a {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  li {
    &:nth-child(odd) {
      background-color: #f5f5f5;
    }

    &:last-child {
      background-color: #f5f5f5;
    }
    
    .bp3-text-overflow-ellipsis.bp3-fill {
      margin-left: 25px;
    }
    
    .bp3-menu-item {    
      position: relative;
      
      img {  
        transition: 0.15s;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      
        &:not(.active){        
          opacity: 1;
        }
        
        &.active {
          opacity: 0;
        }
      }
  
      &:hover {
        img {
          &:not(.active){        
            opacity: 0;
          }
          
          &.active {
            opacity: 1;
          }
        }
      }
    }
  }
`;

const StyledComponent = styled.div`
  margin-left: 4px;
  
  @media (max-width: ${breakpoint.md}) {
    order: 4;
  }
`;

const UserProfileBtn = styled.div`
  display: flex;
  align-items: center;
  
  a {
    border-radius: 50%;
    overflow: hidden;
    
    img {
      height: 40px;
      width: 40px;
      object-fit: cover;
    }
  }
  
  @media (max-width: ${breakpoint.md}) {
  }
`;

class AuthButton extends PureComponent {
  getContentMenu = () => {
    const { logout, intl } = this.props;

    const profileNode = intl.formatMessage(messages.profile);
    const backToHomeNode = intl.formatMessage(messages.backToHome);
    const logoutNode = intl.formatMessage(messages.logout);

    const menuItems = [];

    const isInManagement = new RegExp(`^${userPath.replace('/', '\/')}`).test(location.pathname);
    if (isInManagement) {
      menuItems.push(
        {
          icon: userProfileIcon,
          activeIcon: userProfileIconActive,
          text: backToHomeNode,
          onClick: () => forwardTo(routes.HOME),
        },
      );
    } else {
      menuItems.push(
        {
          icon: userProfileIcon,
          activeIcon: userProfileIconActive,
          text: profileNode,
          onClick: () => forwardTo(routes.ACCOUNT_MGMT),
        },
      );
    }

    menuItems.push(
      {
        icon: logoutIcon,
        activeIcon: logoutIconActive,
        text: logoutNode,
        textClassName: 'danger',
        className: 'log-out-menu-item',
        onClick: logout,
      },
    );

    return (
      <MenuWrapper>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={<Fragment>
              <img src={item.icon} alt={''} />
              <img className="active" src={item.activeIcon} alt={''} />
            </Fragment>}
            className={item.className}
            text={item.text}
            textClassName={item.textClassName}
            onClick={item.onClick}
          />
        ))}
      </MenuWrapper>
    );
  };


  render() {
    const { userInfo, fixedToTop } = this.props;

    if (userInfo) {
      // Logged in already
      const targetPopover = (
        <UserProfileBtn>
          <a>
            <img
              src={userInfo.avatar || defaultAvatar}
              alt={'avatar'}
            />
          </a>
        </UserProfileBtn>
      );

      const authMenu = this.getContentMenu();

      return (
        <StyledComponent>
          <Popover content={authMenu} target={targetPopover} position={Position.BOTTOM} />
        </StyledComponent>
      );
    }

    return (
      <StyledSignInUpGroup fixedToTop={fixedToTop}>
        <Button className={'register d-none d-lg-inline'} onClick={() => forwardTo('/dang-ky')}>
          <FormattedMessage {...messages.signup} />
        </Button>
        {/*<LoginButton primary type="button" className={'login'} onClick={() => forwardTo('/dang-nhap')}>*/}
        <LoginButton primary type="button" className={'login'} onClick={() => forwardTo('/login')}>
          <FormattedMessage {...messages.signin} />
        </LoginButton>
      </StyledSignInUpGroup>
    );
  }
}

AuthButton.propTypes = {
  userInfo: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

export default injectIntl(AuthButton);

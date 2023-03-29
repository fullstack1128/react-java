import React, { Component } from 'react';
import { Divider, Navbar } from '@blueprintjs/core';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import WithHandlePromise from 'containers/WithHandlePromise';
import { userPath, routes } from 'containers/Routes/routeHelper';
import StyledComponent from './styled';
import history, { forwardTo } from 'utils/history';
import Dropdown from 'reactstrap/es/Dropdown';
import DropdownToggle from 'reactstrap/es/DropdownToggle';
import DropdownMenu from 'reactstrap/es/DropdownMenu';
import DropdownItem from 'reactstrap/es/DropdownItem';
import { Link, NavLink } from 'react-router-dom';
import { getNotification, readNotification } from 'services/admin/notification.service';
import { compose } from 'redux';
import _ from 'lodash';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      currentPath: history.location.pathname.split('/')[1],
      fixedToTop: false,
      notifications: [],
    };
    this.addClassActive = this.addClassActive.bind(this);
    this.handleMinimizeSidebar = this.handleMinimizeSidebar.bind(this);
  }

  componentDidMount() {
    history.listen((location, action) => {
      if (action === 'PUSH') {
        this.setState({
          currentPath: history.location.pathname.split('/')[1],
        });
      }
    });

    const self = this;
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        self.setState({ fixedToTop: true });
      } else {
        self.setState({ fixedToTop: false });
      }
    });

    const requestBody = {
      filtered: [
        { id: 'status', value: 0 },
      ],
      pageSize: 100,
      page: 0,
      sorted: [],
    };

    // this.props.handlePromise(getNotification(requestBody), (response) => {
    //   const { data } = response.data;
    //   this.setState({
    //     notifications: data,
    //   });
    // });
  }

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  addClassActive(path) {
    return this.state.currentPath === path ? 'active' : '';
  }

  handleMinimizeSidebar() {
    this.props.handleCollapse();
  }

  linkToDetail = (data) => {
    const requestBody = {
      id: data.id,
    };
    readNotification(requestBody);
    const { notifications } = this.state;
    _.remove(notifications, { id: data.id });
    this.setState({
      notifications,
    });
    this.toggle();
    this.props.updateHeaderName();
    forwardTo(data.link);
  }

  linkToNotification = () => {
    this.toggle();
    forwardTo(routes.NOTIFICATION);
  }

  render() {
    const { userInfo, headerName } = this.props;
    const { fixedToTop, notifications } = this.state;

    const isInManagement = new RegExp(`^${userPath.replace('/', '\/')}`).test(location.pathname);
    const isFixedToTop = fixedToTop || isInManagement;

    const notiData = notifications || [];
    return (
      <StyledComponent fixedToTop={isFixedToTop}>
        <Navbar fixedToTo className="justify-content-between">
          <div className="row">
            <div className={'col-12 d-flex align-items-center'}>
              <div className="order-1 order-lg-0">
                <div className="navbar-minimize d-flex align-items-center">
                  <button
                    id="minimizeSidebar"
                    className="btn btn-default btn-fill btn-round btn-icon sidebar-mini"
                    onClick={this.handleMinimizeSidebar}
                  >
                    <i className="fa fa-ellipsis-v visible-on-sidebar-regular" />
                    <i className="fa fa-navicon visible-on-sidebar-mini" />
                  </button>

                  <h5 className="ml-3 padding-top">{headerName || ''}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-3 margin-right notification">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                <a className="icon-bell" href={'#'}> <i className="fa fa-bell fa-30" /></a>
                {notiData.length > 0 ? <span className="counter" >{notiData.length}</span> : ''}
              </DropdownToggle>

              <DropdownMenu>
                <div className="header">{notiData.length} new announcement</div>
                <Divider />
                {notiData.map((item, index) => (
                  <React.Fragment>
                    <DropdownItem header key={item.link}>
                      <Link
                        to={item.link ? `/${item.link}` : '#'}
                        onClick={(e) => {
                          this.linkToDetail(item);
                        }}
                        className="item"
                      >
                        <div className="notify-body">
                          <div className="title">
                            {item.subject}
                          </div>
                          <div className="content">
                            {item.content}
                          </div>
                          <div className="date">
                            {item.createdAt}
                          </div>
                        </div>
                      </Link>
                    </DropdownItem>
                    <Divider />
                  </React.Fragment>
                ))}
                <div className="notify-footer">
                  <li >
                    <a href="#" onClick={this.linkToNotification}><span>View all</span></a>
                  </li>
                </div>
              </DropdownMenu>
            </Dropdown>

          </div>

        </Navbar>


      </StyledComponent>
    );
  }
}

Header.propTypes = {
  // loggedIn: PropTypes.bool,
  userInfo: PropTypes.object,
  logout: PropTypes.func.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};

export default compose(
  WithHandlePromise,
  injectIntl,
)(Header);

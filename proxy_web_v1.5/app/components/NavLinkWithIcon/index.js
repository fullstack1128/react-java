import React from 'react';
import PropTypes from 'prop-types';
import StyledNavLink from './StyledNavLink';
import ReactTooltip from 'react-tooltip';

// eslint-disable-next-line react/prefer-stateless-function
class NavLinkWithIcon extends React.Component {
  render() {
    let text;
    if (this.props.children) {
      text = this.props.children;
    } else if (this.props.text) {
      text = this.props.text;
    }

    return (
      <div>
        <StyledNavLink
          className={` ${this.props.isCollapse ? 'is-collapse' : ''}`}
          to={this.props.to}
          activeClassName="active"
          {...this.props}
          data-for={this.props.to}
          data-tip
        >
          <img
            src={this.props.icon}
            height={this.props.height}
            width={this.props.width}
            alt={'icon'}
          />
          {this.props.isCollapse ? (
            <ReactTooltip
              place="right"
              type="light"
              effect="solid"
              className="custom-tooltip"
              id={this.props.to}
            >
              <span>{text}</span>
            </ReactTooltip>
          ) : null}

          <span className={'label ml-2'}>{text}</span>
        </StyledNavLink>
      </div>
    );
  }
}

NavLinkWithIcon.propTypes = {
  // onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  // altIcon: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string.isRequired,
  isCollapse: PropTypes.bool,
};

export default NavLinkWithIcon;

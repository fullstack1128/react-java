import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import messages from './messages';
import CustomLink from 'components/CustomLink';
import breakpoint from '../../../../styles/breakpoint';


const StyledBlock = styled.div`
  border-radius: 10px;
  border: solid 1px #d8d8d8;
  overflow: hidden;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  
  .block {
    &__header {
      background-color: #f9f9f9;
      padding: 15px 40px;
      display: flex;
      align-items: center;
    }
    
    &__icon {
      margin-right: 15px;
    }
    
    &__title {
      font-size: 14px;
      font-weight: normal;
      color: black;
      opacity: 0.7;
    }
    
    &__image {
      img {
        height: 80px;
      }
    }
    
    &__value {
      font-size: 16px;
      color: black;
    }
    
    &__body {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding: 50px 50px 30px;
      flex-grow: 1;
      min-height: 230px;
    }
    
    &__button {
      margin-top: 50px;
    }
    
    &__content {
      width: 100%;
    }
  }
  
  @media (max-width: ${breakpoint.md}) {
    .block {
      &__header {
        padding: 10px 20px;
      }
      
      &__body {
        padding: 30px 20px 20px;
      }
    
      &__image {
        img {
          height: 100px;
        }
      }
    
      &__button {
        margin-top: 30px;
      }
    }
  }
`;


const Block = (props) => (
  <StyledBlock>
    <div className="block__header">
      <div className="block__icon">
        {props.icon && <img src={props.icon} alt={''} width="70px" height="70px" />}
      </div>

      <div className="d-flex flex-column">
        <div className="block__title">
          {props.title}
        </div>

        <div className="block__value">
          {props.value}
        </div>
      </div>
    </div>

    <div className="block__body">
      {props.image && <div className="block__image">
        <img src={props.image} alt={''} />
        </div>}

      {props.children && <div className="block__content">
          {props.children}
        </div>}

      {props.btnLink &&
      <div className="block__button">
        <CustomLink
          to={props.url || ''}
          onClick={props.onClick ? ((e) => {
            e.preventDefault();
            props.onClick();
          }) : undefined}
        >{props.btnText || props.intl.formatMessage(messages.changeBtn)}</CustomLink>
      </div>}
    </div>
  </StyledBlock>
  );

Block.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any,
  url: PropTypes.string,
  icon: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
  btnText: PropTypes.string,
};

export default injectIntl(Block);

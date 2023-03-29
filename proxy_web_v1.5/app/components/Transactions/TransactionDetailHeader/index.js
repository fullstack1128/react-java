import React from 'react';
import styled from 'styled-components';
import Type from 'components/Transactions/Type';
import * as PropTypes from 'prop-types';
import ButtonActionGroup from 'components/common/ButtonActionGroup';

const StyledHeaderWrapper = styled.div`
  padding: 20px 0;
  font-size: ${(props) => props.theme.fontSizes.normal};

  > div:nth-child(2) {
    padding: 10px 30px;
  }

  .back {
    a {
      &:before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-width: 2px 0 0 2px;
        border-color: #000000;
        border-style: solid;
        transform: rotate(-45deg);
      }
    }
  }

  .no {
    font-size: 40px;
    color: #000000;
    font-weight: 300;
  }
`;

class TransactionDetailHeader extends React.Component {
  render() {
    const { transaction, closeShowDetail, actions, isShowBack } = this.props;

    return (
      <StyledHeaderWrapper className="transaction__no">
        {
          isShowBack && <div className="back">
            <a
              role={'button'}
              tabIndex={-1}
              onClick={closeShowDetail}
            />
          </div>
        }

        <div className="d-flex align-items-center">
          <div className="flex-fill">
            <div className="no">{transaction.no}</div>
            <Type type={transaction.type} />
          </div>

          {
            (actions && (actions.length > 0)) &&
            (<ButtonActionGroup
              actions={actions}
              dropdownOptions={{
                minWidth: 160,
              }}
            />)
          }
        </div>
      </StyledHeaderWrapper>
    );
  }
}

TransactionDetailHeader.propTypes = {
  transaction: PropTypes.object,
  closeShowDetail: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      text: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
  isShowBack: PropTypes.bool,
};

TransactionDetailHeader.defaultProps = {
  isShowBack: true,
};


export default TransactionDetailHeader;

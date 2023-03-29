import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import * as PropTypes from 'prop-types';
import ETransactionType from 'enums/ETransactionType';
import { format } from 'utils/transactions/utils';
import { formatPercentageWithDecimals } from 'utils/numberHelper';
import { formatCurrency } from 'utils/transactions/currencies';
import Button from 'components/common/Button';
import Rating from 'components/common/Rating';
import Status from 'components/Transactions/Status';
import defaultAvatar from 'images/default-avatar.png';
import messages from './messages';
import WithChatLoader from 'containers/WithChatLoader';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import ChatMessageButton from 'components/ChatMessageButton';
import ETransactionStatus from '../../../enums/ETransactionStatus';
import get from 'lodash/get';
import { getLabelByType } from './utils';

const StyledDetailSummary = styled.div`
  padding: 0 30px;

  .separator {
    border-top: 1px solid ${(props) => props.theme.colors.gray300};
  }

  .col-user {
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border-left: 1px solid ${(props) => props.theme.colors.gray300};
    }
  }

  .details {
    font-weight: ${(props) => props.theme.fontWeights.strong300};

    >div {
      strong {
        font-weight: ${(props) => props.theme.fontWeights.strong500};
      }

      +div {
        margin-top: 8px;
      }
    }
  }

  .email {
    strong {
      color: #4a90e2
    }
  }

  .avatar {
    width: 70px;
    height: 70px;
    border: solid 1px #d8d8d8;
    border-radius: 50%;
    padding: 3.75px;

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }
  }

  .col-user {
    .full-name {
      word-break: break-word;
      font-size: 16px;
      &.link-to {
        color: ${(props) => props.theme.colors.blue500};
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }

    .role {
      font-size: 12px;
    }
  }

  .btn-action-update {
    height: 20px;
    min-height: 20px;
    line-height: 20px;
    border-radius: 10px;
    padding: 0 14px;
    font-size: 10px;
  }
`;

class TransactionDetailSummary extends React.Component {
  getDetailsView(displayDetails) {
    return (
      displayDetails.map(({ label, value, cssClass }) => (
        <div className={cssClass || ''}>
          {label}&#x0003A;&nbsp;
          <strong>{value}</strong>
        </div>
      ))
    );
  }

  getUserDetailsView(user) {
    const { intl } = this.props;

    return this.getDetailsView([
      {
        label: intl.formatMessage(messages.userIdNumber),
        value: user.id_number || user.idNumber || user.identityCard,
      },
      {
        label: intl.formatMessage(messages.userPhone),
        value: user.phone,
      },
      {
        label: intl.formatMessage(messages.userEmail),
        value: user.email,
        cssClass: 'email',
      },
      {
        label: intl.formatMessage(messages.userAddress),
        value: user.fullAddress,
      },
    ]);
  }

  getStaffDetailsView(staff) {
    const { intl } = this.props;

    return this.getDetailsView([
      {
        label: intl.formatMessage(messages.userIdNumber),
        value: staff.id_number || staff.identityCard,
      },
      {
        label: intl.formatMessage(messages.userPhone),
        value: staff.phone,
      },
      {
        label: intl.formatMessage(messages.userEmail),
        value: staff.email,
        cssClass: 'email',
      },
      {
        label: intl.formatMessage(messages.bankBranchName),
        value: staff.bankBranchName,
      },
    ]);
  }

  getUserFullName(user) {
    return (
      user.fullName ? user.fullName :
        user.name ? user.name :
          `${user.last_name ? user.last_name : user.lastName ? user.lastName : ''} ${user.first_name ? user.first_name : user.firstName ? user.firstName : ''}`
    );
  }

  getTransactionConnectedSummary = () => {
    const { transaction, intl } = this.props;
    if (transaction) {
      const { transactionConnected } = transaction;
      const {
        displayDesiredAmount,
        displayRateRange,
        displayDuration,
      } = format(intl, transactionConnected);

      return [
        {
          label: `${intl.formatMessage(messages.transaction)} ${intl.formatMessage(transactionConnected.type === ETransactionType.BORROWING_P2P ? messages.borrowing : messages.lending)}`,
          value: transactionConnected.no,
        },
        {
          label: intl.formatMessage(transactionConnected.type === ETransactionType.BORROWING_P2P ? messages.desiredAmount : messages.desiredAmountLending),
          value: displayDesiredAmount || formatCurrency(transactionConnected.desiredAmount),
        },
        {
          label: `${intl.formatMessage(messages.rate)} ${intl.formatMessage(transactionConnected.type === ETransactionType.BORROWING_P2P ? messages.borrowing : messages.lending)}`,
          value: displayRateRange,
        },
        {
          label: `${intl.formatMessage(messages.duration)} ${intl.formatMessage(transactionConnected.type === ETransactionType.BORROWING_P2P ? messages.borrowing : messages.lending)}`,
          value: displayDuration || (transactionConnected.isShortTermDeposit ? intl.formatMessage(messages.shortTerm) : `${transactionConnected.duration || ''} ${intl.formatMessage(messages.month)}`),
        },
        {
          label: `${intl.formatMessage(messages.province)} ${intl.formatMessage(transactionConnected.type === ETransactionType.BORROWING_P2P ? messages.borrowing : messages.lending)}`,
          value: transactionConnected.province,
        },
        {
          label: intl.formatMessage(messages.status),
          value: <Status status={transactionConnected.status} />,
        },
      ];
    }

    return [];
  };

  render() {
    const {
      intl,
      transaction,
      isCanEdit,
      isHideUserSummary,
      handleUpdatePackage,
      handleUpdateClient,
      toggleChatPopup,
    } = this.props;

    const {
      displayDesiredAmount,
      displayRate,
      displayRateRange,
      displayStatus,
      displayDuration,
      displayPaymentSchedule,
      displayPaymentMethod,
      displayTimeReceiveInterest,
    } = format(intl, transaction);

    const { user, staff, transactionConnected } = transaction;

    const isP2P = transaction.type === ETransactionType.BORROWING_P2P || transaction.type === ETransactionType.LENDING_P2P;
    const colSize = (isP2P && !!user) ? 6 : 4;
    const p2pPartner = get(transactionConnected, 'user');

    const commonDetails = [
      {
        label: getLabelByType(intl, transaction.type, 'desiredAmount'),
        value: displayDesiredAmount || formatCurrency(transaction.desiredAmount),
      },
      {
        label: intl.formatMessage(messages.rate),
        value: displayRate || (
          `${formatPercentageWithDecimals(transaction.rate)} / ${intl.formatMessage(messages.year)}${displayRateTo}${transaction.rateTo ? ` - ${formatPercentageWithDecimals(transaction.rateTo)}/${intl.formatMessage(messages.year)}` : ''}`
        ),
      },
      {
        label: intl.formatMessage(messages.status),
        value: <Status status={transaction.status} />,
      },
      {
        label: intl.formatMessage(messages.duration),
        value: displayDuration || (transaction.isShortTermDeposit ? intl.formatMessage(messages.shortTerm) : `${transaction.duration || ''} ${intl.formatMessage(messages.month)}`),
      },
      {
        label: intl.formatMessage(messages.province),
        value: get(transaction, 'transactionProvince') || '',
      },
    ];

    const transactionSummaries = (transaction.type === ETransactionType.LOAN) ? [
      ...(
          transaction.purpose ?
          [{
            label: intl.formatMessage(messages.purposeBorrowing),
            value: transaction.purpose,
          }] :
            []
        ),
      ...(
          transaction.packageName ?
          [{
            label: intl.formatMessage(messages.packageName),
            value: transaction.packageName,
          }] :
            []
        ),
      ...commonDetails,
      ...(
          displayPaymentSchedule ?
          [{
            label: intl.formatMessage(messages.paymentSchedule),
            value: displayPaymentSchedule,
          }] :
            []
        ),
      ...(
          displayPaymentMethod ?
          [{
            label: intl.formatMessage(messages.paymentMethod),
            value: displayPaymentMethod,
          }] :
            []
        ),
    ] :
      (transaction.type === ETransactionType.SAVING_DEPOSIT) ?
      [
        ...(
            transaction.bank ?
            [{
              label: intl.formatMessage(messages.bank),
              value: transaction.bank ? transaction.bank.name : '',
            }] :
              []
          ),
        ...(
          transaction.packageName ?
          [{
            label: intl.formatMessage(messages.savingDepositPackageName),
            value: transaction.packageName,
          }] :
            []
        ),
        ...commonDetails,
        {
          label: intl.formatMessage(messages.timeReceiveInterest),
          value: displayTimeReceiveInterest,
        },
      ] :
        (isP2P) ?
        [
          {
            label: intl.formatMessage(transaction.type === ETransactionType.BORROWING_P2P ? messages.lendingConnected : messages.borrowingConnected),
            value: (
              transaction.transactionConnected ?
              transaction.transactionConnected.no :
              intl.formatMessage(messages.notConnected)
            ),
          },
          {
            label: intl.formatMessage(transaction.type === ETransactionType.BORROWING_P2P ? messages.desiredAmount : messages.desiredAmountLending),
            value: (displayDesiredAmount || formatCurrency(transaction.desiredAmount)) || (displayDesiredAmount || formatCurrency(transaction.desiredAmountLending)),
          },
          {
            label: intl.formatMessage(transaction.type === ETransactionType.BORROWING_P2P ? messages.rate : messages.rateLending),
            value: displayRateRange,
          },
          {
            label: intl.formatMessage(transaction.type === ETransactionType.BORROWING_P2P ? messages.duration : messages.durationLending),
            value: displayDuration || (transaction.isShortTermDeposit ? intl.formatMessage(messages.shortTerm) : `${transaction.duration || ''} ${intl.formatMessage(messages.month)}`),
          },
          {
            label: intl.formatMessage(transaction.type === ETransactionType.BORROWING_P2P ? messages.province : messages.provinceLending),
            value: transaction.province || transaction.provinceLending,
          },
          {
            label: intl.formatMessage(transaction.type === ETransactionType.BORROWING_P2P ? messages.purposeBorrowing : messages.purposeLending),
            value: transaction.purpose,
          },
          {
            label: intl.formatMessage(messages.status),
            value: <Status status={transaction.status} />,
          },
        ] :
          commonDetails;

    const userSummaries = [];

    if (user) {
      userSummaries.push({
        user,
        label: (
          transaction.type === ETransactionType.BORROWING_P2P ?
          intl.formatMessage(messages.borrowerInfo) :
          transaction.type === ETransactionType.LENDING_P2P ?
          intl.formatMessage(messages.lenderInfo) :
          intl.formatMessage(messages.client)
        ),
        isStaff: user ? user.isStaff : false,
        isChat: user ? user.enableChat : false,
      });
    }

    if (staff) {
      userSummaries.push({
        user: staff,
        label: intl.formatMessage(messages.positionStaff),
        isStaff: staff ? staff.isStaff : false,
        isChat: staff ? staff.enableChat : false,
      });
    }
    return (
      <StyledDetailSummary>
        <Row>
          <Col xs="12"><div className="separator"></div></Col>
          <Col className="pt-4 pb-2" {...(isP2P ? { md: colSize } : {})}>
            <div className="d-flex flex-column h-100">
              <div className="flex-fill details">
                {this.getDetailsView(transactionSummaries)}
              </div>

              {
                get(user, 'isCanEdit') &&
                handleUpdatePackage &&
                <div className="text-right">
                  <Button
                    primary
                    role={'button'}
                    className="btn-action-update"
                    onClick={handleUpdatePackage}
                  >
                    {intl.formatMessage(messages.actionUpdateUser)}
                  </Button>
                </div>
              }
            </div>
          </Col>

          {userSummaries.map(({ user, label, isStaff, isChat }) => (
            !user ?
              '' :
              (<Col md={colSize} className="pt-4 pb-2 col-user">
                <div className="d-flex flex-column h-100">
                  <div className="flex-fill user">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <div className="avatar"><img src={user.avatar || defaultAvatar} /></div>
                      </Col>

                      <Col>
                        <div
                          className={`full-name ${user.handleLinkTo ? 'link-to' : ''}`}
                          onClick={user.handleLinkTo}
                        >{this.getUserFullName(user)}</div>
                        <Rating
                          readonly
                          initialRating={user.reviewRating || user.star}
                          heightSymbol={10}
                          widthSymbol={10}
                        />
                        <div className="role">{label}</div>
                        {isChat && <div className="chat"><ChatMessageButton
                          handleChat={() => toggleChatPopup(user.id, transaction.id)}
                        /></div>}
                      </Col>
                    </Row>

                    <div className="mt-4 details">
                      {user ? (isStaff ? this.getStaffDetailsView(user) : this.getUserDetailsView(user)) : []}
                    </div>
                  </div>

                  {
                    user.isCanEdit && user.handleEdit &&
                    <div className="text-right">
                      <Button
                        primary
                        role={'button'}
                        className="btn-action-update"
                        onClick={user.handleEdit}
                      >
                        {intl.formatMessage(messages.actionUpdateUser)}
                      </Button>
                    </div>
                  }
                  {
                    user.isCanView && user.handleView &&
                    <div className="text-right">
                      <Button
                        primary
                        role={'button'}
                        className="btn-action-update"
                        onClick={user.handleView}
                      >
                        {intl.formatMessage(messages.actionViewUser)}
                      </Button>
                    </div>
                  }
                </div>
              </Col>)
          ))}

          {
            transactionConnected &&
            (<React.Fragment>
              {user && p2pPartner && <Col xs="12"><div className="separator"></div></Col>}
              <Col md={colSize} className={`pt-4 pb-2 ${(!user || !p2pPartner) ? 'col-user' : ''}`}>
                <div className="d-flex flex-column h-100">
                  <div className="flex-fill details">
                    {this.getDetailsView(this.getTransactionConnectedSummary())}
                  </div>

                  {
                    get(p2pPartner, 'isCanEdit') &&
                    handleUpdatePackage &&
                    <div className="text-right">
                      <Button
                        primary
                        role={'button'}
                        className="btn-action-update"
                        onClick={handleUpdatePackage}
                      >
                        {intl.formatMessage(messages.actionUpdateUser)}
                      </Button>
                    </div>
                  }
                </div>
              </Col>

              {
                p2pPartner &&
                (<Col md={colSize} className="pt-4 pb-2 col-user">
                  <div className="d-flex flex-column h-100">
                    <div className="flex-fill user">
                      <Row className="align-items-center">
                        <Col xs="auto">
                          <div className="avatar"><img src={p2pPartner.avatar || defaultAvatar} /></div>
                        </Col>

                        <Col>
                          <div
                            className={`full-name ${p2pPartner.handleLinkTo ? 'link-to' : ''}`}
                            onClick={p2pPartner.handleLinkTo}
                          >{this.getUserFullName(p2pPartner)}</div>
                          <Rating
                            readonly
                            initialRating={p2pPartner.reviewRating || p2pPartner.star}
                            heightSymbol={10}
                            widthSymbol={10}
                          />
                          <div className="role">
                            {
                              transactionConnected.type === ETransactionType.BORROWING_P2P ?
                              intl.formatMessage(messages.borrowerInfo) :
                              transactionConnected.type === ETransactionType.LENDING_P2P ?
                              intl.formatMessage(messages.lenderInfo) :
                              ''
                            }
                          </div>
                          {p2pPartner.enableChat && <div className="chat"><ChatMessageButton
                            handleChat={() => toggleChatPopup(p2pPartner.id, transaction.id)}
                          /></div>}
                        </Col>
                      </Row>

                      <div className="mt-4 details">
                        {!p2pPartner.isHideDetail && this.getUserDetailsView(p2pPartner)}
                      </div>
                    </div>

                    {
                      p2pPartner.isCanEdit && p2pPartner.handleEdit &&
                      <div className="text-right">
                        <Button
                          primary
                          role={'button'}
                          className="btn-action-update"
                          onClick={p2pPartner.handleEdit}
                        >
                          {intl.formatMessage(messages.actionUpdateUser)}
                        </Button>
                      </div>
                    }
                    {
                      p2pPartner.isCanView && p2pPartner.handleView &&
                      <div className="text-right">
                        <Button
                          primary
                          role={'button'}
                          className="btn-action-update"
                          onClick={p2pPartner.handleView}
                        >
                          {intl.formatMessage(messages.actionViewUser)}
                        </Button>
                      </div>
                    }
                  </div>
                </Col>)
              }
            </React.Fragment>)
          }
        </Row>
      </StyledDetailSummary>
    );
  }
}

TransactionDetailSummary.propTypes = {
  intl: PropTypes.object,
  transaction: PropTypes.object,
};


export default compose(
  WithChatLoader,
  injectIntl,
)(TransactionDetailSummary);

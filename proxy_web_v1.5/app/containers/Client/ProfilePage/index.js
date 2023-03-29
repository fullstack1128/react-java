import React, { Fragment } from 'react';
import { compose } from 'redux';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import { injectIntl } from 'react-intl';
import messages from './messages';
import Block from './Block';
import imgChangePass from 'images/formIcon/createPassword.svg';
import iconRegister from 'images/formIcon/changeAvatarIcon.svg';
import iconChangePass from 'images/formIcon/mbri-unlock.svg';
import Container from 'reactstrap/es/Container';
import Card from 'components/Card';
import styled from 'styled-components';
import { getUserBalance, changeReminder } from 'services/user.service';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import { routes } from '../../Routes/routeHelper';
import { formatCurrency } from 'utils/numberHelper';
import CustomLink from 'components/CustomLink';

const StyledComponent = styled.div`
  table {
        .title {
            width: 60%;
            font-size: 16px;
            font-weight: bold;
            text-align: right;
        }
        .content {
            font-weight: 400;
            padding-top: 5px;
            padding-left: 10px;
            font-size: 16px;
         }
   }
     
  .row {
    max-width: 860px;
    margin: 0 auto;
  }
`;


export class AccountManagementPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: '',
        userName: '',
        email: '',
        balance: 0,
        uuid: '',
        reminder: 1,
      },
    };
  }

  componentWillMount() {
    this.props.handlePromise(getUserBalance(), (response) => {
      this.setState({
        userInfo: {
          ...response,
        },
      });
    });
  }

  handleChangeReminder = async () => {
    this.props.handlePromise(changeReminder(), (response) => {
      this.setState({
        userInfo: {
          ...response,
        },
      });
    });

    this.props.handleAlertSuccess('Update successfully!!!');
  }


  render() {
    const { intl } = this.props;
    const { userInfo } = this.state;

    return (
      <StyledComponent>
        <Container>
          <Card>
            <Row>
              <Col md={6}>
                <Block
                  title={'Account Information'}
                  icon={iconRegister}
                >
                  <table className="information">
                    <tr>
                      <td className="title">Username:</td>
                      <td className="content">{userInfo.userName}</td>
                    </tr>
                    <tr>
                      <td className="title">Name:</td>
                      <td className="content">{userInfo.name}</td>
                    </tr>
                    <tr>
                      <td className="title">Email:</td>
                      <td className="content">{userInfo.email}</td>
                    </tr>
                    <tr>
                      <td className="title">Address:</td>
                      <td className="content">{userInfo.address}</td>
                    </tr>
                    <tr>
                      <td className="title">City:</td>
                      <td className="content">{userInfo.city}</td>
                    </tr>
                    <tr>
                      <td className="title">Country:</td>
                      <td className="content">{userInfo.country}</td>
                    </tr>
                    <tr>
                      <td className="title">Balance:</td>
                      <td className="content"><b>{formatCurrency(userInfo.balance)}USD</b></td>
                    </tr>
                    <tr>
                      <td className="title">Reminder Email:</td>
                      <td className="content"> <b>{userInfo.reminder === 1 ? <span style={{ color: 'GREEN' }}>ON</span> : 'OFF'}</b><CustomLink
                        className="ml-4"
                        to={''}
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleChangeReminder();
                        }}
                      >Change</CustomLink>
                      </td>
                    </tr>
                  </table>
                </Block>
              </Col>

              <Col md={6}>
                <Block
                  title={'Password'}
                  value={
                    <Fragment>&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</Fragment>
                  }
                  image={imgChangePass}
                  url={routes.CHANGE_PASSWORD}
                  icon={iconChangePass}
                  btnLink
                />
              </Col>
            </Row>
          </Card>
        </Container>
      </StyledComponent>
    );
  }
}


export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(AccountManagementPage);

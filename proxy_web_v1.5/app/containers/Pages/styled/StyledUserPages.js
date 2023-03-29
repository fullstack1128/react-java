import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';
import logo from '../../../images/logo.png';

export default styled.div`
  background: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .page-content {
    display: flex;
    flex-grow: 1;

    .sidebar {
      background-image: linear-gradient(176deg, #618fb6, #1b385f);
      &:not(.is-collapse) {
        max-width: 222px;
        min-width: 222px;
      }

      .user-info {
        background-color: transparent;
        border-bottom: 2px solid #ccc!important;
        display: flex;
        position: relative;

        .avatar {
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #f4f4f4;
          margin: 7px;
          height: 50px;
          width: 50px;
          flex: none;
          background-image: url(${logo});
          background-size: 100%;
          background-repeat: no-repeat;

          .upload-container {
            position: relative;
            img {
              height: 72px;
              width: 72px;
              object-fit: cover;
              position: absolute;
            }
            .bp3-label {
              display: none;
            }
          }
        }

        .detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 10px;
          overflow: hidden;

          .name {
            font-size: 14px;
            font-weight: bold;
            color: white;
            word-break: break-word;
          }

          .type {
            font-size: 14px;
            font-weight: 500;
            color: white;
            word-break: break-word;
          }

          .email {
            font-size: 12px;
            font-weight: 700;
            color: white;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }

        .collapse-button {
          margin-left: auto;
          padding: 15px;
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          height: 100%;
          background-color: #32353a;
          transition: 0.3s;

          i.fa {
            color: white;
            font-size: 16px;
          }

          &:hover {
            i.fa {
              opacity: 0.6;
            }
          }
        }
      }

      .menu-group {
        // padding: 5px 0;

        .menu-group-title {
          padding-left: 40px;
          font-size: 13px;
          font-weight: 300;
          opacity: 0.5;
          color: white;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
      }
    }

    & > .content {
      flex-grow: 1;
      position: relative;
      overflow: hidden;
      background-image: linear-gradient(116deg, #e7f5f4, #f9f0ea 50%, #fceeee);

      & > .mini-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 -2px 4px ${(props) => props.theme.colors.black10};
        z-index: 1;
      }

      & > .body {
        position: relative;
        top: 0;
        bottom: 50px;
        left: 0;
        right: 0;
        overflow: auto;

        & > .body-content {
          padding: 9px 0px;
        }
      }
    }
  }

  @media (max-width: ${breakpoint.md}) {
    .page-content {
      flex-direction: column;

      .sidebar {
        width: 100%;
        min-width: 100% !important;
        max-width: 100% !important;
        padding: 0;

        .user-info {
          .collapse-button {
            i.fa {
              transform: rotate(90deg);
            }
          }
        }

        .menu {
          position: absolute;
          width: 100%;
          background-color: #1a2f23;
          z-index: 99;
        }

        &.is-collapse {
          padding-bottom: 0;

          .user-info {
            .collapse-button {
              i.fa {
                transform: rotate(270deg);
              }
            }
          }

          .menu {
            display: none;
          }
        }
      }
    }
  }

  @media (min-width: ${breakpoint.md}) {
    .page-content {
      .sidebar {
        &.is-collapse {
          width: 60px;

          .user-info {
            .collapse-button {
              i.fa {
                transform: rotate(180deg);
              }
            }

            .detail {
              display: none;
            }

            .avatar {
              margin-left: 5px;
            }

            .collapse-button {
              opacity: 0;

              &:hover {
                opacity: 0.6;

                i.fa {
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  }
`;

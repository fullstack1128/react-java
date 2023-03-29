import styled from 'styled-components';


export default styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 350px);
  font-size: ${(props) => props.theme.fontSizes.small};

  .header {
    background-color: ${(props) => props.theme.colors.green100};
    padding: 10px 20px;
    justify-content: space-between;
    height: 80px;

    &__info, &__rate, &__amount, &__review {
      display: flex;
      height: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      align-items: flex-start;
    }

    &__avatar {
      margin-right: 10px;

      img {
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid ${(props) => props.theme.colors.gray300};
      }
    }

    &__name {
      opacity: 0.5;
      font-weight: ${(props) => props.theme.fontWeights.strong300};
    }

    &__package-name {
      font-weight: ${(props) => props.theme.fontWeights.strong500};
    }

    &__rate, &__amount {
      justify-content: center;
      flex-direction: column;

      &__title {
        opacity: 0.5;
        font-weight: ${(props) => props.theme.fontWeights.strong300};
      }

      &__value {
        opacity: 0.9;
        font-weight: ${(props) => props.theme.fontWeights.strong300};
      }
    }

    &__divider {
      height: 20px;
      width: 1px;
      opacity: 0.43;
      background-color: ${(props) => props.theme.colors.black};
    }
  }

  .body {
    flex-grow: 1;
    background-color: rgba(237, 237, 224, 0.2);
    overflow: hidden;
    
    .list-chat {
      height: 100%;
      padding-bottom: 60px;
    }
    
    .footer-chat {
      .page-text-box {    
        max-height: 200px;
      }
    }
  }
`;

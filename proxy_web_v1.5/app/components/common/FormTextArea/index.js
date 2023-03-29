import React from 'react';
import { TextArea } from '@blueprintjs/core';
import styled from 'styled-components';

import ErrorMessage from 'components/common/ErrorMessage';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { focusControl } from '../../../styles/commonCss';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import { Scrollbars } from 'react-custom-scrollbars';

const textAreaPaddingY = 10;

const StyledContainer = styled(FormGroup)`
  width: 100%;
  
  .scrollbar {
    min-height: 40px;
    font-size: 14px !important;
    border-radius: 6px;
    box-shadow: none;
    border: solid 0.5px #d8d8d8;

    .bp3-input {
      overflow: hidden;
      box-shadow: none;
      border: none;
    }

    &.focused {
      ${focusControl}
    }
  }

  .label {
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.black900};
    margin-bottom: 5px;
    min-height: 24px;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .bp3-input {
    font-size: ${(props) => props.theme.fontSizes.small};
    // padding: ${textAreaPaddingY}px 20px;
    resize: none;

    &:focus {
      ${focusControl}
    }
  }
`;

class FormTextArea extends React.Component {
  subscriptions = [];

  componentWillUnmount() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  render() {
    const { label, name, isRequired, intl, placeholder, width, height, rows, isAsterisk, className, ...rest } = this.props;
    const lineHeight = 21;
    const scrollbarHeight = (rows * lineHeight) + (textAreaPaddingY * 2);
    const textAreaContainer = React.createRef();

    const handleTextAreaRef = (textArea) => {
      const updateTextAreaHeight = () => {
        setTimeout(() => {
          textArea.style.cssText = 'height:auto;';
          const textAreaHeight = textArea.scrollHeight > scrollbarHeight ? textArea.scrollHeight : scrollbarHeight;
          textArea.style.cssText = `height:${textAreaHeight}px`;
          if (textAreaContainer.current) { textAreaContainer.current.style.cssText = `height:${textAreaHeight}px`; }
          if (this.scrollbars) { this.scrollbars.update(); }
        }, 0);
      };

      if (textArea) {
        updateTextAreaHeight();
        window.addEventListener('resize', updateTextAreaHeight);

        this.subscriptions.push({
          unsubscribe: () => {
            window.removeEventListener('resize', updateTextAreaHeight);
          },
        });

        textArea.keydown = () => {
          updateTextAreaHeight();
        };

        textArea.onfocus = () => {
          this.scrollbars.container.classList.add('focused');
        };

        textArea.onblur = () => {
          this.scrollbars.container.classList.remove('focused');
        };
      }
    };

    return (
      <StyledContainer>
        {label && (
        <FormLabel isAsterisk={isAsterisk}>{label} {!isRequired && `(${intl.formatMessage(messages.optional)})`}</FormLabel>
          ) }

        <Scrollbars
          autoHide={false}
          style={{ height: scrollbarHeight, width: width || '100%' }}
          onScroll={this.handleScroll}
          innerRef={(node) => (this.scroll = node)}
          ref={((scrollbars) => this.scrollbars = scrollbars)}
          className="scrollbar"
        >
          <div className="textarea-container" ref={textAreaContainer}>
            <TextArea
              fill
              large
              name={name}
              placeholder={isEmpty(placeholder) ? `${intl.formatMessage(messages.inputMessage)} ${(label || '').toLowerCase()}` : placeholder}
              inputRef={handleTextAreaRef}
              {...rest}
            />
          </div>
        </Scrollbars>

        <ErrorMessage name={name} />
      </StyledContainer>
    );
  }
}

FormTextArea.defaultProps = {
  isRequired: true,
};

export default injectIntl(FormTextArea);

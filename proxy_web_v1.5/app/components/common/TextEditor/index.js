import React from 'react';
import styled, { css } from 'styled-components';
import ErrorMessage from 'components/common/ErrorMessage';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import { Editor } from '@tinymce/tinymce-react';
import env from 'env';

const TINYMCE_KEY = env.TINYMCE_KEY;

const StyledContainer = styled(FormGroup)`    
  .label-group {
    position: relative;
    
    .label {
      width: max-content;          
    }
  }   
`;

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: Math.random(),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ key: Math.random() });
    }, 50);
  }

  handleEditorChange = (e) => {
    const { name, setFieldValue } = this.props;
    setFieldValue(name, e.target.getContent());
  };

  render() {
    const { label, name, isRequired, isAsterisk, intl, initialValue, height, ...rest } = this.props;

    return (
      <StyledContainer>
        <div className={'label-group d-flex'}>
          <FormLabel
            className="label"
            isAsterisk={isAsterisk}
          >{label} {!isRequired && `(${intl.formatMessage(messages.optional)})`} </FormLabel>
        </div>
        <div className="d-flex align-items-center">
          <Editor
            key={this.state.key}
            initialValue={initialValue}
            init={{
              plugins: 'link image code',
              toolbar: 'undo redo |bold italic | alignleft aligncenter alignright | code',
              selector: 'textarea',
              height: height || 700,
              width: '100%',
            }}
            apiKey={TINYMCE_KEY}
            onChange={this.handleEditorChange}
          />
        </div>

        <ErrorMessage name={name} />
      </StyledContainer>
    );
  }

}

TextEditor.defaultProps = {
  isRequired: true,
  isAsterisk: false,
};

export default injectIntl(TextEditor);

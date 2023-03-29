import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import max from 'lodash/max';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import styled from 'styled-components';

const Wrapper = styled(LinesEllipsis)`
  .read-more {
    color: ${(props) => props.theme.colors.blue400} !important;
  }
`;

class TextTruncate extends React.PureComponent {
  state = {
    maxLineDefault: 1,
  }

  handleReadMore = () => {
    this.setState({ maxLineDefault: 999 });
  }

  render() {
    const { maxLineDefault } = this.state;
    const { text, maxLine = 1, isReadMore = false, intl } = this.props;

    return (
      <Wrapper
        text={text || ''}
        title={text || ''}
        maxLine={max([maxLine, maxLineDefault])}
        ellipsis={!isReadMore ? '...' : <span>... <a onClick={this.handleReadMore} className="read-more">{intl.formatMessage(messages.readMore)}</a></span>}
        trimRight
        basedOn="words"
      >
      </Wrapper>
    );
  }
}

export default injectIntl(TextTruncate);

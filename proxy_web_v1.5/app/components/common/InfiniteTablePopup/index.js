import React from 'react';
import { injectIntl } from 'react-intl';
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Scrollbar from 'components/common/Scrollbar';

import { Content, StyledItem, StyledContainer } from './styles';
import messages from './messages';

const DEFAULT_BATCH_SIZE = 11;

class InfiniteTablePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowCount: DEFAULT_BATCH_SIZE,
      isFetching: false,
      itemList: [],
    };
  }

  isRowLoaded = ({ index }) => !!this.state.itemList[index]

  finishFetching = () => {
    this.setState({
      isFetching: false,
      rowCount: this.state.itemList.length,
    });
  }

  continuousFetching = () => {
    this.setState({
      isFetching: false,
      rowCount: this.state.itemList.length + DEFAULT_BATCH_SIZE,
    });
  }

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const { isFetching } = this.state;
    const { getItemsFn } = this.props;

    if (isFetching) return;

    this.setState({ isFetching: true });

    const response = await getItemsFn({
      startIndex,
      stopIndex,
    });

    let items;
    const count = response.count;

    // need to capture the right data list
    // since it could be branchList, packageList,...
    Object.keys(response).forEach((key) => {
      if (Array.isArray(response[key])) {
        items = response[key];
      }
    });

    let { itemList } = this.state;
    itemList = itemList.concat(items);

    this.setState({
      itemList,
    });

    if (count === 0 || itemList.length === count) {
      this.finishFetching();
    } else {
      this.continuousFetching();
    }
  }

  handleSelectItem = (item) => {
    const { handleDoubleClickFn } = this.props;
    if (handleDoubleClickFn) {
      return () => {
        handleDoubleClickFn(item);
      };
    }
    return null;
  }

  rowRenderer = ({
    key,
    index,
    style,
  }) => {
    const { itemContentRenderFn } = this.props;
    const item = this.state.itemList[index];

    if (!item) return null;

    return (
      <StyledItem
        style={style}
        key={`${item.id} ${key}`}
        onDoubleClick={this.handleSelectItem(item)}
      >
        {itemContentRenderFn(item)}
      </StyledItem>
    );
  }

  handleScroll = (e) => {
    if (this.list) {
      // eslint-disable-next-line no-underscore-dangle
      this.list.Grid._onScroll(e);
    }
  }

  componentDidUpdate() {
    if (this.list) {
        // eslint-disable-next-line no-underscore-dangle
      this.list.Grid._scrollingContainer = this.scroll.view;
    }
  }

  render() {
    const self = this;
    const { rowCount, itemList } = self.state;
    const {
      intl,
      headerContent,
    } = self.props;

    const bNoResult = itemList.length === 0;

    // if (!isOpen) return null;

    return (
      <StyledContainer>

        <div className="body-container">
          <Content pose={'open'}>
            <div className="result-container">
              <div className="result-container__header">
                {headerContent.props.children}
              </div>
              <div className={`result-container__list ${bNoResult ? 'no-result' : ''}`} >
                { bNoResult && <div className="text-center mt-5 notify">{intl.formatMessage(messages.noResult)}</div> }
                <InfiniteLoader
                  // key={Math.random()}
                  isRowLoaded={self.isRowLoaded}
                  loadMoreRows={self.loadMoreRows}
                  rowCount={rowCount}
                  minimumBatchSize={DEFAULT_BATCH_SIZE}
                >
                  {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                      {({ height, width }) => (
                        <Scrollbar
                          autoHide={false}
                          style={{ height, width }}
                          onScroll={this.handleScroll}
                          innerRef={(node) => (this.scroll = node)}
                        >
                          <List
                            onRowsRendered={onRowsRendered}
                            width={width}
                            height={height}
                            rowHeight={40}
                            rowCount={rowCount}
                            rowRenderer={self.rowRenderer}
                            ref={(node) => {
                              self.list = node;
                              return registerChild;
                            }}
                            style={{ overflowX: 'visible', overflowY: 'visible' }}
                            onClick={self.rowRenderer}
                          />
                        </Scrollbar>
                          )}
                    </AutoSizer>
                      )}
                </InfiniteLoader>
              </div>
            </div>
          </Content>
        </div>
      </StyledContainer>
    );
  }
}


InfiniteTablePopup.propTypes = {
  getItemsFn: PropTypes.func.isRequired, // func return Object { rows: Array, count: Number }
  handleDoubleClickFn: PropTypes.func.isRequired,
};


export default injectIntl(InfiniteTablePopup);

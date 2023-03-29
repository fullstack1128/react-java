import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Input } from 'reactstrap';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import isEmpty from 'lodash/isEmpty';
import * as PropTypes from 'prop-types';
import Scrollbar from 'components/common/Scrollbar';
import Button from 'components/common/Button';
import { Content, StyledContainer, StyledDialog, StyledItem, StyledRadio } from './styles';
import messages from './messages';
import ButtonLink from '../../ButtonLink';
import { getDebounceFunction } from 'utils/utilHelper';

const DEFAULT_BATCH_SIZE = 11;
const MAX_LENGTH_FINDING_INPUT = 15;

class AssignDialog extends React.Component {
  constructor(props) {
    super(props);

    this.itemList = [];

    this.state = {
      findingContent: '',
      draftContent: '',
      rowCount: DEFAULT_BATCH_SIZE,
      isFetching: false,
      selectedItem: null,
    };

    this.debounceOnChange = getDebounceFunction(this.handleFind);
  }

  isRowLoaded = ({ index }) => !!this.itemList[index];

  finishFetching = () => {
    this.setState({
      isFetching: false,
      rowCount: this.itemList.length,
    });
  };

  continuousFetching = () => {
    this.setState({
      isFetching: false,
      rowCount: this.itemList.length + DEFAULT_BATCH_SIZE,
    });
  };

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const { isFetching, findingContent, selectedItem } = this.state;
    const { getItemsFn } = this.props;

    if (isFetching) {
      return;
    }

    this.setState({ isFetching: true });

    const response = await getItemsFn({
      startIndex,
      stopIndex,
      content: findingContent,
    });

    let items = [];

    const count = response.count;

    // need to capture the right data list
    // since it could be branchList, packageList,...
    Object.keys(response).forEach((key) => {
      if (Array.isArray(response[key])) {
        items = response[key];
      }
    });

    this.itemList = this.itemList.concat(items);

    if (selectedItem && !this.itemList.find((el) => el.id === selectedItem.id)) {
      this.setState({
        selectedItem: null,
      });
    }

    if (count === 0 || this.itemList.length === count) {
      this.finishFetching();
    } else {
      this.continuousFetching();
    }
  };

  handleSelectItem = (item) => (e) => {
    // const { handleSelectFn } = this.props;
    // handleSelectFn(item);

    if (e.target.checked) {
      this.setState({ selectedItem: item });
    }
  };

  rowRenderer = ({ key, index, style }) => {
    const { itemContentRenderFn } = this.props;
    const { selectedItem } = this.state;
    const item = this.itemList[index];

    if (!item) {
      return null;
    }

    return (
      <StyledItem
        style={style}
        key={`${item.id} ${key}`}
        // onClick={this.handleSelectItem(item)}
      >
        <div className={'radio-column'}>
          <StyledRadio
            value={item.id}
            onChange={this.handleSelectItem(item)}
            checked={selectedItem && selectedItem.id === item.id}
          />
        </div>
        {itemContentRenderFn(item)}
      </StyledItem>
    );
  };

  handleFind = () => {
    const { findingContent, draftContent } = this.state;

    if (findingContent === draftContent) {
      return;
    }

    this.itemList = [];

    this.setState({
      findingContent: draftContent,
      rowCount: DEFAULT_BATCH_SIZE,
      isFetching: false,
    });
  };

  handleKeyPressInput = (event) => {
    if (event.key === 'Enter') {
      this.handleFind();
    }
  };

  handleOnChange = (e) => {
    this.setState({
      draftContent: e.target.value,
    }, this.debounceOnChange());
  };

  handleClose = () => {
    this.itemList = [];
    this.setState({
      draftContent: '',
      findingContent: '',
      rowCount: DEFAULT_BATCH_SIZE,
      isFetching: false,
      selectedItem: null,
    }, () => {
      this.props.handleOnClose();
    });
  };

  handleScroll = (e) => {
    if (this.list) {
      // eslint-disable-next-line no-underscore-dangle
      this.list.Grid._onScroll(e);
    }
  };

  componentDidUpdate() {
    if (this.state.findingContent && this.list) {
      // eslint-disable-next-line no-underscore-dangle
      this.list.Grid._scrollingContainer = this.scroll.view;
    }
  }

  render() {
    const self = this;
    const { rowCount, draftContent, findingContent, selectedItem } = self.state;
    const {
      intl,
      isOpen,
      texts,
      headerContent,
      className,
      confirmFn,
      cancelFn,
      cancelBtnText,
      confirmBtnText,
      isSearchInput,
    } = this.props;

    // no result state when itemList is empty and findingContent has values.
    const bNoResult = this.itemList.length === 0 && (!isSearchInput || findingContent);

    return (
      <StyledContainer>
        <StyledDialog
          className={className}
          isOpen={isOpen}
          title={texts.title}
          usePortal
          canOutsideClickClose
          canEscapeKeyClose
          onClose={self.handleClose}
        >
          <div className={`body-container ${!isSearchInput ? 'mt-0' : ''}`}>
            { isSearchInput && <Fragment>
              <div className="label-container">{texts.textLabel}</div>
              <div className="find-container">
                <Input
                  autoFocus
                  maxLength={MAX_LENGTH_FINDING_INPUT}
                  placeholder={texts.placeholderFindInput}
                  className="find-input"
                  value={draftContent}
                  onChange={self.handleOnChange}
                  onKeyPress={self.handleKeyPressInput}
                />
              </div>
            </Fragment>}

            <Content pose={isEmpty(findingContent) && isSearchInput ? 'closed' : 'open'}>
              { (!isSearchInput || !isEmpty(findingContent)) && (
                <div className="result-container">
                  <div className="result-container__header">
                    <div className={'radio-header'} />
                    {headerContent.props.children}
                  </div>

                  <div className={`result-container__list ${bNoResult && findingContent ? 'no-result' : ''}`}>
                    {bNoResult &&
                    <div className="text-center mt-5 notify">{intl.formatMessage(messages.noResult)}</div>}

                    <InfiniteLoader
                      key={findingContent}
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

                  {selectedItem && (
                    <div className="action-popup-footer">
                      <Button
                        // className={classNames(Classes.FILL, 'mt-5')}
                        className="min-width-300"
                        text={confirmBtnText || intl.formatMessage(messages.btnConfirmPopup)}
                        primary
                        onClick={() => {
                          confirmFn(selectedItem);
                          this.handleClose();
                        }}
                      />
                      <ButtonLink
                        onClick={() => {
                          if (cancelFn) {
                            cancelFn();
                          }
                          this.handleClose();
                        }}
                      >{cancelBtnText || intl.formatMessage(messages.btnCancelPopup)}</ButtonLink>
                    </div>
                  )}
                </div>
              )}
            </Content>
          </div>
        </StyledDialog>
      </StyledContainer>
    );
  }
}


AssignDialog.propTypes = {
  getItemsFn: PropTypes.func.isRequired, // func return Object { rows: Array, count: Number }
  // handleSelectFn: PropTypes.func.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  texts: PropTypes.shape({
    title: PropTypes.string.isRequired,
    textLabel: PropTypes.string.isRequired,
    placeholderFindInput: PropTypes.string,
    findBtn: PropTypes.string.isRequired,
  }),
  confirmFn: PropTypes.func,
  cancelFn: PropTypes.func,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  isSearchInput: PropTypes.bool,
};

AssignDialog.defaultProps = {
  isSearchInput: true,
};

export default injectIntl(AssignDialog);

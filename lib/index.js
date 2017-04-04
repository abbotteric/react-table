'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactTableDefaults = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _lifecycle = require('./lifecycle');

var _lifecycle2 = _interopRequireDefault(_lifecycle);

var _methods = require('./methods');

var _methods2 = _interopRequireDefault(_methods);

var _defaultProps = require('./defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactTableDefaults = exports.ReactTableDefaults = _defaultProps2.default;

exports.default = _react2.default.createClass(_extends({
  displayName: 'src'
}, _lifecycle2.default, _methods2.default, {
  render: function render() {
    var _this = this;

    var resolvedState = this.getResolvedState();
    var children = resolvedState.children;
    var className = resolvedState.className;
    var style = resolvedState.style;
    var getProps = resolvedState.getProps;
    var getTableProps = resolvedState.getTableProps;
    var getTheadGroupProps = resolvedState.getTheadGroupProps;
    var getTheadGroupTrProps = resolvedState.getTheadGroupTrProps;
    var getTheadGroupThProps = resolvedState.getTheadGroupThProps;
    var getTheadProps = resolvedState.getTheadProps;
    var getTheadTrProps = resolvedState.getTheadTrProps;
    var getTheadThProps = resolvedState.getTheadThProps;
    var getTheadFilterProps = resolvedState.getTheadFilterProps;
    var getTheadFilterTrProps = resolvedState.getTheadFilterTrProps;
    var getTheadFilterThProps = resolvedState.getTheadFilterThProps;
    var getTbodyProps = resolvedState.getTbodyProps;
    var getTrGroupProps = resolvedState.getTrGroupProps;
    var getTrProps = resolvedState.getTrProps;
    var getTdProps = resolvedState.getTdProps;
    var getTfootProps = resolvedState.getTfootProps;
    var getTfootTrProps = resolvedState.getTfootTrProps;
    var getTfootTdProps = resolvedState.getTfootTdProps;
    var getPaginationProps = resolvedState.getPaginationProps;
    var getLoadingProps = resolvedState.getLoadingProps;
    var getNoDataProps = resolvedState.getNoDataProps;
    var showPagination = resolvedState.showPagination;
    var expanderColumnWidth = resolvedState.expanderColumnWidth;
    var manual = resolvedState.manual;
    var loadingText = resolvedState.loadingText;
    var noDataText = resolvedState.noDataText;
    var showFilters = resolvedState.showFilters;
    var loading = resolvedState.loading;
    var pageSize = resolvedState.pageSize;
    var page = resolvedState.page;
    var sorting = resolvedState.sorting;
    var filtering = resolvedState.filtering;
    var pages = resolvedState.pages;
    var pivotValKey = resolvedState.pivotValKey;
    var subRowsKey = resolvedState.subRowsKey;
    var expandedRows = resolvedState.expandedRows;
    var onExpandRow = resolvedState.onExpandRow;
    var TableComponent = resolvedState.TableComponent;
    var TheadComponent = resolvedState.TheadComponent;
    var TbodyComponent = resolvedState.TbodyComponent;
    var TrGroupComponent = resolvedState.TrGroupComponent;
    var TrComponent = resolvedState.TrComponent;
    var ThComponent = resolvedState.ThComponent;
    var TdComponent = resolvedState.TdComponent;
    var TfootComponent = resolvedState.TfootComponent;
    var ExpanderComponent = resolvedState.ExpanderComponent;
    var PaginationComponent = resolvedState.PaginationComponent;
    var LoadingComponent = resolvedState.LoadingComponent;
    var SubComponent = resolvedState.SubComponent;
    var NoDataComponent = resolvedState.NoDataComponent;
    var resolvedData = resolvedState.resolvedData;
    var allVisibleColumns = resolvedState.allVisibleColumns;
    var headerGroups = resolvedState.headerGroups;
    var hasHeaderGroups = resolvedState.hasHeaderGroups;
    var sortedData = resolvedState.sortedData;

    // Pagination

    var startRow = pageSize * page;
    var endRow = startRow + pageSize;
    var pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
    var minRows = this.getMinRows();
    var padRows = _utils2.default.range(Math.max(minRows - pageRows.length, 0));

    var hasColumnFooter = allVisibleColumns.some(function (d) {
      return d.footer;
    });

    var recurseRowsViewIndex = function recurseRowsViewIndex(rows) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      rows.forEach(function (row, i) {
        index++;
        row._viewIndex = index;
        var newPath = path.concat([i]);
        if (row[subRowsKey] && _utils2.default.get(expandedRows, newPath)) {
          index = recurseRowsViewIndex(row[subRowsKey], newPath, index);
        }
      });
      return index;
    };

    recurseRowsViewIndex(pageRows);

    var canPrevious = page > 0;
    var canNext = page + 1 < pages;

    var rowMinWidth = _utils2.default.sum(allVisibleColumns.map(function (d) {
      return _utils2.default.getFirstDefined(d.width, d.minWidth);
    }));

    var rowIndex = -1;

    var finalState = _extends({}, resolvedState, {
      startRow: startRow,
      endRow: endRow,
      pageRows: pageRows,
      minRows: minRows,
      padRows: padRows,
      hasColumnFooter: hasColumnFooter,
      canPrevious: canPrevious,
      canNext: canNext,
      rowMinWidth: rowMinWidth
    });

    // Visual Components

    var makeHeaderGroups = function makeHeaderGroups() {
      var theadGroupProps = _utils2.default.splitProps(getTheadGroupProps(finalState, undefined, undefined, _this));
      var theadGroupTrProps = _utils2.default.splitProps(getTheadGroupTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TheadComponent,
        _extends({
          className: (0, _classnames2.default)('-headerGroups', theadGroupProps.className),
          style: _extends({}, theadGroupProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, theadGroupProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: theadGroupTrProps.className,
            style: theadGroupTrProps.style
          }, theadGroupTrProps.rest),
          headerGroups.map(makeHeaderGroup)
        )
      );
    };

    var makeHeaderGroup = function makeHeaderGroup(column, i) {
      var flex = _utils2.default.sum(column.columns.map(function (d) {
        return d.width ? 0 : d.minWidth;
      }));
      var width = _utils2.default.sum(column.columns.map(function (d) {
        return _utils2.default.getFirstDefined(d.width, d.minWidth);
      }));
      var maxWidth = _utils2.default.sum(column.columns.map(function (d) {
        return _utils2.default.getFirstDefined(d.width, d.maxWidth);
      }));
      var theadGroupThProps = _utils2.default.splitProps(getTheadGroupThProps(finalState, undefined, column, _this));
      var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this));

      var classes = [column.headerClassName, theadGroupThProps.className, columnHeaderProps.className];

      var styles = _extends({}, column.headerStyle, theadGroupThProps.style, columnHeaderProps.style);

      var rest = _extends({}, theadGroupThProps.rest, columnHeaderProps.rest);

      var flexStyles = {
        flex: flex + ' 0 auto',
        width: width + 'px',
        maxWidth: maxWidth + 'px'
      };

      if (column.expander) {
        if (column.pivotColumns) {
          return _react2.default.createElement(ThComponent, _extends({
            key: i,
            className: (0, _classnames2.default)('rt-pivot-header', classes),
            style: _extends({}, styles, flexStyles)
          }, rest));
        }
        return _react2.default.createElement(ThComponent, _extends({
          key: i,
          className: (0, _classnames2.default)('rt-expander-header', classes),
          style: _extends({}, styles, {
            flex: '0 0 auto',
            width: expanderColumnWidth + 'px'
          })
        }, rest));
      }
      return _react2.default.createElement(
        ThComponent,
        _extends({
          key: i,
          className: (0, _classnames2.default)(classes),
          style: _extends({}, styles, flexStyles)
        }, rest),
        _utils2.default.normalizeComponent(column.header, {
          data: sortedData,
          column: column
        })
      );
    };

    var makeHeaders = function makeHeaders() {
      var theadProps = _utils2.default.splitProps(getTheadProps(finalState, undefined, undefined, _this));
      var theadTrProps = _utils2.default.splitProps(getTheadTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TheadComponent,
        _extends({
          className: (0, _classnames2.default)('-header', theadProps.className),
          style: _extends({}, theadProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, theadProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: theadTrProps.className,
            style: theadTrProps.style
          }, theadTrProps.rest),
          allVisibleColumns.map(makeHeader)
        )
      );
    };

    var makeHeader = function makeHeader(column, i) {
      var sort = sorting.find(function (d) {
        return d.id === column.id;
      });
      var show = typeof column.show === 'function' ? column.show() : column.show;
      var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
      var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
      var theadThProps = _utils2.default.splitProps(getTheadThProps(finalState, undefined, column, _this));
      var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this));

      var classes = [column.headerClassName, theadThProps.className, columnHeaderProps.className];

      var styles = _extends({}, column.headerStyle, theadThProps.style, columnHeaderProps.style);

      var rest = _extends({}, theadThProps.rest, columnHeaderProps.rest);

      if (column.expander) {
        if (column.pivotColumns) {
          var pivotSort = sorting.find(function (d) {
            return d.id === column.id;
          });
          return _react2.default.createElement(
            ThComponent,
            _extends({
              key: i,
              className: (0, _classnames2.default)('rt-pivot-header', column.sortable && '-cursor-pointer', classes, pivotSort ? pivotSort.desc ? '-sort-desc' : '-sort-asc' : ''),
              style: _extends({}, styles, {
                flex: width + ' 0 auto',
                width: width + 'px',
                maxWidth: maxWidth + 'px'
              }),
              toggleSort: function toggleSort(e) {
                column.sortable && _this.sortColumn(column.pivotColumns, e.shiftKey);
              }
            }, rest),
            column.pivotColumns.map(function (pivotColumn, i) {
              return _react2.default.createElement(
                'span',
                { key: pivotColumn.id },
                _utils2.default.normalizeComponent(pivotColumn.header, {
                  data: sortedData,
                  column: column
                }),
                i < column.pivotColumns.length - 1 && _react2.default.createElement(ExpanderComponent, null)
              );
            })
          );
        }
        return _react2.default.createElement(ThComponent, _extends({
          key: i,
          className: (0, _classnames2.default)('rt-expander-header', classes),
          style: _extends({}, styles, {
            flex: '0 0 auto',
            width: expanderColumnWidth + 'px'
          })
        }, rest));
      }

      return _react2.default.createElement(
        ThComponent,
        _extends({
          key: i,
          className: (0, _classnames2.default)(classes, sort ? sort.desc ? '-sort-desc' : '-sort-asc' : '', column.sortable && '-cursor-pointer', !show && '-hidden'),
          style: _extends({}, styles, {
            flex: width + ' 0 auto',
            width: width + 'px',
            maxWidth: maxWidth + 'px'
          }),
          toggleSort: function toggleSort(e) {
            column.sortable && _this.sortColumn(column, e.shiftKey);
          }
        }, rest),
        _utils2.default.normalizeComponent(column.header, {
          data: sortedData,
          column: column
        })
      );
    };

    var makeFilters = function makeFilters() {
      var theadFilterProps = _utils2.default.splitProps(getTheadFilterProps(finalState, undefined, undefined, _this));
      var theadFilterTrProps = _utils2.default.splitProps(getTheadFilterTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TheadComponent,
        _extends({
          className: (0, _classnames2.default)('-filters', theadFilterProps.className),
          style: _extends({}, theadFilterProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, theadFilterProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: theadFilterTrProps.className,
            style: theadFilterTrProps.style
          }, theadFilterTrProps.rest),
          allVisibleColumns.map(makeFilter)
        )
      );
    };

    var makeFilter = function makeFilter(column, i) {
      var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
      var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
      var theadFilterThProps = _utils2.default.splitProps(getTheadFilterThProps(finalState, undefined, column, _this));
      var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this));

      var classes = [column.headerClassName, theadFilterThProps.className, columnHeaderProps.className];

      var styles = _extends({}, column.headerStyle, theadFilterThProps.style, columnHeaderProps.style);

      var rest = _extends({}, theadFilterThProps.rest, columnHeaderProps.rest);

      if (column.expander) {
        if (column.pivotColumns) {
          var pivotCols = [];

          var _loop = function _loop(_i) {
            var col = column.pivotColumns[_i];
            var filter = filtering.find(function (filter) {
              return filter.id === column.id && filter.pivotId === col.id;
            });
            pivotCols.push(_react2.default.createElement(
              'span',
              { key: col.id,
                style: { flex: 1 } },
              !col.hideFilter ? _utils2.default.normalizeComponent(col.filterRender, {
                col: col,
                filter: filter,
                onFilterChange: function onFilterChange(value) {
                  return _this.filterColumn(column, value, col);
                }
              }, _defaultProps2.default.column.filterRender) : null
            ));
            if (_i < column.pivotColumns.length - 1) {
              pivotCols.push(_react2.default.createElement(ExpanderComponent, { key: col.id + '-' + _i }));
            }
          };

          for (var _i = 0; _i < column.pivotColumns.length; _i++) {
            _loop(_i);
          }
          return _react2.default.createElement(
            ThComponent,
            _extends({
              key: i,
              className: (0, _classnames2.default)('rt-pivot-header', column.sortable && '-cursor-pointer', classes),
              style: _extends({}, styles, {
                flex: width + ' 0 auto',
                width: width + 'px',
                maxWidth: maxWidth + 'px',
                display: 'flex'
              })
            }, rest),
            pivotCols
          );
        }
        return _react2.default.createElement(ThComponent, _extends({
          key: i,
          className: (0, _classnames2.default)('rt-expander-header', classes),
          style: _extends({}, styles, {
            flex: '0 0 auto',
            width: expanderColumnWidth + 'px'
          })
        }, rest));
      }

      var filter = filtering.find(function (filter) {
        return filter.id === column.id;
      });

      return _react2.default.createElement(
        ThComponent,
        _extends({
          key: i,
          className: (0, _classnames2.default)(classes),
          style: _extends({}, styles, {
            flex: width + ' 0 auto',
            width: width + 'px',
            maxWidth: maxWidth + 'px'
          })
        }, rest),
        !column.hideFilter ? _utils2.default.normalizeComponent(column.filterRender, {
          column: column,
          filter: filter,
          onFilterChange: function onFilterChange(value) {
            return _this.filterColumn(column, value);
          }
        }, _defaultProps2.default.column.filterRender) : null
      );
    };

    var makePageRow = function makePageRow(row, i) {
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var rowInfo = {
        row: row.__original,
        rowValues: row,
        index: row.__index,
        viewIndex: ++rowIndex,
        level: path.length,
        nestingPath: path.concat([i]),
        aggregated: !!row[subRowsKey],
        subRows: row[subRowsKey]
      };
      var isExpanded = _utils2.default.get(expandedRows, rowInfo.nestingPath);
      var trGroupProps = getTrGroupProps(finalState, rowInfo, undefined, _this);
      var trProps = _utils2.default.splitProps(getTrProps(finalState, rowInfo, undefined, _this));
      return _react2.default.createElement(
        TrGroupComponent,
        _extends({
          key: rowInfo.nestingPath.join('_')
        }, trGroupProps),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: (0, _classnames2.default)(trProps.className, row._viewIndex % 2 ? '-even' : '-odd'),
            style: trProps.style
          }, trProps.rest),
          allVisibleColumns.map(function (column, i2) {
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
            var tdProps = _utils2.default.splitProps(getTdProps(finalState, rowInfo, column, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, rowInfo, column, _this));

            var classes = [tdProps.className, column.className, columnProps.className];

            var styles = _extends({}, tdProps.style, column.style, columnProps.style);

            if (column.expander) {
              var onTdClick = function onTdClick(e) {
                if (onExpandRow) {
                  return onExpandRow(rowInfo.nestingPath, e);
                }
                var newExpandedRows = _utils2.default.clone(expandedRows);
                if (isExpanded) {
                  return _this.setStateWithData({
                    expandedRows: _utils2.default.set(newExpandedRows, rowInfo.nestingPath, false)
                  });
                }
                return _this.setStateWithData({
                  expandedRows: _utils2.default.set(newExpandedRows, rowInfo.nestingPath, {})
                });
              };

              if (column.pivotColumns) {
                // Return the pivot expander cell
                var PivotCell = column.pivotRender;
                return _react2.default.createElement(
                  TdComponent,
                  _extends({
                    key: i2,
                    className: (0, _classnames2.default)('rt-pivot', classes),
                    style: _extends({}, styles, {
                      paddingLeft: rowInfo.nestingPath.length === 1 ? undefined : 30 * (rowInfo.nestingPath.length - 1) + 'px',
                      flex: width + ' 0 auto',
                      width: width + 'px',
                      maxWidth: maxWidth + 'px'
                    })
                  }, tdProps.rest, {
                    onClick: onTdClick
                  }),
                  rowInfo.subRows ? _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(ExpanderComponent, {
                      isExpanded: isExpanded
                    }),
                    column && column.pivotRender ? _react2.default.createElement(PivotCell, _extends({}, rowInfo, {
                      value: rowInfo.rowValues[pivotValKey]
                    })) : _react2.default.createElement(
                      'span',
                      null,
                      row[pivotValKey],
                      ' (',
                      rowInfo.subRows.length,
                      ')'
                    )
                  ) : SubComponent ? _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(ExpanderComponent, {
                      isExpanded: isExpanded
                    })
                  ) : null
                );
              }

              // Return the regular expander cell
              return _react2.default.createElement(
                TdComponent,
                {
                  key: i2,
                  className: (0, _classnames2.default)(classes, { hidden: !show }),
                  style: _extends({}, styles, {
                    flex: '0 0 auto',
                    width: expanderColumnWidth + 'px'
                  }),
                  onClick: onTdClick
                },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(ExpanderComponent, {
                    isExpanded: isExpanded
                  })
                )
              );
            }

            // Return regular cell
            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, tdProps.rest),
              _utils2.default.normalizeComponent(column.render, _extends({}, rowInfo, {
                value: rowInfo.rowValues[column.id]
              }), rowInfo.rowValues[column.id])
            );
          })
        ),
        rowInfo.subRows && isExpanded && rowInfo.subRows.map(function (d, i) {
          return makePageRow(d, i, rowInfo.nestingPath);
        }),
        SubComponent && !rowInfo.subRows && isExpanded && SubComponent(rowInfo)
      );
    };

    var makePadRow = function makePadRow(row, i) {
      var trGroupProps = getTrGroupProps(finalState, undefined, undefined, _this);
      var trProps = _utils2.default.splitProps(getTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TrGroupComponent,
        _extends({
          key: i
        }, trGroupProps),
        _react2.default.createElement(
          TrComponent,
          {
            className: (0, _classnames2.default)('-padRow', trProps.className),
            style: trProps.style || {}
          },
          allVisibleColumns.map(function (column, i2) {
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
            var tdProps = _utils2.default.splitProps(getTdProps(finalState, undefined, column, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this));

            var classes = [tdProps.className, column.className, columnProps.className];

            var styles = _extends({}, tdProps.style, column.style, columnProps.style);

            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, tdProps.rest),
              '\xA0'
            );
          })
        )
      );
    };

    var makeColumnFooters = function makeColumnFooters() {
      var tFootProps = getTfootProps(finalState, undefined, undefined, _this);
      var tFootTrProps = _utils2.default.splitProps(getTfootTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TfootComponent,
        _extends({
          className: tFootProps.className,
          style: _extends({}, tFootProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, tFootProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: (0, _classnames2.default)(tFootTrProps.className),
            style: tFootTrProps.style
          }, tFootTrProps.rest),
          allVisibleColumns.map(function (column, i2) {
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(column.width, column.maxWidth);
            var tFootTdProps = _utils2.default.splitProps(getTfootTdProps(finalState, undefined, undefined, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this));
            var columnFooterProps = _utils2.default.splitProps(column.getFooterProps(finalState, undefined, column, _this));

            var classes = [tFootTdProps.className, column.className, columnProps.className, columnFooterProps.className];

            var styles = _extends({}, tFootTdProps.style, column.style, columnProps.style, columnFooterProps.style);

            if (column.expander) {
              if (column.pivotColumns) {
                return _react2.default.createElement(
                  TdComponent,
                  _extends({
                    key: i2,
                    className: (0, _classnames2.default)('rt-pivot', classes),
                    style: _extends({}, styles, {
                      flex: width + ' 0 auto',
                      width: width + 'px',
                      maxWidth: maxWidth + 'px'
                    })
                  }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
                  _utils2.default.normalizeComponent(column.footer)
                );
              }

              // Return the regular expander cell
              return _react2.default.createElement(TdComponent, {
                key: i2,
                className: (0, _classnames2.default)(classes, { hidden: !show }),
                style: _extends({}, styles, {
                  flex: '0 0 auto',
                  width: expanderColumnWidth + 'px'
                })
              });
            }

            // Return regular cell
            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
              _utils2.default.normalizeComponent(column.footer, {
                data: sortedData,
                column: column
              })
            );
          })
        )
      );
    };

    var rootProps = _utils2.default.splitProps(getProps(finalState, undefined, undefined, this));
    var tableProps = _utils2.default.splitProps(getTableProps(finalState, undefined, undefined, this));
    var tBodyProps = _utils2.default.splitProps(getTbodyProps(finalState, undefined, undefined, this));
    var paginationProps = _utils2.default.splitProps(getPaginationProps(finalState, undefined, undefined, this));
    var loadingProps = getLoadingProps(finalState, undefined, undefined, this);
    var noDataProps = getNoDataProps(finalState, undefined, undefined, this);

    var makeTable = function makeTable() {
      return _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)('ReactTable', className, rootProps.className),
          style: _extends({}, style, rootProps.style)
        }, rootProps.rest),
        _react2.default.createElement(
          TableComponent,
          _extends({
            className: (0, _classnames2.default)(tableProps.className),
            style: tableProps.style
          }, tableProps.rest),
          hasHeaderGroups ? makeHeaderGroups() : null,
          makeHeaders(),
          showFilters ? makeFilters() : null,
          _react2.default.createElement(
            TbodyComponent,
            _extends({
              className: (0, _classnames2.default)(tBodyProps.className),
              style: _extends({}, tBodyProps.style, {
                minWidth: rowMinWidth + 'px'
              })
            }, tBodyProps.rest),
            pageRows.map(function (d, i) {
              return makePageRow(d, i);
            }),
            padRows.map(makePadRow)
          ),
          hasColumnFooter ? makeColumnFooters() : null
        ),
        showPagination ? _react2.default.createElement(PaginationComponent, _extends({}, resolvedState, {
          pages: pages,
          canPrevious: canPrevious,
          canNext: canNext,
          onPageChange: _this.onPageChange,
          onPageSizeChange: _this.onPageSizeChange,
          className: paginationProps.className,
          style: paginationProps.style
        }, paginationProps.rest)) : null,
        !pageRows.length && _react2.default.createElement(
          NoDataComponent,
          noDataProps,
          _utils2.default.normalizeComponent(noDataText)
        ),
        _react2.default.createElement(LoadingComponent, _extends({
          loading: loading,
          loadingText: loadingText
        }, loadingProps))
      );
    };

    // childProps are optionally passed to a function-as-a-child
    return children ? children(finalState, makeTable, this) : makeTable();
  }
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdFRhYmxlRGVmYXVsdHMiLCJjcmVhdGVDbGFzcyIsInJlbmRlciIsInJlc29sdmVkU3RhdGUiLCJnZXRSZXNvbHZlZFN0YXRlIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJQcm9wcyIsImdldFRoZWFkRmlsdGVyVHJQcm9wcyIsImdldFRoZWFkRmlsdGVyVGhQcm9wcyIsImdldFRib2R5UHJvcHMiLCJnZXRUckdyb3VwUHJvcHMiLCJnZXRUclByb3BzIiwiZ2V0VGRQcm9wcyIsImdldFRmb290UHJvcHMiLCJnZXRUZm9vdFRyUHJvcHMiLCJnZXRUZm9vdFRkUHJvcHMiLCJnZXRQYWdpbmF0aW9uUHJvcHMiLCJnZXRMb2FkaW5nUHJvcHMiLCJnZXROb0RhdGFQcm9wcyIsInNob3dQYWdpbmF0aW9uIiwiZXhwYW5kZXJDb2x1bW5XaWR0aCIsIm1hbnVhbCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInNob3dGaWx0ZXJzIiwibG9hZGluZyIsInBhZ2VTaXplIiwicGFnZSIsInNvcnRpbmciLCJmaWx0ZXJpbmciLCJwYWdlcyIsInBpdm90VmFsS2V5Iiwic3ViUm93c0tleSIsImV4cGFuZGVkUm93cyIsIm9uRXhwYW5kUm93IiwiVGFibGVDb21wb25lbnQiLCJUaGVhZENvbXBvbmVudCIsIlRib2R5Q29tcG9uZW50IiwiVHJHcm91cENvbXBvbmVudCIsIlRyQ29tcG9uZW50IiwiVGhDb21wb25lbnQiLCJUZENvbXBvbmVudCIsIlRmb290Q29tcG9uZW50IiwiRXhwYW5kZXJDb21wb25lbnQiLCJQYWdpbmF0aW9uQ29tcG9uZW50IiwiTG9hZGluZ0NvbXBvbmVudCIsIlN1YkNvbXBvbmVudCIsIk5vRGF0YUNvbXBvbmVudCIsInJlc29sdmVkRGF0YSIsImFsbFZpc2libGVDb2x1bW5zIiwiaGVhZGVyR3JvdXBzIiwiaGFzSGVhZGVyR3JvdXBzIiwic29ydGVkRGF0YSIsInN0YXJ0Um93IiwiZW5kUm93IiwicGFnZVJvd3MiLCJzbGljZSIsIm1pblJvd3MiLCJnZXRNaW5Sb3dzIiwicGFkUm93cyIsInJhbmdlIiwiTWF0aCIsIm1heCIsImxlbmd0aCIsImhhc0NvbHVtbkZvb3RlciIsInNvbWUiLCJkIiwiZm9vdGVyIiwicmVjdXJzZVJvd3NWaWV3SW5kZXgiLCJyb3dzIiwicGF0aCIsImluZGV4IiwiZm9yRWFjaCIsInJvdyIsImkiLCJfdmlld0luZGV4IiwibmV3UGF0aCIsImNvbmNhdCIsImdldCIsImNhblByZXZpb3VzIiwiY2FuTmV4dCIsInJvd01pbldpZHRoIiwic3VtIiwibWFwIiwiZ2V0Rmlyc3REZWZpbmVkIiwid2lkdGgiLCJtaW5XaWR0aCIsInJvd0luZGV4IiwiZmluYWxTdGF0ZSIsIm1ha2VIZWFkZXJHcm91cHMiLCJ0aGVhZEdyb3VwUHJvcHMiLCJzcGxpdFByb3BzIiwidW5kZWZpbmVkIiwidGhlYWRHcm91cFRyUHJvcHMiLCJyZXN0IiwibWFrZUhlYWRlckdyb3VwIiwiY29sdW1uIiwiZmxleCIsImNvbHVtbnMiLCJtYXhXaWR0aCIsInRoZWFkR3JvdXBUaFByb3BzIiwiY29sdW1uSGVhZGVyUHJvcHMiLCJnZXRIZWFkZXJQcm9wcyIsImNsYXNzZXMiLCJoZWFkZXJDbGFzc05hbWUiLCJzdHlsZXMiLCJoZWFkZXJTdHlsZSIsImZsZXhTdHlsZXMiLCJleHBhbmRlciIsInBpdm90Q29sdW1ucyIsIm5vcm1hbGl6ZUNvbXBvbmVudCIsImhlYWRlciIsImRhdGEiLCJtYWtlSGVhZGVycyIsInRoZWFkUHJvcHMiLCJ0aGVhZFRyUHJvcHMiLCJtYWtlSGVhZGVyIiwic29ydCIsImZpbmQiLCJpZCIsInNob3ciLCJ0aGVhZFRoUHJvcHMiLCJwaXZvdFNvcnQiLCJzb3J0YWJsZSIsImRlc2MiLCJlIiwic29ydENvbHVtbiIsInNoaWZ0S2V5IiwicGl2b3RDb2x1bW4iLCJtYWtlRmlsdGVycyIsInRoZWFkRmlsdGVyUHJvcHMiLCJ0aGVhZEZpbHRlclRyUHJvcHMiLCJtYWtlRmlsdGVyIiwidGhlYWRGaWx0ZXJUaFByb3BzIiwicGl2b3RDb2xzIiwiY29sIiwiZmlsdGVyIiwicGl2b3RJZCIsInB1c2giLCJoaWRlRmlsdGVyIiwiZmlsdGVyUmVuZGVyIiwib25GaWx0ZXJDaGFuZ2UiLCJ2YWx1ZSIsImZpbHRlckNvbHVtbiIsImRpc3BsYXkiLCJtYWtlUGFnZVJvdyIsInJvd0luZm8iLCJfX29yaWdpbmFsIiwicm93VmFsdWVzIiwiX19pbmRleCIsInZpZXdJbmRleCIsImxldmVsIiwibmVzdGluZ1BhdGgiLCJhZ2dyZWdhdGVkIiwic3ViUm93cyIsImlzRXhwYW5kZWQiLCJ0ckdyb3VwUHJvcHMiLCJ0clByb3BzIiwiam9pbiIsImkyIiwidGRQcm9wcyIsImNvbHVtblByb3BzIiwib25UZENsaWNrIiwibmV3RXhwYW5kZWRSb3dzIiwiY2xvbmUiLCJzZXRTdGF0ZVdpdGhEYXRhIiwic2V0IiwiUGl2b3RDZWxsIiwicGl2b3RSZW5kZXIiLCJwYWRkaW5nTGVmdCIsImhpZGRlbiIsIm1ha2VQYWRSb3ciLCJtYWtlQ29sdW1uRm9vdGVycyIsInRGb290UHJvcHMiLCJ0Rm9vdFRyUHJvcHMiLCJ0Rm9vdFRkUHJvcHMiLCJjb2x1bW5Gb290ZXJQcm9wcyIsImdldEZvb3RlclByb3BzIiwicm9vdFByb3BzIiwidGFibGVQcm9wcyIsInRCb2R5UHJvcHMiLCJwYWdpbmF0aW9uUHJvcHMiLCJsb2FkaW5nUHJvcHMiLCJub0RhdGFQcm9wcyIsIm1ha2VUYWJsZSIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7OztBQUZBOzs7O0FBQ0E7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QUFPM0wsV0FBV0EsU0FBUzZGLFVBQVQsRUFBcUJnRyxTQUFyQixFQUFnQyxJQUFoQyxDQUFYLEdBQW1EQSxXQUExRDtBQUNEO0FBbDRCWSxHIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbi8vXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGxpZmVjeWNsZSBmcm9tICcuL2xpZmVjeWNsZSdcbmltcG9ydCBtZXRob2RzIGZyb20gJy4vbWV0aG9kcydcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRQcm9wcydcblxuZXhwb3J0IGNvbnN0IFJlYWN0VGFibGVEZWZhdWx0cyA9IGRlZmF1bHRzXG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgLi4ubGlmZWN5Y2xlLFxuICAuLi5tZXRob2RzLFxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzdHlsZSxcbiAgICAgIGdldFByb3BzLFxuICAgICAgZ2V0VGFibGVQcm9wcyxcbiAgICAgIGdldFRoZWFkR3JvdXBQcm9wcyxcbiAgICAgIGdldFRoZWFkR3JvdXBUclByb3BzLFxuICAgICAgZ2V0VGhlYWRHcm91cFRoUHJvcHMsXG4gICAgICBnZXRUaGVhZFByb3BzLFxuICAgICAgZ2V0VGhlYWRUclByb3BzLFxuICAgICAgZ2V0VGhlYWRUaFByb3BzLFxuICAgICAgZ2V0VGhlYWRGaWx0ZXJQcm9wcyxcbiAgICAgIGdldFRoZWFkRmlsdGVyVHJQcm9wcyxcbiAgICAgIGdldFRoZWFkRmlsdGVyVGhQcm9wcyxcbiAgICAgIGdldFRib2R5UHJvcHMsXG4gICAgICBnZXRUckdyb3VwUHJvcHMsXG4gICAgICBnZXRUclByb3BzLFxuICAgICAgZ2V0VGRQcm9wcyxcbiAgICAgIGdldFRmb290UHJvcHMsXG4gICAgICBnZXRUZm9vdFRyUHJvcHMsXG4gICAgICBnZXRUZm9vdFRkUHJvcHMsXG4gICAgICBnZXRQYWdpbmF0aW9uUHJvcHMsXG4gICAgICBnZXRMb2FkaW5nUHJvcHMsXG4gICAgICBnZXROb0RhdGFQcm9wcyxcbiAgICAgIHNob3dQYWdpbmF0aW9uLFxuICAgICAgZXhwYW5kZXJDb2x1bW5XaWR0aCxcbiAgICAgIG1hbnVhbCxcbiAgICAgIGxvYWRpbmdUZXh0LFxuICAgICAgbm9EYXRhVGV4dCxcbiAgICAgIHNob3dGaWx0ZXJzLFxuICAgICAgLy8gU3RhdGVcbiAgICAgIGxvYWRpbmcsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHBhZ2UsXG4gICAgICBzb3J0aW5nLFxuICAgICAgZmlsdGVyaW5nLFxuICAgICAgcGFnZXMsXG4gICAgICAvLyBQaXZvdGluZyBTdGF0ZVxuICAgICAgcGl2b3RWYWxLZXksXG4gICAgICBzdWJSb3dzS2V5LFxuICAgICAgZXhwYW5kZWRSb3dzLFxuICAgICAgb25FeHBhbmRSb3csXG4gICAgICAvLyBDb21wb25lbnRzXG4gICAgICBUYWJsZUNvbXBvbmVudCxcbiAgICAgIFRoZWFkQ29tcG9uZW50LFxuICAgICAgVGJvZHlDb21wb25lbnQsXG4gICAgICBUckdyb3VwQ29tcG9uZW50LFxuICAgICAgVHJDb21wb25lbnQsXG4gICAgICBUaENvbXBvbmVudCxcbiAgICAgIFRkQ29tcG9uZW50LFxuICAgICAgVGZvb3RDb21wb25lbnQsXG4gICAgICBFeHBhbmRlckNvbXBvbmVudCxcbiAgICAgIFBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgICBMb2FkaW5nQ29tcG9uZW50LFxuICAgICAgU3ViQ29tcG9uZW50LFxuICAgICAgTm9EYXRhQ29tcG9uZW50LFxuICAgICAgLy8gRGF0YSBtb2RlbFxuICAgICAgcmVzb2x2ZWREYXRhLFxuICAgICAgYWxsVmlzaWJsZUNvbHVtbnMsXG4gICAgICBoZWFkZXJHcm91cHMsXG4gICAgICBoYXNIZWFkZXJHcm91cHMsXG4gICAgICAvLyBTb3J0ZWQgRGF0YVxuICAgICAgc29ydGVkRGF0YVxuICAgIH0gPSByZXNvbHZlZFN0YXRlXG5cbiAgICAvLyBQYWdpbmF0aW9uXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBwYWdlU2l6ZSAqIHBhZ2VcbiAgICBjb25zdCBlbmRSb3cgPSBzdGFydFJvdyArIHBhZ2VTaXplXG4gICAgY29uc3QgcGFnZVJvd3MgPSBtYW51YWwgPyByZXNvbHZlZERhdGEgOiBzb3J0ZWREYXRhLnNsaWNlKHN0YXJ0Um93LCBlbmRSb3cpXG4gICAgY29uc3QgbWluUm93cyA9IHRoaXMuZ2V0TWluUm93cygpXG4gICAgY29uc3QgcGFkUm93cyA9IF8ucmFuZ2UoTWF0aC5tYXgobWluUm93cyAtIHBhZ2VSb3dzLmxlbmd0aCwgMCkpXG5cbiAgICBjb25zdCBoYXNDb2x1bW5Gb290ZXIgPSBhbGxWaXNpYmxlQ29sdW1ucy5zb21lKGQgPT4gZC5mb290ZXIpXG5cbiAgICBjb25zdCByZWN1cnNlUm93c1ZpZXdJbmRleCA9IChyb3dzLCBwYXRoID0gW10sIGluZGV4ID0gLTEpID0+IHtcbiAgICAgIHJvd3MuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICAgIGluZGV4KytcbiAgICAgICAgcm93Ll92aWV3SW5kZXggPSBpbmRleFxuICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5jb25jYXQoW2ldKVxuICAgICAgICBpZiAocm93W3N1YlJvd3NLZXldICYmIF8uZ2V0KGV4cGFuZGVkUm93cywgbmV3UGF0aCkpIHtcbiAgICAgICAgICBpbmRleCA9IHJlY3Vyc2VSb3dzVmlld0luZGV4KHJvd1tzdWJSb3dzS2V5XSwgbmV3UGF0aCwgaW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICByZWN1cnNlUm93c1ZpZXdJbmRleChwYWdlUm93cylcblxuICAgIGNvbnN0IGNhblByZXZpb3VzID0gcGFnZSA+IDBcbiAgICBjb25zdCBjYW5OZXh0ID0gcGFnZSArIDEgPCBwYWdlc1xuXG4gICAgY29uc3Qgcm93TWluV2lkdGggPSBfLnN1bShhbGxWaXNpYmxlQ29sdW1ucy5tYXAoZCA9PiBfLmdldEZpcnN0RGVmaW5lZChkLndpZHRoLCBkLm1pbldpZHRoKSkpXG5cbiAgICBsZXQgcm93SW5kZXggPSAtMVxuXG4gICAgY29uc3QgZmluYWxTdGF0ZSA9IHtcbiAgICAgIC4uLnJlc29sdmVkU3RhdGUsXG4gICAgICBzdGFydFJvdyxcbiAgICAgIGVuZFJvdyxcbiAgICAgIHBhZ2VSb3dzLFxuICAgICAgbWluUm93cyxcbiAgICAgIHBhZFJvd3MsXG4gICAgICBoYXNDb2x1bW5Gb290ZXIsXG4gICAgICBjYW5QcmV2aW91cyxcbiAgICAgIGNhbk5leHQsXG4gICAgICByb3dNaW5XaWR0aFxuICAgIH1cblxuICAgIC8vIFZpc3VhbCBDb21wb25lbnRzXG5cbiAgICBjb25zdCBtYWtlSGVhZGVyR3JvdXBzID0gKCkgPT4ge1xuICAgICAgY29uc3QgdGhlYWRHcm91cFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkR3JvdXBQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICBjb25zdCB0aGVhZEdyb3VwVHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEdyb3VwVHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGhlYWRDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1oZWFkZXJHcm91cHMnLCB0aGVhZEdyb3VwUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4udGhlYWRHcm91cFByb3BzLnN0eWxlLFxuICAgICAgICAgICAgbWluV2lkdGg6IGAke3Jvd01pbldpZHRofXB4YFxuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnRoZWFkR3JvdXBQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAgPFRyQ29tcG9uZW50XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoZWFkR3JvdXBUclByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZEdyb3VwVHJQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi50aGVhZEdyb3VwVHJQcm9wcy5yZXN0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtoZWFkZXJHcm91cHMubWFwKG1ha2VIZWFkZXJHcm91cCl9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgPC9UaGVhZENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlSGVhZGVyR3JvdXAgPSAoY29sdW1uLCBpKSA9PiB7XG4gICAgICBjb25zdCBmbGV4ID0gXy5zdW0oY29sdW1uLmNvbHVtbnMubWFwKGQgPT4gZC53aWR0aCA/IDAgOiBkLm1pbldpZHRoKSlcbiAgICAgIGNvbnN0IHdpZHRoID0gXy5zdW0oY29sdW1uLmNvbHVtbnMubWFwKGQgPT4gXy5nZXRGaXJzdERlZmluZWQoZC53aWR0aCwgZC5taW5XaWR0aCkpKVxuICAgICAgY29uc3QgbWF4V2lkdGggPSBfLnN1bShjb2x1bW4uY29sdW1ucy5tYXAoZCA9PiBfLmdldEZpcnN0RGVmaW5lZChkLndpZHRoLCBkLm1heFdpZHRoKSkpXG4gICAgICBjb25zdCB0aGVhZEdyb3VwVGhQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEdyb3VwVGhQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG4gICAgICBjb25zdCBjb2x1bW5IZWFkZXJQcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0SGVhZGVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxuXG4gICAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgICBjb2x1bW4uaGVhZGVyQ2xhc3NOYW1lLFxuICAgICAgICB0aGVhZEdyb3VwVGhQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZVxuICAgICAgXVxuXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIC4uLmNvbHVtbi5oZWFkZXJTdHlsZSxcbiAgICAgICAgLi4udGhlYWRHcm91cFRoUHJvcHMuc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnN0eWxlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3QgPSB7XG4gICAgICAgIC4uLnRoZWFkR3JvdXBUaFByb3BzLnJlc3QsXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnJlc3RcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmxleFN0eWxlcyA9IHtcbiAgICAgICAgZmxleDogYCR7ZmxleH0gMCBhdXRvYCxcbiAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxuICAgICAgfVxuXG4gICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSB7XG4gICAgICAgIGlmIChjb2x1bW4ucGl2b3RDb2x1bW5zKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgICAncnQtcGl2b3QtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgIC4uLmZsZXhTdHlsZXNcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAncnQtZXhwYW5kZXItaGVhZGVyJyxcbiAgICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgICAgZmxleDogYDAgMCBhdXRvYCxcbiAgICAgICAgICAgICAgd2lkdGg6IGAke2V4cGFuZGVyQ29sdW1uV2lkdGh9cHhgXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoQ29tcG9uZW50XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgIGNsYXNzZXNcbiAgICAgICAgICApfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICAuLi5mbGV4U3R5bGVzXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4uaGVhZGVyLCB7XG4gICAgICAgICAgICBkYXRhOiBzb3J0ZWREYXRhLFxuICAgICAgICAgICAgY29sdW1uOiBjb2x1bW5cbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9UaENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlSGVhZGVycyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRoZWFkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICBjb25zdCB0aGVhZFRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRUclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaGVhZENvbXBvbmVudFxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnLWhlYWRlcicsIHRoZWFkUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4udGhlYWRQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGBcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi50aGVhZFByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhlYWRUclByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZFRyUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4udGhlYWRUclByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcChtYWtlSGVhZGVyKX1cbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICA8L1RoZWFkQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VIZWFkZXIgPSAoY29sdW1uLCBpKSA9PiB7XG4gICAgICBjb25zdCBzb3J0ID0gc29ydGluZy5maW5kKGQgPT4gZC5pZCA9PT0gY29sdW1uLmlkKVxuICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xuICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXG4gICAgICBjb25zdCB0aGVhZFRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRUaFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcbiAgICAgIGNvbnN0IGNvbHVtbkhlYWRlclByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRIZWFkZXJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG5cbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICAgIGNvbHVtbi5oZWFkZXJDbGFzc05hbWUsXG4gICAgICAgIHRoZWFkVGhQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZVxuICAgICAgXVxuXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIC4uLmNvbHVtbi5oZWFkZXJTdHlsZSxcbiAgICAgICAgLi4udGhlYWRUaFByb3BzLnN0eWxlLFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5zdHlsZVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN0ID0ge1xuICAgICAgICAuLi50aGVhZFRoUHJvcHMucmVzdCxcbiAgICAgICAgLi4uY29sdW1uSGVhZGVyUHJvcHMucmVzdFxuICAgICAgfVxuXG4gICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSB7XG4gICAgICAgIGlmIChjb2x1bW4ucGl2b3RDb2x1bW5zKSB7XG4gICAgICAgICAgY29uc3QgcGl2b3RTb3J0ID0gc29ydGluZy5maW5kKGQgPT4gZC5pZCA9PT0gY29sdW1uLmlkKVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGhDb21wb25lbnRcbiAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgJ3J0LXBpdm90LWhlYWRlcicsXG4gICAgICAgICAgICAgICAgY29sdW1uLnNvcnRhYmxlICYmICctY3Vyc29yLXBvaW50ZXInLFxuICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgcGl2b3RTb3J0ID8gKHBpdm90U29ydC5kZXNjID8gJy1zb3J0LWRlc2MnIDogJy1zb3J0LWFzYycpIDogJydcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHRvZ2dsZVNvcnQ9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29sdW1uLnNvcnRhYmxlICYmIHRoaXMuc29ydENvbHVtbihjb2x1bW4ucGl2b3RDb2x1bW5zLCBlLnNoaWZ0S2V5KVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NvbHVtbi5waXZvdENvbHVtbnMubWFwKChwaXZvdENvbHVtbiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e3Bpdm90Q29sdW1uLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KHBpdm90Q29sdW1uLmhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIHtpIDwgY29sdW1uLnBpdm90Q29sdW1ucy5sZW5ndGggLSAxICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5kZXJDb21wb25lbnQgLz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9UaENvbXBvbmVudD5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8VGhDb21wb25lbnRcbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgJ3J0LWV4cGFuZGVyLWhlYWRlcicsXG4gICAgICAgICAgICAgIGNsYXNzZXNcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICAgIGZsZXg6IGAwIDAgYXV0b2AsXG4gICAgICAgICAgICAgIHdpZHRoOiBgJHtleHBhbmRlckNvbHVtbldpZHRofXB4YFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoQ29tcG9uZW50XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBzb3J0ID8gKHNvcnQuZGVzYyA/ICctc29ydC1kZXNjJyA6ICctc29ydC1hc2MnKSA6ICcnLFxuICAgICAgICAgICAgY29sdW1uLnNvcnRhYmxlICYmICctY3Vyc29yLXBvaW50ZXInLFxuICAgICAgICAgICAgIXNob3cgJiYgJy1oaWRkZW4nLFxuICAgICAgICAgICl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGBcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRvZ2dsZVNvcnQ9eyhlKSA9PiB7XG4gICAgICAgICAgICBjb2x1bW4uc29ydGFibGUgJiYgdGhpcy5zb3J0Q29sdW1uKGNvbHVtbiwgZS5zaGlmdEtleSlcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5oZWFkZXIsIHtcbiAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXG4gICAgICAgICAgICBjb2x1bW46IGNvbHVtblxuICAgICAgICAgIH0pfVxuICAgICAgICA8L1RoQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3QgdGhlYWRGaWx0ZXJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEZpbHRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIGNvbnN0IHRoZWFkRmlsdGVyVHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEZpbHRlclRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoZWFkQ29tcG9uZW50XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctZmlsdGVycycsIHRoZWFkRmlsdGVyUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4udGhlYWRGaWx0ZXJQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGBcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi50aGVhZEZpbHRlclByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhlYWRGaWx0ZXJUclByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZEZpbHRlclRyUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4udGhlYWRGaWx0ZXJUclByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcChtYWtlRmlsdGVyKX1cbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICA8L1RoZWFkQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VGaWx0ZXIgPSAoY29sdW1uLCBpKSA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxuICAgICAgY29uc3QgbWF4V2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4ud2lkdGgsIGNvbHVtbi5tYXhXaWR0aClcbiAgICAgIGNvbnN0IHRoZWFkRmlsdGVyVGhQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEZpbHRlclRoUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxuICAgICAgY29uc3QgY29sdW1uSGVhZGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldEhlYWRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcblxuICAgICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgICAgY29sdW1uLmhlYWRlckNsYXNzTmFtZSxcbiAgICAgICAgdGhlYWRGaWx0ZXJUaFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgY29sdW1uSGVhZGVyUHJvcHMuY2xhc3NOYW1lXG4gICAgICBdXG5cbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgLi4uY29sdW1uLmhlYWRlclN0eWxlLFxuICAgICAgICAuLi50aGVhZEZpbHRlclRoUHJvcHMuc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnN0eWxlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3QgPSB7XG4gICAgICAgIC4uLnRoZWFkRmlsdGVyVGhQcm9wcy5yZXN0LFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcbiAgICAgICAgaWYgKGNvbHVtbi5waXZvdENvbHVtbnMpIHtcbiAgICAgICAgICBjb25zdCBwaXZvdENvbHMgPSBbXVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1uLnBpdm90Q29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29sID0gY29sdW1uLnBpdm90Q29sdW1uc1tpXVxuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZmlsdGVyaW5nLmZpbmQoZmlsdGVyID0+IGZpbHRlci5pZCA9PT0gY29sdW1uLmlkICYmIGZpbHRlci5waXZvdElkID09PSBjb2wuaWQpXG4gICAgICAgICAgICBwaXZvdENvbHMucHVzaChcbiAgICAgICAgICAgICAgPHNwYW4ga2V5PXtjb2wuaWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tmbGV4OiAxfX0+XG4gICAgICAgICAgICAgICAgeyFjb2wuaGlkZUZpbHRlciA/IChcbiAgICAgICAgICAgICAgICAgIF8ubm9ybWFsaXplQ29tcG9uZW50KGNvbC5maWx0ZXJSZW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlOiAodmFsdWUpID0+ICh0aGlzLmZpbHRlckNvbHVtbihjb2x1bW4sIHZhbHVlLCBjb2wpKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0cy5jb2x1bW4uZmlsdGVyUmVuZGVyXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGlmIChpIDwgY29sdW1uLnBpdm90Q29sdW1ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgIHBpdm90Q29scy5wdXNoKDxFeHBhbmRlckNvbXBvbmVudCBrZXk9e2NvbC5pZCArICctJyArIGl9IC8+KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRoQ29tcG9uZW50XG4gICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAgICdydC1waXZvdC1oZWFkZXInLFxuICAgICAgICAgICAgICAgIGNvbHVtbi5zb3J0YWJsZSAmJiAnLWN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtwaXZvdENvbHN9XG4gICAgICAgICAgICA8L1RoQ29tcG9uZW50PlxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAncnQtZXhwYW5kZXItaGVhZGVyJyxcbiAgICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgICAgZmxleDogYDAgMCBhdXRvYCxcbiAgICAgICAgICAgICAgd2lkdGg6IGAke2V4cGFuZGVyQ29sdW1uV2lkdGh9cHhgXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWx0ZXIgPSBmaWx0ZXJpbmcuZmluZChmaWx0ZXIgPT4gZmlsdGVyLmlkID09PSBjb2x1bW4uaWQpXG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXG4gICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7IWNvbHVtbi5oaWRlRmlsdGVyID8gKFxuICAgICAgICAgICAgXy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLmZpbHRlclJlbmRlcixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgb25GaWx0ZXJDaGFuZ2U6ICh2YWx1ZSkgPT4gKHRoaXMuZmlsdGVyQ29sdW1uKGNvbHVtbiwgdmFsdWUpKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkZWZhdWx0cy5jb2x1bW4uZmlsdGVyUmVuZGVyXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvVGhDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZVBhZ2VSb3cgPSAocm93LCBpLCBwYXRoID0gW10pID0+IHtcbiAgICAgIGNvbnN0IHJvd0luZm8gPSB7XG4gICAgICAgIHJvdzogcm93Ll9fb3JpZ2luYWwsXG4gICAgICAgIHJvd1ZhbHVlczogcm93LFxuICAgICAgICBpbmRleDogcm93Ll9faW5kZXgsXG4gICAgICAgIHZpZXdJbmRleDogKytyb3dJbmRleCxcbiAgICAgICAgbGV2ZWw6IHBhdGgubGVuZ3RoLFxuICAgICAgICBuZXN0aW5nUGF0aDogcGF0aC5jb25jYXQoW2ldKSxcbiAgICAgICAgYWdncmVnYXRlZDogISFyb3dbc3ViUm93c0tleV0sXG4gICAgICAgIHN1YlJvd3M6IHJvd1tzdWJSb3dzS2V5XVxuICAgICAgfVxuICAgICAgY29uc3QgaXNFeHBhbmRlZCA9IF8uZ2V0KGV4cGFuZGVkUm93cywgcm93SW5mby5uZXN0aW5nUGF0aClcbiAgICAgIGNvbnN0IHRyR3JvdXBQcm9wcyA9IGdldFRyR3JvdXBQcm9wcyhmaW5hbFN0YXRlLCByb3dJbmZvLCB1bmRlZmluZWQsIHRoaXMpXG4gICAgICBjb25zdCB0clByb3BzID0gXy5zcGxpdFByb3BzKGdldFRyUHJvcHMoZmluYWxTdGF0ZSwgcm93SW5mbywgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUckdyb3VwQ29tcG9uZW50XG4gICAgICAgICAga2V5PXtyb3dJbmZvLm5lc3RpbmdQYXRoLmpvaW4oJ18nKX1cbiAgICAgICAgICB7Li4udHJHcm91cFByb3BzfVxuICAgICAgICA+XG4gICAgICAgICAgPFRyQ29tcG9uZW50XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgIHRyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICByb3cuX3ZpZXdJbmRleCAlIDIgPyAnLWV2ZW4nIDogJy1vZGQnXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3RyUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4udHJQcm9wcy5yZXN0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthbGxWaXNpYmxlQ29sdW1ucy5tYXAoKGNvbHVtbiwgaTIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xuICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxuICAgICAgICAgICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxuICAgICAgICAgICAgICBjb25zdCB0ZFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRkUHJvcHMoZmluYWxTdGF0ZSwgcm93SW5mbywgY29sdW1uLCB0aGlzKSlcbiAgICAgICAgICAgICAgY29uc3QgY29sdW1uUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldFByb3BzKGZpbmFsU3RhdGUsIHJvd0luZm8sIGNvbHVtbiwgdGhpcykpXG5cbiAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgICAgICAgICAgICB0ZFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNvbHVtblByb3BzLmNsYXNzTmFtZVxuICAgICAgICAgICAgICBdXG5cbiAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAgICAgICAgIC4uLnRkUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgIC4uLmNvbHVtblByb3BzLnN0eWxlXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb25UZENsaWNrID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChvbkV4cGFuZFJvdykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb25FeHBhbmRSb3cocm93SW5mby5uZXN0aW5nUGF0aCwgZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGxldCBuZXdFeHBhbmRlZFJvd3MgPSBfLmNsb25lKGV4cGFuZGVkUm93cylcbiAgICAgICAgICAgICAgICAgIGlmIChpc0V4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkUm93czogXy5zZXQobmV3RXhwYW5kZWRSb3dzLCByb3dJbmZvLm5lc3RpbmdQYXRoLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFJvd3M6IF8uc2V0KG5ld0V4cGFuZGVkUm93cywgcm93SW5mby5uZXN0aW5nUGF0aCwge30pXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW4ucGl2b3RDb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHBpdm90IGV4cGFuZGVyIGNlbGxcbiAgICAgICAgICAgICAgICAgIGNvbnN0IFBpdm90Q2VsbCA9IGNvbHVtbi5waXZvdFJlbmRlclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPFRkQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtpMn1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAncnQtcGl2b3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiByb3dJbmZvLm5lc3RpbmdQYXRoLmxlbmd0aCA9PT0gMSA/IHVuZGVmaW5lZCA6IGAkezMwICogKHJvd0luZm8ubmVzdGluZ1BhdGgubGVuZ3RoIC0gMSl9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgey4uLnRkUHJvcHMucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblRkQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7cm93SW5mby5zdWJSb3dzID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbmRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQ9e2lzRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2x1bW4gJiYgY29sdW1uLnBpdm90UmVuZGVyID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQaXZvdENlbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5yb3dJbmZvfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Jvd0luZm8ucm93VmFsdWVzW3Bpdm90VmFsS2V5XX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogPHNwYW4+e3Jvd1twaXZvdFZhbEtleV19ICh7cm93SW5mby5zdWJSb3dzLmxlbmd0aH0pPC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApIDogU3ViQ29tcG9uZW50ID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbmRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQ9e2lzRXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSByZWd1bGFyIGV4cGFuZGVyIGNlbGxcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPFRkQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIGtleT17aTJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgICAgICAgICAgIHtoaWRkZW46ICFzaG93fVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBgMCAwIGF1dG9gLFxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHtleHBhbmRlckNvbHVtbldpZHRofXB4YFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblRkQ2xpY2t9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxFeHBhbmRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFeHBhbmRlZD17aXNFeHBhbmRlZH1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L1RkQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIFJldHVybiByZWd1bGFyIGNlbGxcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgIGtleT17aTJ9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgICFzaG93ICYmICdoaWRkZW4nXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHsuLi50ZFByb3BzLnJlc3R9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5yZW5kZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucm93SW5mbyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvd0luZm8ucm93VmFsdWVzW2NvbHVtbi5pZF1cbiAgICAgICAgICAgICAgICAgIH0sIHJvd0luZm8ucm93VmFsdWVzW2NvbHVtbi5pZF0pfVxuICAgICAgICAgICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XG4gICAgICAgICAgeyhcbiAgICAgICAgICAgIHJvd0luZm8uc3ViUm93cyAmJlxuICAgICAgICAgICAgaXNFeHBhbmRlZCAmJlxuICAgICAgICAgICAgcm93SW5mby5zdWJSb3dzLm1hcCgoZCwgaSkgPT4gbWFrZVBhZ2VSb3coZCwgaSwgcm93SW5mby5uZXN0aW5nUGF0aCkpXG4gICAgICAgICAgKX1cbiAgICAgICAgICB7U3ViQ29tcG9uZW50ICYmICFyb3dJbmZvLnN1YlJvd3MgJiYgaXNFeHBhbmRlZCAmJiBTdWJDb21wb25lbnQocm93SW5mbyl9XG4gICAgICAgIDwvVHJHcm91cENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlUGFkUm93ID0gKHJvdywgaSkgPT4ge1xuICAgICAgY29uc3QgdHJHcm91cFByb3BzID0gZ2V0VHJHcm91cFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxuICAgICAgY29uc3QgdHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUckdyb3VwQ29tcG9uZW50XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIHsuLi50ckdyb3VwUHJvcHN9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgJy1wYWRSb3cnLFxuICAgICAgICAgICAgICB0clByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17dHJQcm9wcy5zdHlsZSB8fCB7fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YWxsVmlzaWJsZUNvbHVtbnMubWFwKChjb2x1bW4sIGkyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNob3cgPSB0eXBlb2YgY29sdW1uLnNob3cgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4uc2hvdygpIDogY29sdW1uLnNob3dcbiAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgICAgICAgICAgY29uc3QgbWF4V2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4ud2lkdGgsIGNvbHVtbi5tYXhXaWR0aClcbiAgICAgICAgICAgICAgY29uc3QgdGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcbiAgICAgICAgICAgICAgY29uc3QgY29sdW1uUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcblxuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgICAgICAgICAgIHRkUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgY29sdW1uUHJvcHMuY2xhc3NOYW1lXG4gICAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udGRQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uUHJvcHMuc3R5bGVcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRkQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICBrZXk9e2kyfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgICAgICAgICAhc2hvdyAmJiAnaGlkZGVuJ1xuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGBcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICB7Li4udGRQcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XG4gICAgICAgIDwvVHJHcm91cENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlQ29sdW1uRm9vdGVycyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRGb290UHJvcHMgPSBnZXRUZm9vdFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxuICAgICAgY29uc3QgdEZvb3RUclByb3BzID0gXy5zcGxpdFByb3BzKGdldFRmb290VHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGZvb3RDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e3RGb290UHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi50Rm9vdFByb3BzLnN0eWxlLFxuICAgICAgICAgICAgbWluV2lkdGg6IGAke3Jvd01pbldpZHRofXB4YFxuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnRGb290UHJvcHMucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIDxUckNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICB0Rm9vdFRyUHJvcHMuY2xhc3NOYW1lXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3RGb290VHJQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi50Rm9vdFRyUHJvcHMucmVzdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YWxsVmlzaWJsZUNvbHVtbnMubWFwKChjb2x1bW4sIGkyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNob3cgPSB0eXBlb2YgY29sdW1uLnNob3cgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4uc2hvdygpIDogY29sdW1uLnNob3dcbiAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgICAgICAgICAgY29uc3QgbWF4V2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4ud2lkdGgsIGNvbHVtbi5tYXhXaWR0aClcbiAgICAgICAgICAgICAgY29uc3QgdEZvb3RUZFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRmb290VGRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICAgICAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG4gICAgICAgICAgICAgIGNvbnN0IGNvbHVtbkZvb3RlclByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRGb290ZXJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG5cbiAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgICAgICAgICAgICB0Rm9vdFRkUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgY29sdW1uUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNvbHVtbkZvb3RlclByb3BzLmNsYXNzTmFtZVxuICAgICAgICAgICAgICBdXG5cbiAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAgICAgICAgIC4uLnRGb290VGRQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uRm9vdGVyUHJvcHMuc3R5bGVcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uLnBpdm90Q29sdW1ucykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPFRkQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtpMn1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAncnQtcGl2b3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGBcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIHsuLi5jb2x1bW5Qcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAgICAgICAgIHsuLi50Rm9vdFRkUHJvcHMucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgICB7Li4uY29sdW1uRm9vdGVyUHJvcHMucmVzdH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4uZm9vdGVyKX1cbiAgICAgICAgICAgICAgICAgICAgPC9UZENvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHJlZ3VsYXIgZXhwYW5kZXIgY2VsbFxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpMn1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgICAge2hpZGRlbjogIXNob3d9XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IGAwIDAgYXV0b2AsXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2V4cGFuZGVyQ29sdW1uV2lkdGh9cHhgXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIFJldHVybiByZWd1bGFyIGNlbGxcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgIGtleT17aTJ9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgICAgICFzaG93ICYmICdoaWRkZW4nXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHsuLi5jb2x1bW5Qcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAgICAgey4uLnRGb290VGRQcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAgICAgey4uLmNvbHVtbkZvb3RlclByb3BzLnJlc3R9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5mb290ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc29ydGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjb2x1bW5cbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XG4gICAgICAgIDwvVGZvb3RDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3Qgcm9vdFByb3BzID0gXy5zcGxpdFByb3BzKGdldFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICBjb25zdCB0YWJsZVByb3BzID0gXy5zcGxpdFByb3BzKGdldFRhYmxlUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgIGNvbnN0IHRCb2R5UHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGJvZHlQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgY29uc3QgcGFnaW5hdGlvblByb3BzID0gXy5zcGxpdFByb3BzKGdldFBhZ2luYXRpb25Qcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgY29uc3QgbG9hZGluZ1Byb3BzID0gZ2V0TG9hZGluZ1Byb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxuICAgIGNvbnN0IG5vRGF0YVByb3BzID0gZ2V0Tm9EYXRhUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXG5cbiAgICBjb25zdCBtYWtlVGFibGUgPSAoKSA9PiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAnUmVhY3RUYWJsZScsXG4gICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgIHJvb3RQcm9wcy5jbGFzc05hbWVcbiAgICAgICAgKX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5zdHlsZSxcbiAgICAgICAgICAuLi5yb290UHJvcHMuc3R5bGVcbiAgICAgICAgfX1cbiAgICAgICAgey4uLnJvb3RQcm9wcy5yZXN0fVxuICAgICAgPlxuICAgICAgICA8VGFibGVDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXModGFibGVQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgIHN0eWxlPXt0YWJsZVByb3BzLnN0eWxlfVxuICAgICAgICAgIHsuLi50YWJsZVByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7aGFzSGVhZGVyR3JvdXBzID8gbWFrZUhlYWRlckdyb3VwcygpIDogbnVsbH1cbiAgICAgICAgICB7bWFrZUhlYWRlcnMoKX1cbiAgICAgICAgICB7c2hvd0ZpbHRlcnMgPyBtYWtlRmlsdGVycygpIDogbnVsbH1cbiAgICAgICAgICA8VGJvZHlDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0Qm9keVByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAuLi50Qm9keVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgey4uLnRCb2R5UHJvcHMucmVzdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cGFnZVJvd3MubWFwKChkLCBpKSA9PiBtYWtlUGFnZVJvdyhkLCBpKSl9XG4gICAgICAgICAgICB7cGFkUm93cy5tYXAobWFrZVBhZFJvdyl9XG4gICAgICAgICAgPC9UYm9keUNvbXBvbmVudD5cbiAgICAgICAgICB7aGFzQ29sdW1uRm9vdGVyID8gbWFrZUNvbHVtbkZvb3RlcnMoKSA6IG51bGx9XG4gICAgICAgIDwvVGFibGVDb21wb25lbnQ+XG4gICAgICAgIHtzaG93UGFnaW5hdGlvbiA/IChcbiAgICAgICAgICA8UGFnaW5hdGlvbkNvbXBvbmVudFxuICAgICAgICAgICAgey4uLnJlc29sdmVkU3RhdGV9XG4gICAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgICBjYW5QcmV2aW91cz17Y2FuUHJldmlvdXN9XG4gICAgICAgICAgICBjYW5OZXh0PXtjYW5OZXh0fVxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLm9uUGFnZUNoYW5nZX1cbiAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMub25QYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17cGFnaW5hdGlvblByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0eWxlPXtwYWdpbmF0aW9uUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4ucGFnaW5hdGlvblByb3BzLnJlc3R9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshcGFnZVJvd3MubGVuZ3RoICYmIChcbiAgICAgICAgICA8Tm9EYXRhQ29tcG9uZW50XG4gICAgICAgICAgICB7Li4ubm9EYXRhUHJvcHN9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KG5vRGF0YVRleHQpfVxuICAgICAgICAgIDwvTm9EYXRhQ29tcG9uZW50PlxuICAgICAgICApfVxuICAgICAgICA8TG9hZGluZ0NvbXBvbmVudFxuICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgbG9hZGluZ1RleHQ9e2xvYWRpbmdUZXh0fVxuICAgICAgICAgIHsuLi5sb2FkaW5nUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG5cbiAgICAvLyBjaGlsZFByb3BzIGFyZSBvcHRpb25hbGx5IHBhc3NlZCB0byBhIGZ1bmN0aW9uLWFzLWEtY2hpbGRcbiAgICByZXR1cm4gY2hpbGRyZW4gPyBjaGlsZHJlbihmaW5hbFN0YXRlLCBtYWtlVGFibGUsIHRoaXMpIDogbWFrZVRhYmxlKClcbiAgfVxufSlcbiJdfQ==
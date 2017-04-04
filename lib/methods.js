'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  getDataModel: function getDataModel(newState) {
    var _this = this;

    var columns = newState.columns;
    var _newState$pivotBy = newState.pivotBy;
    var pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy;
    var data = newState.data;
    var pivotIDKey = newState.pivotIDKey;
    var pivotValKey = newState.pivotValKey;
    var subRowsKey = newState.subRowsKey;
    var expanderColumnWidth = newState.expanderColumnWidth;
    var SubComponent = newState.SubComponent;

    // Determine Header Groups

    var hasHeaderGroups = false;
    columns.forEach(function (column) {
      if (column.columns) {
        hasHeaderGroups = true;
      }
    });

    // Build Header Groups
    var headerGroups = [];
    var currentSpan = [];

    // A convenience function to add a header and reset the currentSpan
    var addHeader = function addHeader(columns) {
      var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : columns[0];

      headerGroups.push(_extends({}, _this.props.column, column, {
        columns: columns
      }));
      currentSpan = [];
    };

    var noSubExpanderColumns = columns.map(function (col) {
      return _extends({}, col, {
        columns: col.columns ? col.columns.filter(function (d) {
          return !d.expander;
        }) : undefined
      });
    });

    var expanderColumnIndex = columns.findIndex(function (col) {
      return col.expander;
    });
    var needsExpander = (SubComponent || pivotBy.length) && expanderColumnIndex === -1;
    var columnsWithExpander = needsExpander ? [{ expander: true }].concat(_toConsumableArray(noSubExpanderColumns)) : noSubExpanderColumns;
    if (needsExpander) {
      expanderColumnIndex = 0;
    }

    var makeDecoratedColumn = function makeDecoratedColumn(column) {
      var dcol = _extends({}, _this.props.column, column);

      if (dcol.expander) {
        dcol.width = expanderColumnWidth;
        return dcol;
      }

      if (typeof dcol.accessor === 'string') {
        dcol.id = dcol.id || dcol.accessor;
        var accessorString = dcol.accessor;
        dcol.accessor = function (row) {
          return _utils2.default.get(row, accessorString);
        };
        return dcol;
      }

      if (dcol.accessor && !dcol.id) {
        console.warn(dcol);
        throw new Error('A column id is required if using a non-string accessor for column above.');
      }

      if (!dcol.accessor) {
        dcol.accessor = function (d) {
          return undefined;
        };
      }

      // Ensure minWidth is not greater than maxWidth if set
      if (dcol.maxWidth < dcol.minWidth) {
        dcol.minWidth = dcol.maxWidth;
      }

      return dcol;
    };

    // Decorate the columns
    var decorateAndAddToAll = function decorateAndAddToAll(col) {
      var decoratedColumn = makeDecoratedColumn(col);
      allDecoratedColumns.push(decoratedColumn);
      return decoratedColumn;
    };
    var allDecoratedColumns = [];
    var decoratedColumns = columnsWithExpander.map(function (column, i) {
      if (column.columns) {
        return _extends({}, column, {
          columns: column.columns.map(decorateAndAddToAll)
        });
      } else {
        return decorateAndAddToAll(column);
      }
    });

    // Build the visible columns, headers and flat column list
    var visibleColumns = decoratedColumns.slice();
    var allVisibleColumns = [];

    visibleColumns = visibleColumns.map(function (column, i) {
      if (column.columns) {
        var visibleSubColumns = column.columns.filter(function (d) {
          return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
        });
        return _extends({}, column, {
          columns: visibleSubColumns
        });
      }
      return column;
    });

    visibleColumns = visibleColumns.filter(function (column) {
      return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
    });

    // Move the pivot columns into a single column if needed
    if (pivotBy.length) {
      var pivotColumns = [];
      for (var i = 0; i < allDecoratedColumns.length; i++) {
        if (pivotBy.indexOf(allDecoratedColumns[i].id) > -1) {
          pivotColumns.push(allDecoratedColumns[i]);
        }
      }
      var _pivotColumn = _extends({}, pivotColumns[0], {
        pivotColumns: pivotColumns,
        expander: true
      });
      visibleColumns[expanderColumnIndex] = _pivotColumn;
    }

    // Build flast list of allVisibleColumns and HeaderGroups
    visibleColumns.forEach(function (column, i) {
      if (column.columns) {
        allVisibleColumns = allVisibleColumns.concat(column.columns);
        if (currentSpan.length > 0) {
          addHeader(currentSpan);
        }
        addHeader(column.columns, column);
        return;
      }
      allVisibleColumns.push(column);
      currentSpan.push(column);
    });
    if (hasHeaderGroups && currentSpan.length > 0) {
      addHeader(currentSpan);
    }

    // Access the data
    var resolvedData = data.map(function (d, i) {
      var row = {
        __original: d,
        __index: i
      };
      allDecoratedColumns.forEach(function (column) {
        if (column.expander) return;
        row[column.id] = column.accessor(d);
      });
      return row;
    });

    // If pivoting, recursively group the data
    var aggregate = function aggregate(rows) {
      var aggregationValues = {};
      aggregatingColumns.forEach(function (column) {
        var values = rows.map(function (d) {
          return d[column.id];
        });
        aggregationValues[column.id] = column.aggregate(values, rows);
      });
      return aggregationValues;
    };
    var standardColumns = pivotBy.length ? allVisibleColumns.slice(1) : allVisibleColumns;
    var aggregatingColumns = standardColumns.filter(function (d) {
      return d.aggregate;
    });
    var pivotColumn = void 0;
    if (pivotBy.length) {
      pivotColumn = allVisibleColumns[0];
      var groupRecursively = function groupRecursively(rows, keys) {
        var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        // This is the last level, just return the rows
        if (i === keys.length) {
          return rows;
        }
        // Group the rows together for this level
        var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
          var _ref3;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _ref3;
        });
        // Recurse into the subRows
        groupedRows = groupedRows.map(function (rowGroup) {
          var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
          return _extends({}, rowGroup, _defineProperty({}, subRowsKey, subRows), aggregate(subRows));
        });
        return groupedRows;
      };
      resolvedData = groupRecursively(resolvedData, pivotBy);
    }

    return _extends({}, newState, {
      resolvedData: resolvedData,
      pivotColumn: pivotColumn,
      allVisibleColumns: allVisibleColumns,
      headerGroups: headerGroups,
      allDecoratedColumns: allDecoratedColumns,
      hasHeaderGroups: hasHeaderGroups
    });
  },
  getSortedData: function getSortedData(resolvedState) {
    var manual = resolvedState.manual;
    var sorting = resolvedState.sorting;
    var filtering = resolvedState.filtering;
    var showFilters = resolvedState.showFilters;
    var defaultFilterMethod = resolvedState.defaultFilterMethod;
    var resolvedData = resolvedState.resolvedData;
    var allVisibleColumns = resolvedState.allVisibleColumns;

    // Resolve the data from either manual data or sorted data

    return {
      sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, showFilters, filtering, defaultFilterMethod, allVisibleColumns), sorting)
    };
  },
  fireOnChange: function fireOnChange() {
    this.props.onChange(this.getResolvedState(), this);
  },
  getPropOrState: function getPropOrState(key) {
    return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
  },
  getStateOrProp: function getStateOrProp(key) {
    return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
  },
  filterData: function filterData(data, showFilters, filtering, defaultFilterMethod, allVisibleColumns) {
    var _this2 = this;

    var filteredData = data;

    if (showFilters && filtering.length) {
      filteredData = filtering.reduce(function (filteredSoFar, nextFilter) {
        return filteredSoFar.filter(function (row) {
          var column = void 0;

          if (nextFilter.pivotId) {
            var parentColumn = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });
            column = parentColumn.pivotColumns.find(function (x) {
              return x.id === nextFilter.pivotId;
            });
          } else {
            column = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });
          }

          var filterMethod = column.filterMethod || defaultFilterMethod;

          return filterMethod(nextFilter, row, column);
        });
      }, filteredData);

      // Apply the filter to the subrows if we are pivoting, and then
      // filter any rows without subcolumns because it would be strange to show
      filteredData = filteredData.map(function (row) {
        if (!row[_this2.props.subRowsKey]) {
          return row;
        }
        return _extends({}, row, _defineProperty({}, _this2.props.subRowsKey, _this2.filterData(row[_this2.props.subRowsKey], showFilters, filtering, defaultFilterMethod, allVisibleColumns)));
      }).filter(function (row) {
        if (!row[_this2.props.subRowsKey]) {
          return true;
        }
        return row[_this2.props.subRowsKey].length > 0;
      });
    }

    return filteredData;
  },
  sortData: function sortData(data, sorting) {
    var _this3 = this;

    if (!sorting.length) {
      return data;
    }

    var sorted = _utils2.default.orderBy(data, sorting.map(function (sort) {
      return function (row) {
        if (row[sort.id] === null || row[sort.id] === undefined) {
          return -Infinity;
        }
        return typeof row[sort.id] === 'string' ? row[sort.id].toLowerCase() : row[sort.id];
      };
    }), sorting.map(function (d) {
      return !d.desc;
    }));

    return sorted.map(function (row) {
      if (!row[_this3.props.subRowsKey]) {
        return row;
      }
      return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.sortData(row[_this3.props.subRowsKey], sorting)));
    });
  },
  getMinRows: function getMinRows() {
    return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
  },


  // User actions
  onPageChange: function onPageChange(page) {
    var _this4 = this;

    var _props = this.props;
    var onPageChange = _props.onPageChange;
    var collapseOnPageChange = _props.collapseOnPageChange;

    if (onPageChange) {
      return onPageChange(page);
    }
    var newState = { page: page };
    if (collapseOnPageChange) {
      newState.expandedRows = {};
    }
    this.setStateWithData(newState, function () {
      _this4.fireOnChange();
    });
  },
  onPageSizeChange: function onPageSizeChange(newPageSize) {
    var _this5 = this;

    var onPageSizeChange = this.props.onPageSizeChange;

    var _getResolvedState = this.getResolvedState();

    var pageSize = _getResolvedState.pageSize;
    var page = _getResolvedState.page;

    // Normalize the page to display

    var currentRow = pageSize * page;
    var newPage = Math.floor(currentRow / newPageSize);

    if (onPageSizeChange) {
      return onPageSizeChange(newPageSize, newPage);
    }

    this.setStateWithData({
      pageSize: newPageSize,
      page: newPage
    }, function () {
      _this5.fireOnChange();
    });
  },
  sortColumn: function sortColumn(column, additive) {
    var _this6 = this;

    var _getResolvedState2 = this.getResolvedState();

    var sorting = _getResolvedState2.sorting;
    var onSortingChange = this.props.onSortingChange;

    if (onSortingChange) {
      return onSortingChange(column, additive);
    }
    var newSorting = _utils2.default.clone(sorting || []).map(function (d) {
      d.desc = _utils2.default.isSortingDesc(d);
      return d;
    });
    if (!_utils2.default.isArray(column)) {
      // Single-Sort
      var existingIndex = newSorting.findIndex(function (d) {
        return d.id === column.id;
      });
      if (existingIndex > -1) {
        var existing = newSorting[existingIndex];
        if (existing.desc) {
          if (additive) {
            newSorting.splice(existingIndex, 1);
          } else {
            existing.desc = false;
            newSorting = [existing];
          }
        } else {
          existing.desc = true;
          if (!additive) {
            newSorting = [existing];
          }
        }
      } else {
        if (additive) {
          newSorting.push({
            id: column.id,
            desc: false
          });
        } else {
          newSorting = [{
            id: column.id,
            desc: false
          }];
        }
      }
    } else {
      // Multi-Sort
      var _existingIndex = newSorting.findIndex(function (d) {
        return d.id === column[0].id;
      });
      // Existing Sorted Column
      if (_existingIndex > -1) {
        var _existing = newSorting[_existingIndex];
        if (_existing.desc) {
          if (additive) {
            newSorting.splice(_existingIndex, column.length);
          } else {
            column.forEach(function (d, i) {
              newSorting[_existingIndex + i].desc = false;
            });
          }
        } else {
          column.forEach(function (d, i) {
            newSorting[_existingIndex + i].desc = true;
          });
        }
        if (!additive) {
          newSorting = newSorting.slice(_existingIndex, column.length);
        }
      } else {
        // New Sort Column
        if (additive) {
          newSorting = newSorting.concat(column.map(function (d) {
            return {
              id: d.id,
              desc: false
            };
          }));
        } else {
          newSorting = column.map(function (d) {
            return {
              id: d.id,
              desc: false
            };
          });
        }
      }
    }
    this.setStateWithData({
      page: !sorting.length && newSorting.length || !additive ? 0 : this.state.page,
      sorting: newSorting
    }, function () {
      _this6.fireOnChange();
    });
  },
  filterColumn: function filterColumn(column, value, pivotColumn) {
    var _this7 = this;

    var _getResolvedState3 = this.getResolvedState();

    var filtering = _getResolvedState3.filtering;
    var onFilteringChange = this.props.onFilteringChange;


    if (onFilteringChange) {
      return onFilteringChange(column, value);
    }

    // Remove old filter first if it exists
    var newFiltering = (filtering || []).filter(function (x) {
      if (x.id !== column.id) {
        return true;
      }
      if (x.pivotId) {
        if (pivotColumn) {
          return x.pivotId !== pivotColumn.id;
        }
        return true;
      }
    });

    if (value !== '') {
      newFiltering.push({
        id: column.id,
        value: value,
        pivotId: pivotColumn ? pivotColumn.id : undefined
      });
    }

    this.setStateWithData({
      filtering: newFiltering
    }, function () {
      _this7.fireOnChange();
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbImdldERhdGFNb2RlbCIsIm5ld1N0YXRlIiwiY29sdW1ucyIsInBpdm90QnkiLCJkYXRhIiwicGl2b3RJREtleSIsInBpdm90VmFsS2V5Iiwic3ViUm93c0tleSIsImV4cGFuZGVyQ29sdW1uV2lkdGgiLCJTdWJDb21wb25lbnQiLCJoYXNIZWFkZXJHcm91cHMiLCJmb3JFYWNoIiwiY29sdW1uIiwiaGVhZGVyR3JvdXBzIiwiY3VycmVudFNwYW4iLCJhZGRIZWFkZXIiLCJwdXNoIiwicHJvcHMiLCJub1N1YkV4cGFuZGVyQ29sdW1ucyIsIm1hcCIsImNvbCIsImZpbHRlciIsImQiLCJleHBhbmRlciIsInVuZGVmaW5lZCIsImV4cGFuZGVyQ29sdW1uSW5kZXgiLCJmaW5kSW5kZXgiLCJuZWVkc0V4cGFuZGVyIiwibGVuZ3RoIiwiY29sdW1uc1dpdGhFeHBhbmRlciIsIm1ha2VEZWNvcmF0ZWRDb2x1bW4iLCJkY29sIiwid2lkdGgiLCJhY2Nlc3NvciIsImlkIiwiYWNjZXNzb3JTdHJpbmciLCJnZXQiLCJyb3ciLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwibWF4V2lkdGgiLCJtaW5XaWR0aCIsImRlY29yYXRlQW5kQWRkVG9BbGwiLCJkZWNvcmF0ZWRDb2x1bW4iLCJhbGxEZWNvcmF0ZWRDb2x1bW5zIiwiZGVjb3JhdGVkQ29sdW1ucyIsImkiLCJ2aXNpYmxlQ29sdW1ucyIsInNsaWNlIiwiYWxsVmlzaWJsZUNvbHVtbnMiLCJ2aXNpYmxlU3ViQ29sdW1ucyIsImluZGV4T2YiLCJnZXRGaXJzdERlZmluZWQiLCJzaG93IiwicGl2b3RDb2x1bW5zIiwicGl2b3RDb2x1bW4iLCJjb25jYXQiLCJyZXNvbHZlZERhdGEiLCJfX29yaWdpbmFsIiwiX19pbmRleCIsImFnZ3JlZ2F0ZSIsInJvd3MiLCJhZ2dyZWdhdGlvblZhbHVlcyIsImFnZ3JlZ2F0aW5nQ29sdW1ucyIsInZhbHVlcyIsInN0YW5kYXJkQ29sdW1ucyIsImdyb3VwUmVjdXJzaXZlbHkiLCJrZXlzIiwiZ3JvdXBlZFJvd3MiLCJPYmplY3QiLCJlbnRyaWVzIiwiZ3JvdXBCeSIsImtleSIsInZhbHVlIiwic3ViUm93cyIsInJvd0dyb3VwIiwiZ2V0U29ydGVkRGF0YSIsInJlc29sdmVkU3RhdGUiLCJtYW51YWwiLCJzb3J0aW5nIiwiZmlsdGVyaW5nIiwic2hvd0ZpbHRlcnMiLCJkZWZhdWx0RmlsdGVyTWV0aG9kIiwic29ydGVkRGF0YSIsInNvcnREYXRhIiwiZmlsdGVyRGF0YSIsImZpcmVPbkNoYW5nZSIsIm9uQ2hhbmdlIiwiZ2V0UmVzb2x2ZWRTdGF0ZSIsImdldFByb3BPclN0YXRlIiwic3RhdGUiLCJnZXRTdGF0ZU9yUHJvcCIsImZpbHRlcmVkRGF0YSIsInJlZHVjZSIsImZpbHRlcmVkU29GYXIiLCJuZXh0RmlsdGVyIiwicGl2b3RJZCIsInBhcmVudENvbHVtbiIsImZpbmQiLCJ4IiwiZmlsdGVyTWV0aG9kIiwic29ydGVkIiwib3JkZXJCeSIsInNvcnQiLCJJbmZpbml0eSIsInRvTG93ZXJDYXNlIiwiZGVzYyIsImdldE1pblJvd3MiLCJtaW5Sb3dzIiwib25QYWdlQ2hhbmdlIiwicGFnZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiZXhwYW5kZWRSb3dzIiwic2V0U3RhdGVXaXRoRGF0YSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJuZXdQYWdlU2l6ZSIsInBhZ2VTaXplIiwiY3VycmVudFJvdyIsIm5ld1BhZ2UiLCJNYXRoIiwiZmxvb3IiLCJzb3J0Q29sdW1uIiwiYWRkaXRpdmUiLCJvblNvcnRpbmdDaGFuZ2UiLCJuZXdTb3J0aW5nIiwiY2xvbmUiLCJpc1NvcnRpbmdEZXNjIiwiaXNBcnJheSIsImV4aXN0aW5nSW5kZXgiLCJleGlzdGluZyIsInNwbGljZSIsImZpbHRlckNvbHVtbiIsIm9uRmlsdGVyaW5nQ2hhbmdlIiwibmV3RmlsdGVyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7a0JBRWU7QUFD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LGlCQUFTekMsY0FBY0EsWUFBWXRCLEVBQTFCLEdBQStCVjtBQUh4QixPQUFsQjtBQUtEOztBQUVELFNBQUswRixnQkFBTCxDQUFzQjtBQUNwQmpDLGlCQUFXcUQ7QUFEUyxLQUF0QixFQUVHLFlBQU07QUFDUCxhQUFLL0MsWUFBTDtBQUNELEtBSkQ7QUFLRDtBQTFkWSxDIiwiZmlsZSI6Im1ldGhvZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldERhdGFNb2RlbCAobmV3U3RhdGUpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb2x1bW5zLFxuICAgICAgcGl2b3RCeSA9IFtdLFxuICAgICAgZGF0YSxcbiAgICAgIHBpdm90SURLZXksXG4gICAgICBwaXZvdFZhbEtleSxcbiAgICAgIHN1YlJvd3NLZXksXG4gICAgICBleHBhbmRlckNvbHVtbldpZHRoLFxuICAgICAgU3ViQ29tcG9uZW50XG4gICAgfSA9IG5ld1N0YXRlXG5cbiAgICAvLyBEZXRlcm1pbmUgSGVhZGVyIEdyb3Vwc1xuICAgIGxldCBoYXNIZWFkZXJHcm91cHMgPSBmYWxzZVxuICAgIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgIGhhc0hlYWRlckdyb3VwcyA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gQnVpbGQgSGVhZGVyIEdyb3Vwc1xuICAgIGNvbnN0IGhlYWRlckdyb3VwcyA9IFtdXG4gICAgbGV0IGN1cnJlbnRTcGFuID0gW11cblxuICAgIC8vIEEgY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gYWRkIGEgaGVhZGVyIGFuZCByZXNldCB0aGUgY3VycmVudFNwYW5cbiAgICBjb25zdCBhZGRIZWFkZXIgPSAoY29sdW1ucywgY29sdW1uID0gY29sdW1uc1swXSkgPT4ge1xuICAgICAgaGVhZGVyR3JvdXBzLnB1c2goe1xuICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zXG4gICAgICB9KVxuICAgICAgY3VycmVudFNwYW4gPSBbXVxuICAgIH1cblxuICAgIGNvbnN0IG5vU3ViRXhwYW5kZXJDb2x1bW5zID0gY29sdW1ucy5tYXAoY29sID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvbCxcbiAgICAgICAgY29sdW1uczogY29sLmNvbHVtbnMgPyBjb2wuY29sdW1ucy5maWx0ZXIoZCA9PiAhZC5leHBhbmRlcikgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IGV4cGFuZGVyQ29sdW1uSW5kZXggPSBjb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLmV4cGFuZGVyKVxuICAgIGNvbnN0IG5lZWRzRXhwYW5kZXIgPSAoU3ViQ29tcG9uZW50IHx8IHBpdm90QnkubGVuZ3RoKSAmJiBleHBhbmRlckNvbHVtbkluZGV4ID09PSAtMVxuICAgIGNvbnN0IGNvbHVtbnNXaXRoRXhwYW5kZXIgPSBuZWVkc0V4cGFuZGVyID8gW3tleHBhbmRlcjogdHJ1ZX0sIC4uLm5vU3ViRXhwYW5kZXJDb2x1bW5zXSA6IG5vU3ViRXhwYW5kZXJDb2x1bW5zXG4gICAgaWYgKG5lZWRzRXhwYW5kZXIpIHtcbiAgICAgIGV4cGFuZGVyQ29sdW1uSW5kZXggPSAwXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZURlY29yYXRlZENvbHVtbiA9IChjb2x1bW4pID0+IHtcbiAgICAgIGNvbnN0IGRjb2wgPSB7XG4gICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICAuLi5jb2x1bW5cbiAgICAgIH1cblxuICAgICAgaWYgKGRjb2wuZXhwYW5kZXIpIHtcbiAgICAgICAgZGNvbC53aWR0aCA9IGV4cGFuZGVyQ29sdW1uV2lkdGhcbiAgICAgICAgcmV0dXJuIGRjb2xcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBkY29sLmFjY2Vzc29yID09PSAnc3RyaW5nJykge1xuICAgICAgICBkY29sLmlkID0gZGNvbC5pZCB8fCBkY29sLmFjY2Vzc29yXG4gICAgICAgIGNvbnN0IGFjY2Vzc29yU3RyaW5nID0gZGNvbC5hY2Nlc3NvclxuICAgICAgICBkY29sLmFjY2Vzc29yID0gcm93ID0+IF8uZ2V0KHJvdywgYWNjZXNzb3JTdHJpbmcpXG4gICAgICAgIHJldHVybiBkY29sXG4gICAgICB9XG5cbiAgICAgIGlmIChkY29sLmFjY2Vzc29yICYmICFkY29sLmlkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihkY29sKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgY29sdW1uIGlkIGlzIHJlcXVpcmVkIGlmIHVzaW5nIGEgbm9uLXN0cmluZyBhY2Nlc3NvciBmb3IgY29sdW1uIGFib3ZlLicpXG4gICAgICB9XG5cbiAgICAgIGlmICghZGNvbC5hY2Nlc3Nvcikge1xuICAgICAgICBkY29sLmFjY2Vzc29yID0gZCA9PiB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgLy8gRW5zdXJlIG1pbldpZHRoIGlzIG5vdCBncmVhdGVyIHRoYW4gbWF4V2lkdGggaWYgc2V0XG4gICAgICBpZiAoZGNvbC5tYXhXaWR0aCA8IGRjb2wubWluV2lkdGgpIHtcbiAgICAgICAgZGNvbC5taW5XaWR0aCA9IGRjb2wubWF4V2lkdGhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRjb2xcbiAgICB9XG5cbiAgICAvLyBEZWNvcmF0ZSB0aGUgY29sdW1uc1xuICAgIGNvbnN0IGRlY29yYXRlQW5kQWRkVG9BbGwgPSAoY29sKSA9PiB7XG4gICAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW4gPSBtYWtlRGVjb3JhdGVkQ29sdW1uKGNvbClcbiAgICAgIGFsbERlY29yYXRlZENvbHVtbnMucHVzaChkZWNvcmF0ZWRDb2x1bW4pXG4gICAgICByZXR1cm4gZGVjb3JhdGVkQ29sdW1uXG4gICAgfVxuICAgIGxldCBhbGxEZWNvcmF0ZWRDb2x1bW5zID0gW11cbiAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW5zID0gY29sdW1uc1dpdGhFeHBhbmRlci5tYXAoKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbi5jb2x1bW5zLm1hcChkZWNvcmF0ZUFuZEFkZFRvQWxsKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVjb3JhdGVBbmRBZGRUb0FsbChjb2x1bW4pXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEJ1aWxkIHRoZSB2aXNpYmxlIGNvbHVtbnMsIGhlYWRlcnMgYW5kIGZsYXQgY29sdW1uIGxpc3RcbiAgICBsZXQgdmlzaWJsZUNvbHVtbnMgPSBkZWNvcmF0ZWRDb2x1bW5zLnNsaWNlKClcbiAgICBsZXQgYWxsVmlzaWJsZUNvbHVtbnMgPSBbXVxuXG4gICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgIGNvbnN0IHZpc2libGVTdWJDb2x1bW5zID0gY29sdW1uLmNvbHVtbnMuZmlsdGVyKGQgPT4gcGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGQuc2hvdywgdHJ1ZSkpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIGNvbHVtbnM6IHZpc2libGVTdWJDb2x1bW5zXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2x1bW5cbiAgICB9KVxuXG4gICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5maWx0ZXIoY29sdW1uID0+IHtcbiAgICAgIHJldHVybiBjb2x1bW4uY29sdW1ucyA/IGNvbHVtbi5jb2x1bW5zLmxlbmd0aCA6IHBpdm90QnkuaW5kZXhPZihjb2x1bW4uaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5zaG93LCB0cnVlKVxuICAgIH0pXG5cbiAgICAvLyBNb3ZlIHRoZSBwaXZvdCBjb2x1bW5zIGludG8gYSBzaW5nbGUgY29sdW1uIGlmIG5lZWRlZFxuICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgY29uc3QgcGl2b3RDb2x1bW5zID0gW11cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRGVjb3JhdGVkQ29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocGl2b3RCeS5pbmRleE9mKGFsbERlY29yYXRlZENvbHVtbnNbaV0uaWQpID4gLTEpIHtcbiAgICAgICAgICBwaXZvdENvbHVtbnMucHVzaChhbGxEZWNvcmF0ZWRDb2x1bW5zW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBwaXZvdENvbHVtbiA9IHtcbiAgICAgICAgLi4ucGl2b3RDb2x1bW5zWzBdLFxuICAgICAgICBwaXZvdENvbHVtbnMsXG4gICAgICAgIGV4cGFuZGVyOiB0cnVlXG4gICAgICB9XG4gICAgICB2aXNpYmxlQ29sdW1uc1tleHBhbmRlckNvbHVtbkluZGV4XSA9IHBpdm90Q29sdW1uXG4gICAgfVxuXG4gICAgLy8gQnVpbGQgZmxhc3QgbGlzdCBvZiBhbGxWaXNpYmxlQ29sdW1ucyBhbmQgSGVhZGVyR3JvdXBzXG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpKSA9PiB7XG4gICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMgPSBhbGxWaXNpYmxlQ29sdW1ucy5jb25jYXQoY29sdW1uLmNvbHVtbnMpXG4gICAgICAgIGlmIChjdXJyZW50U3Bhbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYWRkSGVhZGVyKGN1cnJlbnRTcGFuKVxuICAgICAgICB9XG4gICAgICAgIGFkZEhlYWRlcihjb2x1bW4uY29sdW1ucywgY29sdW1uKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGFsbFZpc2libGVDb2x1bW5zLnB1c2goY29sdW1uKVxuICAgICAgY3VycmVudFNwYW4ucHVzaChjb2x1bW4pXG4gICAgfSlcbiAgICBpZiAoaGFzSGVhZGVyR3JvdXBzICYmIGN1cnJlbnRTcGFuLmxlbmd0aCA+IDApIHtcbiAgICAgIGFkZEhlYWRlcihjdXJyZW50U3BhbilcbiAgICB9XG5cbiAgICAvLyBBY2Nlc3MgdGhlIGRhdGFcbiAgICBsZXQgcmVzb2x2ZWREYXRhID0gZGF0YS5tYXAoKGQsIGkpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IHtcbiAgICAgICAgX19vcmlnaW5hbDogZCxcbiAgICAgICAgX19pbmRleDogaVxuICAgICAgfVxuICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHJldHVyblxuICAgICAgICByb3dbY29sdW1uLmlkXSA9IGNvbHVtbi5hY2Nlc3NvcihkKVxuICAgICAgfSlcbiAgICAgIHJldHVybiByb3dcbiAgICB9KVxuXG4gICAgLy8gSWYgcGl2b3RpbmcsIHJlY3Vyc2l2ZWx5IGdyb3VwIHRoZSBkYXRhXG4gICAgY29uc3QgYWdncmVnYXRlID0gKHJvd3MpID0+IHtcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0aW9uVmFsdWVzID0ge31cbiAgICAgIGFnZ3JlZ2F0aW5nQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHJvd3MubWFwKGQgPT4gZFtjb2x1bW4uaWRdKVxuICAgICAgICBhZ2dyZWdhdGlvblZhbHVlc1tjb2x1bW4uaWRdID0gY29sdW1uLmFnZ3JlZ2F0ZSh2YWx1ZXMsIHJvd3MpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGFnZ3JlZ2F0aW9uVmFsdWVzXG4gICAgfVxuICAgIGxldCBzdGFuZGFyZENvbHVtbnMgPSBwaXZvdEJ5Lmxlbmd0aCA/IGFsbFZpc2libGVDb2x1bW5zLnNsaWNlKDEpIDogYWxsVmlzaWJsZUNvbHVtbnNcbiAgICBjb25zdCBhZ2dyZWdhdGluZ0NvbHVtbnMgPSBzdGFuZGFyZENvbHVtbnMuZmlsdGVyKGQgPT4gZC5hZ2dyZWdhdGUpXG4gICAgbGV0IHBpdm90Q29sdW1uXG4gICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XG4gICAgICBwaXZvdENvbHVtbiA9IGFsbFZpc2libGVDb2x1bW5zWzBdXG4gICAgICBjb25zdCBncm91cFJlY3Vyc2l2ZWx5ID0gKHJvd3MsIGtleXMsIGkgPSAwKSA9PiB7XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgbGV2ZWwsIGp1c3QgcmV0dXJuIHRoZSByb3dzXG4gICAgICAgIGlmIChpID09PSBrZXlzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiByb3dzXG4gICAgICAgIH1cbiAgICAgICAgLy8gR3JvdXAgdGhlIHJvd3MgdG9nZXRoZXIgZm9yIHRoaXMgbGV2ZWxcbiAgICAgICAgbGV0IGdyb3VwZWRSb3dzID0gT2JqZWN0LmVudHJpZXMoXG4gICAgICAgICAgXy5ncm91cEJ5KHJvd3MsIGtleXNbaV0pKVxuICAgICAgICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgW3Bpdm90SURLZXldOiBrZXlzW2ldLFxuICAgICAgICAgICAgICBbcGl2b3RWYWxLZXldOiBrZXksXG4gICAgICAgICAgICAgIFtrZXlzW2ldXToga2V5LFxuICAgICAgICAgICAgICBbc3ViUm93c0tleV06IHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgLy8gUmVjdXJzZSBpbnRvIHRoZSBzdWJSb3dzXG4gICAgICAgIGdyb3VwZWRSb3dzID0gZ3JvdXBlZFJvd3MubWFwKHJvd0dyb3VwID0+IHtcbiAgICAgICAgICBsZXQgc3ViUm93cyA9IGdyb3VwUmVjdXJzaXZlbHkocm93R3JvdXBbc3ViUm93c0tleV0sIGtleXMsIGkgKyAxKVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5yb3dHcm91cCxcbiAgICAgICAgICAgIFtzdWJSb3dzS2V5XTogc3ViUm93cyxcbiAgICAgICAgICAgIC4uLmFnZ3JlZ2F0ZShzdWJSb3dzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGdyb3VwZWRSb3dzXG4gICAgICB9XG4gICAgICByZXNvbHZlZERhdGEgPSBncm91cFJlY3Vyc2l2ZWx5KHJlc29sdmVkRGF0YSwgcGl2b3RCeSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ubmV3U3RhdGUsXG4gICAgICByZXNvbHZlZERhdGEsXG4gICAgICBwaXZvdENvbHVtbixcbiAgICAgIGFsbFZpc2libGVDb2x1bW5zLFxuICAgICAgaGVhZGVyR3JvdXBzLFxuICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucyxcbiAgICAgIGhhc0hlYWRlckdyb3Vwc1xuICAgIH1cbiAgfSxcbiAgZ2V0U29ydGVkRGF0YSAocmVzb2x2ZWRTdGF0ZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1hbnVhbCxcbiAgICAgIHNvcnRpbmcsXG4gICAgICBmaWx0ZXJpbmcsXG4gICAgICBzaG93RmlsdGVycyxcbiAgICAgIGRlZmF1bHRGaWx0ZXJNZXRob2QsXG4gICAgICByZXNvbHZlZERhdGEsXG4gICAgICBhbGxWaXNpYmxlQ29sdW1uc1xuICAgIH0gPSByZXNvbHZlZFN0YXRlXG5cbiAgICAvLyBSZXNvbHZlIHRoZSBkYXRhIGZyb20gZWl0aGVyIG1hbnVhbCBkYXRhIG9yIHNvcnRlZCBkYXRhXG4gICAgcmV0dXJuIHtcbiAgICAgIHNvcnRlZERhdGE6IG1hbnVhbCA/IHJlc29sdmVkRGF0YSA6IHRoaXMuc29ydERhdGEodGhpcy5maWx0ZXJEYXRhKHJlc29sdmVkRGF0YSwgc2hvd0ZpbHRlcnMsIGZpbHRlcmluZywgZGVmYXVsdEZpbHRlck1ldGhvZCwgYWxsVmlzaWJsZUNvbHVtbnMpLCBzb3J0aW5nKVxuICAgIH1cbiAgfSxcbiAgZmlyZU9uQ2hhbmdlICgpIHtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpLCB0aGlzKVxuICB9LFxuICBnZXRQcm9wT3JTdGF0ZSAoa2V5KSB7XG4gICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMucHJvcHNba2V5XSwgdGhpcy5zdGF0ZVtrZXldKVxuICB9LFxuICBnZXRTdGF0ZU9yUHJvcCAoa2V5KSB7XG4gICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMuc3RhdGVba2V5XSwgdGhpcy5wcm9wc1trZXldKVxuICB9LFxuICBmaWx0ZXJEYXRhIChkYXRhLCBzaG93RmlsdGVycywgZmlsdGVyaW5nLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCBhbGxWaXNpYmxlQ29sdW1ucykge1xuICAgIGxldCBmaWx0ZXJlZERhdGEgPSBkYXRhXG5cbiAgICBpZiAoc2hvd0ZpbHRlcnMgJiYgZmlsdGVyaW5nLmxlbmd0aCkge1xuICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyaW5nLnJlZHVjZShcbiAgICAgICAgKGZpbHRlcmVkU29GYXIsIG5leHRGaWx0ZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gZmlsdGVyZWRTb0Zhci5maWx0ZXIoXG4gICAgICAgICAgICAocm93KSA9PiB7XG4gICAgICAgICAgICAgIGxldCBjb2x1bW5cblxuICAgICAgICAgICAgICBpZiAobmV4dEZpbHRlci5waXZvdElkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50Q29sdW1uID0gYWxsVmlzaWJsZUNvbHVtbnMuZmluZCh4ID0+IHguaWQgPT09IG5leHRGaWx0ZXIuaWQpXG4gICAgICAgICAgICAgICAgY29sdW1uID0gcGFyZW50Q29sdW1uLnBpdm90Q29sdW1ucy5maW5kKHggPT4geC5pZCA9PT0gbmV4dEZpbHRlci5waXZvdElkKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbHVtbiA9IGFsbFZpc2libGVDb2x1bW5zLmZpbmQoeCA9PiB4LmlkID09PSBuZXh0RmlsdGVyLmlkKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWV0aG9kID0gY29sdW1uLmZpbHRlck1ldGhvZCB8fCBkZWZhdWx0RmlsdGVyTWV0aG9kXG5cbiAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlck1ldGhvZChuZXh0RmlsdGVyLCByb3csIGNvbHVtbilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLCBmaWx0ZXJlZERhdGFcbiAgICAgIClcblxuICAgICAgLy8gQXBwbHkgdGhlIGZpbHRlciB0byB0aGUgc3Vicm93cyBpZiB3ZSBhcmUgcGl2b3RpbmcsIGFuZCB0aGVuXG4gICAgICAvLyBmaWx0ZXIgYW55IHJvd3Mgd2l0aG91dCBzdWJjb2x1bW5zIGJlY2F1c2UgaXQgd291bGQgYmUgc3RyYW5nZSB0byBzaG93XG4gICAgICBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJlZERhdGEubWFwKHJvdyA9PiB7XG4gICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgICByZXR1cm4gcm93XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5yb3csXG4gICAgICAgICAgW3RoaXMucHJvcHMuc3ViUm93c0tleV06IHRoaXMuZmlsdGVyRGF0YShyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSwgc2hvd0ZpbHRlcnMsIGZpbHRlcmluZywgZGVmYXVsdEZpbHRlck1ldGhvZCwgYWxsVmlzaWJsZUNvbHVtbnMpXG4gICAgICAgIH1cbiAgICAgIH0pLmZpbHRlcihyb3cgPT4ge1xuICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0ubGVuZ3RoID4gMFxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVyZWREYXRhXG4gIH0sXG4gIHNvcnREYXRhIChkYXRhLCBzb3J0aW5nKSB7XG4gICAgaWYgKCFzb3J0aW5nLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBjb25zdCBzb3J0ZWQgPSBfLm9yZGVyQnkoZGF0YSwgc29ydGluZy5tYXAoc29ydCA9PiB7XG4gICAgICByZXR1cm4gcm93ID0+IHtcbiAgICAgICAgaWYgKHJvd1tzb3J0LmlkXSA9PT0gbnVsbCB8fCByb3dbc29ydC5pZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiAtSW5maW5pdHlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZW9mIHJvd1tzb3J0LmlkXSA9PT0gJ3N0cmluZycgPyByb3dbc29ydC5pZF0udG9Mb3dlckNhc2UoKSA6IHJvd1tzb3J0LmlkXVxuICAgICAgfVxuICAgIH0pLCBzb3J0aW5nLm1hcChkID0+ICFkLmRlc2MpKVxuXG4gICAgcmV0dXJuIHNvcnRlZC5tYXAocm93ID0+IHtcbiAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucm93LFxuICAgICAgICBbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XTogdGhpcy5zb3J0RGF0YShyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSwgc29ydGluZylcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGdldE1pblJvd3MgKCkge1xuICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzLm1pblJvd3MsIHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJykpXG4gIH0sXG5cbiAgLy8gVXNlciBhY3Rpb25zXG4gIG9uUGFnZUNoYW5nZSAocGFnZSkge1xuICAgIGNvbnN0IHtvblBhZ2VDaGFuZ2UsIGNvbGxhcHNlT25QYWdlQ2hhbmdlfSA9IHRoaXMucHJvcHNcbiAgICBpZiAob25QYWdlQ2hhbmdlKSB7XG4gICAgICByZXR1cm4gb25QYWdlQ2hhbmdlKHBhZ2UpXG4gICAgfVxuICAgIGNvbnN0IG5ld1N0YXRlID0ge3BhZ2V9XG4gICAgaWYgKGNvbGxhcHNlT25QYWdlQ2hhbmdlKSB7XG4gICAgICBuZXdTdGF0ZS5leHBhbmRlZFJvd3MgPSB7fVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXG4gICAgICBuZXdTdGF0ZVxuICAgICAgLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlKClcbiAgICAgIH0pXG4gIH0sXG4gIG9uUGFnZVNpemVDaGFuZ2UgKG5ld1BhZ2VTaXplKSB7XG4gICAgY29uc3Qge29uUGFnZVNpemVDaGFuZ2V9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHtwYWdlU2l6ZSwgcGFnZX0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBwYWdlIHRvIGRpc3BsYXlcbiAgICBjb25zdCBjdXJyZW50Um93ID0gcGFnZVNpemUgKiBwYWdlXG4gICAgY29uc3QgbmV3UGFnZSA9IE1hdGguZmxvb3IoY3VycmVudFJvdyAvIG5ld1BhZ2VTaXplKVxuXG4gICAgaWYgKG9uUGFnZVNpemVDaGFuZ2UpIHtcbiAgICAgIHJldHVybiBvblBhZ2VTaXplQ2hhbmdlKG5ld1BhZ2VTaXplLCBuZXdQYWdlKVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICBwYWdlU2l6ZTogbmV3UGFnZVNpemUsXG4gICAgICBwYWdlOiBuZXdQYWdlXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5maXJlT25DaGFuZ2UoKVxuICAgIH0pXG4gIH0sXG4gIHNvcnRDb2x1bW4gKGNvbHVtbiwgYWRkaXRpdmUpIHtcbiAgICBjb25zdCB7c29ydGluZ30gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuICAgIGNvbnN0IHtvblNvcnRpbmdDaGFuZ2V9ID0gdGhpcy5wcm9wc1xuICAgIGlmIChvblNvcnRpbmdDaGFuZ2UpIHtcbiAgICAgIHJldHVybiBvblNvcnRpbmdDaGFuZ2UoY29sdW1uLCBhZGRpdGl2ZSlcbiAgICB9XG4gICAgbGV0IG5ld1NvcnRpbmcgPSBfLmNsb25lKHNvcnRpbmcgfHwgW10pLm1hcChkID0+IHtcbiAgICAgIGQuZGVzYyA9IF8uaXNTb3J0aW5nRGVzYyhkKVxuICAgICAgcmV0dXJuIGRcbiAgICB9KVxuICAgIGlmICghXy5pc0FycmF5KGNvbHVtbikpIHtcbiAgICAgIC8vIFNpbmdsZS1Tb3J0XG4gICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGluZy5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW4uaWQpXG4gICAgICBpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3U29ydGluZ1tleGlzdGluZ0luZGV4XVxuICAgICAgICBpZiAoZXhpc3RpbmcuZGVzYykge1xuICAgICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgICAgbmV3U29ydGluZy5zcGxpY2UoZXhpc3RpbmdJbmRleCwgMSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IGZhbHNlXG4gICAgICAgICAgICBuZXdTb3J0aW5nID0gW2V4aXN0aW5nXVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGlzdGluZy5kZXNjID0gdHJ1ZVxuICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIG5ld1NvcnRpbmcgPSBbZXhpc3RpbmddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICBuZXdTb3J0aW5nLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICAgIGRlc2M6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTb3J0aW5nID0gW3tcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBkZXNjOiBmYWxzZVxuICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTXVsdGktU29ydFxuICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IG5ld1NvcnRpbmcuZmluZEluZGV4KGQgPT4gZC5pZCA9PT0gY29sdW1uWzBdLmlkKVxuICAgICAgLy8gRXhpc3RpbmcgU29ydGVkIENvbHVtblxuICAgICAgaWYgKGV4aXN0aW5nSW5kZXggPiAtMSkge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRpbmdbZXhpc3RpbmdJbmRleF1cbiAgICAgICAgaWYgKGV4aXN0aW5nLmRlc2MpIHtcbiAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIG5ld1NvcnRpbmcuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIGNvbHVtbi5sZW5ndGgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIG5ld1NvcnRpbmdbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgIG5ld1NvcnRpbmdbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFkZGl0aXZlKSB7XG4gICAgICAgICAgbmV3U29ydGluZyA9IG5ld1NvcnRpbmcuc2xpY2UoZXhpc3RpbmdJbmRleCwgY29sdW1uLmxlbmd0aClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmV3IFNvcnQgQ29sdW1uXG4gICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRpbmcgPSBuZXdTb3J0aW5nLmNvbmNhdChjb2x1bW4ubWFwKGQgPT4gKHtcbiAgICAgICAgICAgIGlkOiBkLmlkLFxuICAgICAgICAgICAgZGVzYzogZmFsc2VcbiAgICAgICAgICB9KSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3U29ydGluZyA9IGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICBkZXNjOiBmYWxzZVxuICAgICAgICAgIH0pKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICBwYWdlOiAoKCFzb3J0aW5nLmxlbmd0aCAmJiBuZXdTb3J0aW5nLmxlbmd0aCkgfHwgIWFkZGl0aXZlKSA/IDAgOiB0aGlzLnN0YXRlLnBhZ2UsXG4gICAgICBzb3J0aW5nOiBuZXdTb3J0aW5nXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5maXJlT25DaGFuZ2UoKVxuICAgIH0pXG4gIH0sXG4gIGZpbHRlckNvbHVtbiAoY29sdW1uLCB2YWx1ZSwgcGl2b3RDb2x1bW4pIHtcbiAgICBjb25zdCB7ZmlsdGVyaW5nfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgY29uc3Qge29uRmlsdGVyaW5nQ2hhbmdlfSA9IHRoaXMucHJvcHNcblxuICAgIGlmIChvbkZpbHRlcmluZ0NoYW5nZSkge1xuICAgICAgcmV0dXJuIG9uRmlsdGVyaW5nQ2hhbmdlKGNvbHVtbiwgdmFsdWUpXG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIG9sZCBmaWx0ZXIgZmlyc3QgaWYgaXQgZXhpc3RzXG4gICAgY29uc3QgbmV3RmlsdGVyaW5nID0gKGZpbHRlcmluZyB8fCBbXSkuZmlsdGVyKHggPT4ge1xuICAgICAgaWYgKHguaWQgIT09IGNvbHVtbi5pZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKHgucGl2b3RJZCkge1xuICAgICAgICBpZiAocGl2b3RDb2x1bW4pIHtcbiAgICAgICAgICByZXR1cm4geC5waXZvdElkICE9PSBwaXZvdENvbHVtbi5pZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcbiAgICAgIG5ld0ZpbHRlcmluZy5wdXNoKHtcbiAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBwaXZvdElkOiBwaXZvdENvbHVtbiA/IHBpdm90Q29sdW1uLmlkIDogdW5kZWZpbmVkXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICBmaWx0ZXJpbmc6IG5ld0ZpbHRlcmluZ1xuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlKClcbiAgICB9KVxuICB9XG59XG4iXX0=
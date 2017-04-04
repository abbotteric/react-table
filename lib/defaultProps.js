'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
//


var emptyObj = function emptyObj() {
  return {};
};

exports.default = {
  // General
  data: [],
  loading: false,
  showPagination: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPageSize: 20,
  showPageJump: true,
  expanderColumnWidth: 35,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  defaultSorting: [],
  showFilters: false,
  defaultFiltering: [],
  defaultFilterMethod: function defaultFilterMethod(filter, row, column) {
    var id = filter.pivotId || filter.id;
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
  },

  // Controlled State Overrides
  // page: undefined,
  // pageSize: undefined,
  // sorting: undefined,

  // Controlled State Callbacks
  onExpandSubComponent: undefined,
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortingChange: undefined,
  onFilteringChange: undefined,

  // Pivoting
  pivotBy: undefined,
  pivotColumnWidth: 200,
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',

  // Pivoting State Overrides
  // expandedRows: {},

  // Pivoting State Callbacks
  onExpandRow: undefined,

  // General Callbacks
  onChange: function onChange() {
    return null;
  },

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTheadFilterProps: emptyObj,
  getTheadFilterTrProps: emptyObj,
  getTheadFilterThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,

  // Global Column Defaults
  column: {
    sortable: true,
    show: true,
    minWidth: 100,
    // Cells only
    render: undefined,
    className: '',
    style: {},
    getProps: emptyObj,
    // Headers only
    header: undefined,
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footer: undefined,
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj,
    filterMethod: undefined,
    hideFilter: false,
    filterRender: function filterRender(_ref) {
      var filter = _ref.filter;
      var onFilterChange = _ref.onFilterChange;
      return _react2.default.createElement('input', { type: 'text',
        style: {
          width: '100%'
        },
        value: filter ? filter.value : '',
        onChange: function onChange(event) {
          return onFilterChange(event.target.value);
        }
      });
    }
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',

  // Components
  TableComponent: _utils2.default.makeTemplateComponent('rt-table'),
  TheadComponent: _utils2.default.makeTemplateComponent('rt-thead'),
  TbodyComponent: _utils2.default.makeTemplateComponent('rt-tbody'),
  TrGroupComponent: _utils2.default.makeTemplateComponent('rt-tr-group'),
  TrComponent: _utils2.default.makeTemplateComponent('rt-tr'),
  ThComponent: function ThComponent(_ref2) {
    var toggleSort = _ref2.toggleSort;
    var className = _ref2.className;
    var children = _ref2.children;

    var rest = _objectWithoutProperties(_ref2, ['toggleSort', 'className', 'children']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)(className, 'rt-th'),
        onClick: function onClick(e) {
          toggleSort && toggleSort(e);
        }
      }, rest),
      children
    );
  },
  TdComponent: _utils2.default.makeTemplateComponent('rt-td'),
  TfootComponent: _utils2.default.makeTemplateComponent('rt-tfoot'),
  ExpanderComponent: function ExpanderComponent(_ref3) {
    var isExpanded = _ref3.isExpanded;

    var rest = _objectWithoutProperties(_ref3, ['isExpanded']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)('rt-expander', isExpanded && '-open')
      }, rest),
      '\u2022'
    );
  },
  PaginationComponent: _pagination2.default,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref4) {
    var className = _ref4.className;
    var loading = _ref4.loading;
    var loadingText = _ref4.loadingText;

    var rest = _objectWithoutProperties(_ref4, ['className', 'loading', 'loadingText']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('-loading', { '-active': loading }, className)
      }, rest),
      _react2.default.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _utils2.default.makeTemplateComponent('rt-noData')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiZW1wdHlPYmoiLCJkYXRhIiwibG9hZGluZyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsInNob3dQYWdlSnVtcCIsImV4cGFuZGVyQ29sdW1uV2lkdGgiLCJjb2xsYXBzZU9uU29ydGluZ0NoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiY29sbGFwc2VPbkRhdGFDaGFuZ2UiLCJmcmVlemVXaGVuRXhwYW5kZWQiLCJkZWZhdWx0U29ydGluZyIsInNob3dGaWx0ZXJzIiwiZGVmYXVsdEZpbHRlcmluZyIsImRlZmF1bHRGaWx0ZXJNZXRob2QiLCJmaWx0ZXIiLCJyb3ciLCJjb2x1bW4iLCJpZCIsInBpdm90SWQiLCJ1bmRlZmluZWQiLCJTdHJpbmciLCJzdGFydHNXaXRoIiwidmFsdWUiLCJvbkV4cGFuZFN1YkNvbXBvbmVudCIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJvblNvcnRpbmdDaGFuZ2UiLCJvbkZpbHRlcmluZ0NoYW5nZSIsInBpdm90QnkiLCJwaXZvdENvbHVtbldpZHRoIiwicGl2b3RWYWxLZXkiLCJwaXZvdElES2V5Iiwic3ViUm93c0tleSIsIm9uRXhwYW5kUm93Iiwib25DaGFuZ2UiLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJQcm9wcyIsImdldFRoZWFkRmlsdGVyVHJQcm9wcyIsImdldFRoZWFkRmlsdGVyVGhQcm9wcyIsImdldFRib2R5UHJvcHMiLCJnZXRUckdyb3VwUHJvcHMiLCJnZXRUclByb3BzIiwiZ2V0VGRQcm9wcyIsImdldFRmb290UHJvcHMiLCJnZXRUZm9vdFRyUHJvcHMiLCJnZXRUZm9vdFRkUHJvcHMiLCJnZXRQYWdpbmF0aW9uUHJvcHMiLCJnZXRMb2FkaW5nUHJvcHMiLCJnZXROb0RhdGFQcm9wcyIsInNvcnRhYmxlIiwic2hvdyIsIm1pbldpZHRoIiwicmVuZGVyIiwiaGVhZGVyIiwiaGVhZGVyQ2xhc3NOYW1lIiwiaGVhZGVyU3R5bGUiLCJnZXRIZWFkZXJQcm9wcyIsImZvb3RlciIsImZvb3RlckNsYXNzTmFtZSIsImZvb3RlclN0eWxlIiwiZ2V0Rm9vdGVyUHJvcHMiLCJmaWx0ZXJNZXRob2QiLCJoaWRlRmlsdGVyIiwiZmlsdGVyUmVuZGVyIiwib25GaWx0ZXJDaGFuZ2UiLCJ3aWR0aCIsImV2ZW50IiwidGFyZ2V0IiwicHJldmlvdXNUZXh0IiwibmV4dFRleHQiLCJsb2FkaW5nVGV4dCIsIm5vRGF0YVRleHQiLCJwYWdlVGV4dCIsIm9mVGV4dCIsInJvd3NUZXh0IiwiVGFibGVDb21wb25lbnQiLCJtYWtlVGVtcGxhdGVDb21wb25lbnQiLCJUaGVhZENvbXBvbmVudCIsIlRib2R5Q29tcG9uZW50IiwiVHJHcm91cENvbXBvbmVudCIsIlRyQ29tcG9uZW50IiwiVGhDb21wb25lbnQiLCJ0b2dnbGVTb3J0IiwiY2hpbGRyZW4iLCJyZXN0IiwiZSIsIlRkQ29tcG9uZW50IiwiVGZvb3RDb21wb25lbnQiLCJFeHBhbmRlckNvbXBvbmVudCIsImlzRXhwYW5kZWQiLCJQYWdpbmF0aW9uQ29tcG9uZW50IiwiUHJldmlvdXNDb21wb25lbnQiLCJOZXh0Q29tcG9uZW50IiwiTG9hZGluZ0NvbXBvbmVudCIsIk5vRGF0YUNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7OztBQUZBOzs7QUFJQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPLEVBQVA7QUFBQSxDQUFqQjs7a0JBRWU7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Q0ExSUE7QUEySWJXLGtCQUFnQixnQkFBRVgscUJBQUYsQ0FBd0IsVUFBeEIsQ0EzSUg7QUE0SWJZLHFCQUFtQixrQ0FBMkI7QUFBQSxRQUF6QkMsVUFBeUIsU0FBekJBLFVBQXlCOztBQUFBLFFBQVZMLElBQVU7O0FBQzVDLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVcsMEJBQVcsYUFBWCxFQUEwQkssY0FBYyxPQUF4QztBQURiLFNBRU1MLElBRk47QUFBQTtBQUFBLEtBREY7QUFNRCxHQW5KWTtBQW9KYk0sMkNBcEphO0FBcUpiQyxxQkFBbUJqRixTQXJKTjtBQXNKYmtGLGlCQUFlbEYsU0F0SkY7QUF1SmJtRixvQkFBa0I7QUFBQSxRQUFFbkUsU0FBRixTQUFFQSxTQUFGO0FBQUEsUUFBYXBDLE9BQWIsU0FBYUEsT0FBYjtBQUFBLFFBQXNCZ0YsV0FBdEIsU0FBc0JBLFdBQXRCOztBQUFBLFFBQXNDYyxJQUF0Qzs7QUFBQSxXQUNoQjtBQUFBO0FBQUEsaUJBQUssV0FBVywwQkFDZCxVQURjLEVBRWQsRUFBQyxXQUFXOUYsT0FBWixFQUZjLEVBR2RvQyxTQUhjO0FBQWhCLFNBS00wRCxJQUxOO0FBT0U7QUFBQTtBQUFBLFVBQUssV0FBVSxnQkFBZjtBQUNHZDtBQURIO0FBUEYsS0FEZ0I7QUFBQSxHQXZKTDtBQW9LYndCLG1CQUFpQixnQkFBRWxCLHFCQUFGLENBQXdCLFdBQXhCO0FBcEtKLEMiLCJmaWxlIjoiZGVmYXVsdFByb3BzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbi8vXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xuXG5jb25zdCBlbXB0eU9iaiA9ICgpID0+ICh7fSlcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBHZW5lcmFsXG4gIGRhdGE6IFtdLFxuICBsb2FkaW5nOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXG4gIHBhZ2VTaXplT3B0aW9uczogWzUsIDEwLCAyMCwgMjUsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDIwLFxuICBzaG93UGFnZUp1bXA6IHRydWUsXG4gIGV4cGFuZGVyQ29sdW1uV2lkdGg6IDM1LFxuICBjb2xsYXBzZU9uU29ydGluZ0NoYW5nZTogdHJ1ZSxcbiAgY29sbGFwc2VPblBhZ2VDaGFuZ2U6IHRydWUsXG4gIGNvbGxhcHNlT25EYXRhQ2hhbmdlOiB0cnVlLFxuICBmcmVlemVXaGVuRXhwYW5kZWQ6IGZhbHNlLFxuICBkZWZhdWx0U29ydGluZzogW10sXG4gIHNob3dGaWx0ZXJzOiBmYWxzZSxcbiAgZGVmYXVsdEZpbHRlcmluZzogW10sXG4gIGRlZmF1bHRGaWx0ZXJNZXRob2Q6IChmaWx0ZXIsIHJvdywgY29sdW1uKSA9PiB7XG4gICAgY29uc3QgaWQgPSBmaWx0ZXIucGl2b3RJZCB8fCBmaWx0ZXIuaWRcbiAgICByZXR1cm4gcm93W2lkXSAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKHJvd1tpZF0pLnN0YXJ0c1dpdGgoZmlsdGVyLnZhbHVlKSA6IHRydWVcbiAgfSxcblxuICAvLyBDb250cm9sbGVkIFN0YXRlIE92ZXJyaWRlc1xuICAvLyBwYWdlOiB1bmRlZmluZWQsXG4gIC8vIHBhZ2VTaXplOiB1bmRlZmluZWQsXG4gIC8vIHNvcnRpbmc6IHVuZGVmaW5lZCxcblxuICAvLyBDb250cm9sbGVkIFN0YXRlIENhbGxiYWNrc1xuICBvbkV4cGFuZFN1YkNvbXBvbmVudDogdW5kZWZpbmVkLFxuICBvblBhZ2VDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgb25QYWdlU2l6ZUNoYW5nZTogdW5kZWZpbmVkLFxuICBvblNvcnRpbmdDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgb25GaWx0ZXJpbmdDaGFuZ2U6IHVuZGVmaW5lZCxcblxuICAvLyBQaXZvdGluZ1xuICBwaXZvdEJ5OiB1bmRlZmluZWQsXG4gIHBpdm90Q29sdW1uV2lkdGg6IDIwMCxcbiAgcGl2b3RWYWxLZXk6ICdfcGl2b3RWYWwnLFxuICBwaXZvdElES2V5OiAnX3Bpdm90SUQnLFxuICBzdWJSb3dzS2V5OiAnX3N1YlJvd3MnLFxuXG4gIC8vIFBpdm90aW5nIFN0YXRlIE92ZXJyaWRlc1xuICAvLyBleHBhbmRlZFJvd3M6IHt9LFxuXG4gIC8vIFBpdm90aW5nIFN0YXRlIENhbGxiYWNrc1xuICBvbkV4cGFuZFJvdzogdW5kZWZpbmVkLFxuXG4gIC8vIEdlbmVyYWwgQ2FsbGJhY2tzXG4gIG9uQ2hhbmdlOiAoKSA9PiBudWxsLFxuXG4gIC8vIENsYXNzZXNcbiAgY2xhc3NOYW1lOiAnJyxcbiAgc3R5bGU6IHt9LFxuXG4gIC8vIENvbXBvbmVudCBkZWNvcmF0b3JzXG4gIGdldFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGFibGVQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkR3JvdXBQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkR3JvdXBUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRHcm91cFRoUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRUaFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRGaWx0ZXJQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkRmlsdGVyVHJQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkRmlsdGVyVGhQcm9wczogZW1wdHlPYmosXG4gIGdldFRib2R5UHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUckdyb3VwUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGRQcm9wczogZW1wdHlPYmosXG4gIGdldFRmb290UHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUZm9vdFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUZm9vdFRkUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRQYWdpbmF0aW9uUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRMb2FkaW5nUHJvcHM6IGVtcHR5T2JqLFxuICBnZXROb0RhdGFQcm9wczogZW1wdHlPYmosXG5cbiAgLy8gR2xvYmFsIENvbHVtbiBEZWZhdWx0c1xuICBjb2x1bW46IHtcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICBzaG93OiB0cnVlLFxuICAgIG1pbldpZHRoOiAxMDAsXG4gICAgLy8gQ2VsbHMgb25seVxuICAgIHJlbmRlcjogdW5kZWZpbmVkLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgc3R5bGU6IHt9LFxuICAgIGdldFByb3BzOiBlbXB0eU9iaixcbiAgICAvLyBIZWFkZXJzIG9ubHlcbiAgICBoZWFkZXI6IHVuZGVmaW5lZCxcbiAgICBoZWFkZXJDbGFzc05hbWU6ICcnLFxuICAgIGhlYWRlclN0eWxlOiB7fSxcbiAgICBnZXRIZWFkZXJQcm9wczogZW1wdHlPYmosXG4gICAgLy8gRm9vdGVycyBvbmx5XG4gICAgZm9vdGVyOiB1bmRlZmluZWQsXG4gICAgZm9vdGVyQ2xhc3NOYW1lOiAnJyxcbiAgICBmb290ZXJTdHlsZToge30sXG4gICAgZ2V0Rm9vdGVyUHJvcHM6IGVtcHR5T2JqLFxuICAgIGZpbHRlck1ldGhvZDogdW5kZWZpbmVkLFxuICAgIGhpZGVGaWx0ZXI6IGZhbHNlLFxuICAgIGZpbHRlclJlbmRlcjogKHtmaWx0ZXIsIG9uRmlsdGVyQ2hhbmdlfSkgPT4gKFxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICB9fVxuICAgICAgICB2YWx1ZT17ZmlsdGVyID8gZmlsdGVyLnZhbHVlIDogJyd9XG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRmlsdGVyQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAvPlxuICAgIClcbiAgfSxcblxuICAvLyBUZXh0XG4gIHByZXZpb3VzVGV4dDogJ1ByZXZpb3VzJyxcbiAgbmV4dFRleHQ6ICdOZXh0JyxcbiAgbG9hZGluZ1RleHQ6ICdMb2FkaW5nLi4uJyxcbiAgbm9EYXRhVGV4dDogJ05vIHJvd3MgZm91bmQnLFxuICBwYWdlVGV4dDogJ1BhZ2UnLFxuICBvZlRleHQ6ICdvZicsXG4gIHJvd3NUZXh0OiAncm93cycsXG5cbiAgLy8gQ29tcG9uZW50c1xuICBUYWJsZUNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRhYmxlJyksXG4gIFRoZWFkQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGhlYWQnKSxcbiAgVGJvZHlDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10Ym9keScpLFxuICBUckdyb3VwQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdHItZ3JvdXAnKSxcbiAgVHJDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10cicpLFxuICBUaENvbXBvbmVudDogKHt0b2dnbGVTb3J0LCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0fSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjbGFzc05hbWUsICdydC10aCcpfVxuICAgICAgICBvbkNsaWNrPXtlID0+IHtcbiAgICAgICAgICB0b2dnbGVTb3J0ICYmIHRvZ2dsZVNvcnQoZSlcbiAgICAgICAgfX1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfSxcbiAgVGRDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10ZCcpLFxuICBUZm9vdENvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRmb290JyksXG4gIEV4cGFuZGVyQ29tcG9uZW50OiAoe2lzRXhwYW5kZWQsIC4uLnJlc3R9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC1leHBhbmRlcicsIGlzRXhwYW5kZWQgJiYgJy1vcGVuJyl9XG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgPiZidWxsOzwvZGl2PlxuICAgIClcbiAgfSxcbiAgUGFnaW5hdGlvbkNvbXBvbmVudDogUGFnaW5hdGlvbixcbiAgUHJldmlvdXNDb21wb25lbnQ6IHVuZGVmaW5lZCxcbiAgTmV4dENvbXBvbmVudDogdW5kZWZpbmVkLFxuICBMb2FkaW5nQ29tcG9uZW50OiAoe2NsYXNzTmFtZSwgbG9hZGluZywgbG9hZGluZ1RleHQsIC4uLnJlc3R9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAnLWxvYWRpbmcnLFxuICAgICAgeyctYWN0aXZlJzogbG9hZGluZ30sXG4gICAgICBjbGFzc05hbWVcbiAgICApfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9Jy1sb2FkaW5nLWlubmVyJz5cbiAgICAgICAge2xvYWRpbmdUZXh0fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICksXG4gIE5vRGF0YUNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LW5vRGF0YScpXG59XG4iXX0=
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//
exports.default = {
  get: get,
  set: set,
  takeRight: takeRight,
  last: last,
  orderBy: orderBy,
  range: range,
  remove: remove,
  clone: clone,
  getFirstDefined: getFirstDefined,
  sum: sum,
  makeTemplateComponent: makeTemplateComponent,
  groupBy: groupBy,
  isArray: isArray,
  splitProps: splitProps,
  compactObject: compactObject,
  isSortingDesc: isSortingDesc,
  normalizeComponent: normalizeComponent
};


function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {}
  return typeof val !== 'undefined' ? val : def;
}

function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var keys = makePathArray(path);
  var keyPart = void 0;
  var cursor = obj;
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function takeRight(arr, n) {
  var start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

function range(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs) {
  return arr.sort(function (a, b) {
    for (var i = 0; i < funcs.length; i++) {
      var comp = funcs[i];
      var ca = comp(a);
      var cb = comp(b);
      var desc = dirs[i] === false || dirs[i] === 'desc';
      if (ca > cb) {
        return desc ? -1 : 1;
      }
      if (ca < cb) {
        return desc ? 1 : -1;
      }
    }
    return dirs[0] ? a.__index - b.__index : b.__index - b.__index;
  });
}

function remove(a, b) {
  return a.filter(function (o, i) {
    var r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(JSON.stringify(a, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }));
  } catch (e) {
    return a;
  }
}

function getFirstDefined() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
  }
}

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function makeTemplateComponent(compClass) {
  return function (_ref) {
    var children = _ref.children;
    var className = _ref.className;

    var rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)(compClass, className)
      }, rest),
      children
    );
  };
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x, i) {
    var resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace('[', '.').replace(']', '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function splitProps(_ref2) {
  var className = _ref2.className;
  var style = _ref2.style;

  var rest = _objectWithoutProperties(_ref2, ['className', 'style']);

  return {
    className: className,
    style: style,
    rest: rest
  };
}

function compactObject(obj) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;

  return typeof Comp === 'function' ? Object.getPrototypeOf(Comp).isReactComponent ? _react2.default.createElement(Comp, params) : Comp(params) : fallback;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJnZXQiLCJzZXQiLCJ0YWtlUmlnaHQiLCJsYXN0Iiwib3JkZXJCeSIsInJhbmdlIiwicmVtb3ZlIiwiY2xvbmUiLCJnZXRGaXJzdERlZmluZWQiLCJzdW0iLCJtYWtlVGVtcGxhdGVDb21wb25lbnQiLCJncm91cEJ5IiwiaXNBcnJheSIsInNwbGl0UHJvcHMiLCJjb21wYWN0T2JqZWN0IiwiaXNTb3J0aW5nRGVzYyIsIm5vcm1hbGl6ZUNvbXBvbmVudCIsIm9iaiIsInBhdGgiLCJkZWYiLCJwYXRoT2JqIiwibWFrZVBhdGhBcnJheSIsInZhbCIsInJlZHVjZSIsImN1cnJlbnQiLCJwYXRoUGFydCIsImUiLCJ2YWx1ZSIsImtleXMiLCJrZXlQYXJ0IiwiY3Vyc29yIiwic2hpZnQiLCJsZW5ndGgiLCJhcnIiLCJuIiwic3RhcnQiLCJzbGljZSIsImkiLCJwdXNoIiwiZnVuY3MiLCJkaXJzIiwic29ydCIsImEiLCJiIiwiY29tcCIsImNhIiwiY2IiLCJkZXNjIiwiX19pbmRleCIsImZpbHRlciIsIm8iLCJyIiwic3BsaWNlIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwidG9TdHJpbmciLCJhcmdzIiwiY29tcENsYXNzIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJyZXN0IiwieHMiLCJydiIsIngiLCJyZXNLZXkiLCJBcnJheSIsImZsYXR0ZW5EZWVwIiwiam9pbiIsInJlcGxhY2UiLCJzcGxpdCIsIm5ld0FyciIsInN0eWxlIiwibmV3T2JqIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJkIiwiYXNjIiwiQ29tcCIsInBhcmFtcyIsImZhbGxiYWNrIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJpc1JlYWN0Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBQ0E7a0JBQ2U7QUFDYkEsVUFEYTtBQUViQyxVQUZhO0FBR2JDLHNCQUhh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QUFPbEIsR0FBUCxJQUFjdkMsSUFBSXVDLEdBQUosQ0FBZDtBQUNEO0FBQ0Y7QUFDRCxTQUFPa0IsTUFBUDtBQUNEOztBQUVELFNBQVMzRCxhQUFULENBQXdCOEQsQ0FBeEIsRUFBMkI7QUFDekIsU0FBTyxDQUFDLEVBQUVBLEVBQUVwQyxJQUFGLEtBQVcsTUFBWCxJQUFxQm9DLEVBQUU5QixJQUFGLEtBQVcsSUFBaEMsSUFBd0M4QixFQUFFQyxHQUFGLEtBQVUsS0FBcEQsQ0FBUjtBQUNEOztBQUVELFNBQVM5RCxrQkFBVCxDQUE2QitELElBQTdCLEVBQWlFO0FBQUEsTUFBOUJDLE1BQThCLHVFQUFyQixFQUFxQjtBQUFBLE1BQWpCQyxRQUFpQix1RUFBTkYsSUFBTTs7QUFDL0QsU0FBTyxPQUFPQSxJQUFQLEtBQWdCLFVBQWhCLEdBQ0xHLE9BQU9DLGNBQVAsQ0FBc0JKLElBQXRCLEVBQTRCSyxnQkFBNUIsR0FDRSw4QkFBQyxJQUFELEVBQ01KLE1BRE4sQ0FERixHQUlJRCxLQUFLQyxNQUFMLENBTEMsR0FNSEMsUUFOSjtBQU9EIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbi8vXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldCxcbiAgc2V0LFxuICB0YWtlUmlnaHQsXG4gIGxhc3QsXG4gIG9yZGVyQnksXG4gIHJhbmdlLFxuICByZW1vdmUsXG4gIGNsb25lLFxuICBnZXRGaXJzdERlZmluZWQsXG4gIHN1bSxcbiAgbWFrZVRlbXBsYXRlQ29tcG9uZW50LFxuICBncm91cEJ5LFxuICBpc0FycmF5LFxuICBzcGxpdFByb3BzLFxuICBjb21wYWN0T2JqZWN0LFxuICBpc1NvcnRpbmdEZXNjLFxuICBub3JtYWxpemVDb21wb25lbnRcbn1cblxuZnVuY3Rpb24gZ2V0IChvYmosIHBhdGgsIGRlZikge1xuICBpZiAoIXBhdGgpIHtcbiAgICByZXR1cm4gb2JqXG4gIH1cbiAgY29uc3QgcGF0aE9iaiA9IG1ha2VQYXRoQXJyYXkocGF0aClcbiAgbGV0IHZhbFxuICB0cnkge1xuICAgIHZhbCA9IHBhdGhPYmoucmVkdWNlKChjdXJyZW50LCBwYXRoUGFydCkgPT4gY3VycmVudFtwYXRoUGFydF0sIG9iailcbiAgfSBjYXRjaCAoZSkge31cbiAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnID8gdmFsIDogZGVmXG59XG5cbmZ1bmN0aW9uIHNldCAob2JqID0ge30sIHBhdGgsIHZhbHVlKSB7XG4gIGNvbnN0IGtleXMgPSBtYWtlUGF0aEFycmF5KHBhdGgpXG4gIGxldCBrZXlQYXJ0XG4gIGxldCBjdXJzb3IgPSBvYmpcbiAgd2hpbGUgKChrZXlQYXJ0ID0ga2V5cy5zaGlmdCgpKSAmJiBrZXlzLmxlbmd0aCkge1xuICAgIGlmICghY3Vyc29yW2tleVBhcnRdKSB7XG4gICAgICBjdXJzb3Jba2V5UGFydF0gPSB7fVxuICAgIH1cbiAgICBjdXJzb3IgPSBjdXJzb3Jba2V5UGFydF1cbiAgfVxuICBjdXJzb3Jba2V5UGFydF0gPSB2YWx1ZVxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIHRha2VSaWdodCAoYXJyLCBuKSB7XG4gIGNvbnN0IHN0YXJ0ID0gbiA+IGFyci5sZW5ndGggPyAwIDogYXJyLmxlbmd0aCAtIG5cbiAgcmV0dXJuIGFyci5zbGljZShzdGFydClcbn1cblxuZnVuY3Rpb24gbGFzdCAoYXJyKSB7XG4gIHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdXG59XG5cbmZ1bmN0aW9uIHJhbmdlIChuKSB7XG4gIGNvbnN0IGFyciA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgYXJyLnB1c2gobilcbiAgfVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIG9yZGVyQnkgKGFyciwgZnVuY3MsIGRpcnMpIHtcbiAgcmV0dXJuIGFyci5zb3J0KChhLCBiKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY29tcCA9IGZ1bmNzW2ldXG4gICAgICBjb25zdCBjYSA9IGNvbXAoYSlcbiAgICAgIGNvbnN0IGNiID0gY29tcChiKVxuICAgICAgY29uc3QgZGVzYyA9IGRpcnNbaV0gPT09IGZhbHNlIHx8IGRpcnNbaV0gPT09ICdkZXNjJ1xuICAgICAgaWYgKGNhID4gY2IpIHtcbiAgICAgICAgcmV0dXJuIGRlc2MgPyAtMSA6IDFcbiAgICAgIH1cbiAgICAgIGlmIChjYSA8IGNiKSB7XG4gICAgICAgIHJldHVybiBkZXNjID8gMSA6IC0xXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkaXJzWzBdXG4gICAgICA/IGEuX19pbmRleCAtIGIuX19pbmRleFxuICAgICAgOiBiLl9faW5kZXggLSBiLl9faW5kZXhcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChhLCBiKSB7XG4gIHJldHVybiBhLmZpbHRlcihmdW5jdGlvbiAobywgaSkge1xuICAgIHZhciByID0gYihvKVxuICAgIGlmIChyKSB7XG4gICAgICBhLnNwbGljZShpLCAxKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNsb25lIChhKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0pKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGFcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRGaXJzdERlZmluZWQgKC4uLmFyZ3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHR5cGVvZiBhcmdzW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGFyZ3NbaV1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VtIChhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoKGEsIGIpID0+IHtcbiAgICByZXR1cm4gYSArIGJcbiAgfSwgMClcbn1cblxuZnVuY3Rpb24gbWFrZVRlbXBsYXRlQ29tcG9uZW50IChjb21wQ2xhc3MpIHtcbiAgcmV0dXJuICh7Y2hpbGRyZW4sIGNsYXNzTmFtZSwgLi4ucmVzdH0pID0+IChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY29tcENsYXNzLCBjbGFzc05hbWUpfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApXG59XG5cbmZ1bmN0aW9uIGdyb3VwQnkgKHhzLCBrZXkpIHtcbiAgcmV0dXJuIHhzLnJlZHVjZSgocnYsIHgsIGkpID0+IHtcbiAgICBjb25zdCByZXNLZXkgPSB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nID8ga2V5KHgsIGkpIDogeFtrZXldXG4gICAgcnZbcmVzS2V5XSA9IGlzQXJyYXkocnZbcmVzS2V5XSkgPyBydltyZXNLZXldIDogW11cbiAgICBydltyZXNLZXldLnB1c2goeClcbiAgICByZXR1cm4gcnZcbiAgfSwge30pXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKGEpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSlcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyBOb24tZXhwb3J0ZWQgSGVscGVyc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmZ1bmN0aW9uIG1ha2VQYXRoQXJyYXkgKG9iaikge1xuICByZXR1cm4gZmxhdHRlbkRlZXAob2JqKVxuICAgICAgLmpvaW4oJy4nKVxuICAgICAgLnJlcGxhY2UoJ1snLCAnLicpXG4gICAgICAucmVwbGFjZSgnXScsICcnKVxuICAgICAgLnNwbGl0KCcuJylcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkRlZXAgKGFyciwgbmV3QXJyID0gW10pIHtcbiAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICBuZXdBcnIucHVzaChhcnIpXG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZsYXR0ZW5EZWVwKGFycltpXSwgbmV3QXJyKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3QXJyXG59XG5cbmZ1bmN0aW9uIHNwbGl0UHJvcHMgKHtjbGFzc05hbWUsIHN0eWxlLCAuLi5yZXN0fSkge1xuICByZXR1cm4ge1xuICAgIGNsYXNzTmFtZSxcbiAgICBzdHlsZSxcbiAgICByZXN0XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcGFjdE9iamVjdCAob2JqKSB7XG4gIGNvbnN0IG5ld09iaiA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgb2JqW2tleV0gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2JqW2tleV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldXG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmpcbn1cblxuZnVuY3Rpb24gaXNTb3J0aW5nRGVzYyAoZCkge1xuICByZXR1cm4gISEoZC5zb3J0ID09PSAnZGVzYycgfHwgZC5kZXNjID09PSB0cnVlIHx8IGQuYXNjID09PSBmYWxzZSlcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChDb21wLCBwYXJhbXMgPSB7fSwgZmFsbGJhY2sgPSBDb21wKSB7XG4gIHJldHVybiB0eXBlb2YgQ29tcCA9PT0gJ2Z1bmN0aW9uJyA/IChcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29tcCkuaXNSZWFjdENvbXBvbmVudCA/IChcbiAgICAgIDxDb21wXG4gICAgICAgIHsuLi5wYXJhbXN9XG4gICAgICAvPlxuICAgICkgOiBDb21wKHBhcmFtcylcbiAgKSA6IGZhbGxiYWNrXG59XG4iXX0=
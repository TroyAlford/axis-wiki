(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mobx-state-tree"), require("react"), require("react-router-dom"), require("mobx"), require("mobx-react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define("axis-wiki", ["mobx-state-tree", "react", "react-router-dom", "mobx", "mobx-react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["axis-wiki"] = factory(require("mobx-state-tree"), require("react"), require("react-router-dom"), require("mobx"), require("mobx-react"), require("react-dom"));
	else
		root["axis-wiki"] = factory(root["mobx-state-tree"], root["react"], root["react-router-dom"], root["mobx"], root["mobx-react"], root["react-dom"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_D5HE__, __WEBPACK_EXTERNAL_MODULE_Jmof__, __WEBPACK_EXTERNAL_MODULE_KC3J__, __WEBPACK_EXTERNAL_MODULE_dGoz__, __WEBPACK_EXTERNAL_MODULE_uva0__, __WEBPACK_EXTERNAL_MODULE_wLXD__) {
return webpackJsonpaxis_wiki([3],{

/***/ "+66z":
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "+6Bu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),

/***/ "+E39":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("S82l")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "+ZMJ":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("lOnJ");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "+gg+":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("TQ3y");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "+tPU":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("xGkn");
var global = __webpack_require__("7KvD");
var hide = __webpack_require__("hJx8");
var Iterators = __webpack_require__("/bQp");
var TO_STRING_TAG = __webpack_require__("dSzd")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "/GnY":
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__("HT7L"),
    nativeKeys = __webpack_require__("W529");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "/I3N":
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "/bQp":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "/n6Q":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("zQR9");
__webpack_require__("+tPU");
module.exports = __webpack_require__("Kh4W").f('iterator');


/***/ }),

/***/ "/pYj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__("Gu7T");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = __webpack_require__("AOM6");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _uniqBy = __webpack_require__("VXg5");

var _uniqBy2 = _interopRequireDefault(_uniqBy);

var _Slugs = __webpack_require__("BHVn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadPage = function (_Component) {
  (0, _inherits3.default)(UploadPage, _Component);

  function UploadPage(props) {
    (0, _classCallCheck3.default)(this, UploadPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UploadPage.__proto__ || (0, _getPrototypeOf2.default)(UploadPage)).call(this, props));

    _this.onDrop = function (files) {
      var form = new FormData();
      var uploading = _this.state.uploading;


      files.forEach(function (file) {
        var name = file.name,
            preview = file.preview,
            size = file.size,
            type = file.type,
            lastModifiedDate = file.lastModifiedDate;

        uploading.push({
          name: (0, _Slugs.slugify)(name),
          lastModifiedDate: lastModifiedDate,
          preview: preview,
          size: size,
          type: type
        });
        form.append('file', file);
      });

      _this.setState({ uploading: uploading });

      fetch('/media', {
        credentials: 'include',
        method: 'POST',
        body: form
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        var files = _this.state.uploading.map(function (file) {
          return (0, _assign2.default)({}, json[file.name], file);
        });
        var uploading = files.filter(function (file) {
          return !json[file.name];
        });
        var processed = files.filter(function (file) {
          return json[file.name];
        });
        var uploaded = processed.filter(function (file) {
          return file.errors.length === 0;
        });
        var failed = processed.filter(function (file) {
          return file.errors.length !== 0;
        });

        _this.setState({
          uploading: uploading,
          uploaded: (0, _uniqBy2.default)([].concat((0, _toConsumableArray3.default)(_this.state.uploaded), (0, _toConsumableArray3.default)(uploaded)), 'name'),
          failed: (0, _uniqBy2.default)([].concat((0, _toConsumableArray3.default)(_this.state.failed), (0, _toConsumableArray3.default)(failed)), 'name')
        });
      });
    };

    _this.renderFiles = function (files, actionText, className) {
      return _react2.default.createElement(
        'div',
        { className: 'message ' + className + ' files' },
        _react2.default.createElement(
          'div',
          { className: 'message-header' },
          actionText,
          ': ',
          files.length,
          ' files'
        ),
        _react2.default.createElement(
          'div',
          { className: 'message-body' },
          files.map(function (file, index) {
            return _react2.default.createElement(
              'div',
              { key: index, className: 'file' },
              _react2.default.createElement(
                'span',
                { className: 'name' },
                file.name
              ),
              _react2.default.createElement(
                'span',
                { className: 'link' },
                file.small ? _react2.default.createElement(
                  'a',
                  { href: file.small },
                  'View'
                ) : null
              ),
              !file.errors ? null : file.errors.map(function (error, ix) {
                return _react2.default.createElement(
                  'div',
                  { key: ix, className: 'error icon icon-warning' },
                  error
                );
              })
            );
          })
        )
      );
    };

    _this.state = {
      uploading: [],
      uploaded: [],
      failed: []
    };
    return _this;
  }

  (0, _createClass3.default)(UploadPage, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          uploading = _state.uploading,
          uploaded = _state.uploaded,
          failed = _state.failed;


      return _react2.default.createElement(
        'div',
        { className: 'upload page' },
        _react2.default.createElement(
          _reactDropzone2.default,
          { onDrop: this.onDrop,
            style: {},
            activeStyle: {},
            className: 'cp-file-dropzone',
            activeClassName: 'active'
          },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'b',
              null,
              'Click here'
            ),
            ' to browse & upload media files,',
            _react2.default.createElement('br', null),
            'or drag and drop into this container'
          )
        ),
        uploading.length !== 0 && this.renderFiles(uploading, 'Uploading', 'is-info'),
        uploaded.length !== 0 && this.renderFiles(uploaded, 'Uploaded', 'is-success'),
        failed.length !== 0 && this.renderFiles(failed, 'Failed', 'is-danger')
      );
    }
  }]);
  return UploadPage;
}(_react.Component);

exports.default = UploadPage;

/***/ }),

/***/ "/w+E":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__("+6Bu");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _class2, _temp2;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactTagsinput = __webpack_require__("VM0c");

var _reactTagsinput2 = _interopRequireDefault(_reactTagsinput);

var _mobxReact = __webpack_require__("uva0");

var _isEqual = __webpack_require__("hygk");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Tag = __webpack_require__("eYTX");

var _Tag2 = _interopRequireDefault(_Tag);

var _noop = __webpack_require__("TgZ1");

var _noop2 = _interopRequireDefault(_noop);

var _Slugs = __webpack_require__("BHVn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exclude = function exclude(list, exclusions) {
  return list.filter(function (entry) {
    return exclusions.indexOf(entry) === -1;
  });
};
var clean = function clean(list, bans) {
  return (0, _Slugs.slugify)(exclude((0, _Slugs.slugify)(list), (0, _Slugs.slugify)(bans)));
};

var TagBar = (0, _mobxReact.observer)(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3.default)(TagBar, _Component);

  function TagBar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TagBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TagBar.__proto__ || (0, _getPrototypeOf2.default)(TagBar)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      return _this.cleanTags(_this.props);
    }, _this.componentWillReceiveProps = _this.cleanTags, _this.setInput = function (self) {
      _this.input = self;
    }, _this.cleanTags = function (_ref2) {
      var tags = _ref2.tags,
          banned = _ref2.banned;

      _this.setState({ tags: clean(tags.toJSON(), banned) || [] });
    }, _this.handleInputChange = function (updated) {
      var cleaned = clean(updated, _this.props.banned);
      if (!(0, _isEqual2.default)(cleaned, _this.state.tags)) _this.props.onChange(cleaned);
    }, _this.handleTagClickRemove = function (which) {
      _this.props.onRemove(which);
      _this.forceUpdate(); // workaround for TagsInput not being observable
    }, _this.renderTag = function (_ref3) {
      var className = _ref3.className,
          key = _ref3.key,
          tag = _ref3.tag;
      return _react2.default.createElement(_Tag2.default, {
        className: ('icon-tag ' + className).trim(),
        key: key,
        linkTo: '/page/' + tag,
        onClickRemove: _this.handleTagClickRemove,
        removable: !_this.props.readonly,
        tag: tag
      });
    }, _this.renderInput = function (_ref4) {
      var addTag = _ref4.addTag,
          props = (0, _objectWithoutProperties3.default)(_ref4, ['addTag']);
      return _this.props.readonly ? _react2.default.createElement('span', { ref: _this.setInput }) : _react2.default.createElement('input', (0, _extends3.default)({ type: 'text', ref: _this.setInput }, props));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TagBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          inputSettings = _props.inputSettings,
          readonly = _props.readonly,
          tags = _props.tags,
          tagSettings = _props.tagSettings;

      var classNames = ['tag-bar', className, readonly ? 'readonly' : ''].filter(Boolean);

      return _react2.default.createElement(_reactTagsinput2.default, {
        className: classNames.join(' '),
        inputProps: inputSettings,
        onChange: this.handleInputChange,
        onlyUnique: true,
        readonly: readonly,
        renderInput: this.renderInput,
        renderTag: this.renderTag,
        tagProps: tagSettings,
        value: tags
      });
    }
  }]);
  return TagBar;
}(_react.Component), _class2.defaultProps = {
  banned: [],
  className: '',
  onChange: _noop2.default,
  readonly: false,
  onRemove: _noop2.default,
  tags: [],

  inputSettings: {
    className: 'tag-bar-input',
    placeholder: 'add tag'
  },
  tagSettings: {
    className: 'tag',
    classNameRemove: 'remove'
  }
}, _temp2)) || _class;

exports.default = TagBar;

/***/ }),

/***/ "06OY":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("3Eo+")('meta');
var isObject = __webpack_require__("EqjI");
var has = __webpack_require__("D2L2");
var setDesc = __webpack_require__("evD5").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("S82l")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "06WZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE = exports.GET = exports.POST = undefined;

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = {
  credentials: 'include',
  headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
  mode: 'cors'
};

var POST = exports.POST = function POST(url, payload) {
  return fetch(url, (0, _extends3.default)({}, params, { method: 'POST', body: (0, _stringify2.default)(payload)
  }));
};
var GET = exports.GET = function GET(url) {
  return fetch(url, (0, _extends3.default)({}, params, { method: 'GET' }));
};
var DELETE = exports.DELETE = function DELETE(url) {
  return fetch(url, (0, _extends3.default)({}, params, { method: 'DELETE' }));
};

/***/ }),

/***/ "16tV":
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__("tO4o"),
    keys = __webpack_require__("ktak");

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),

/***/ "1H6C":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__("HhN8");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "1Yb9":
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__("mgnk"),
    isObjectLike = __webpack_require__("UnEC");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "1kS7":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "1wn0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  applicationName: false || 'Axis Wiki',
  facebook: {
    appId: "1747669432136380" || undefined,
    fields: ['id', 'email', 'gender', 'locale', 'name', 'picture'],
    permissions: false || 'public_profile,email',
    scope: ['public_profile', 'email'],
    version: 'v2.9'
  },
  media: {
    extensions: (false || 'gif,jpg,png').split(','),
    largeSizePixels: false || 1000,
    smallSizePixels: false || 250
  }
};

/***/ }),

/***/ "22B7":
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "2Hvv":
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__("imBK");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "2X2u":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ "3Did":
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__("uCi2");

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),

/***/ "3Eo+":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "3IRH":
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "3fs2":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("RY/4");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var Iterators = __webpack_require__("/bQp");
module.exports = __webpack_require__("FeBl").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "3hV1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobxStateTree = __webpack_require__("D5HE");

var MenuItem = _mobxStateTree.types.model('MenuItem', {
  children: _mobxStateTree.types.optional(_mobxStateTree.types.array(_mobxStateTree.types.late(function () {
    return MenuItem;
  })), []),
  text: '',
  url: ''
});

exports.default = MenuItem;

/***/ }),

/***/ "3rZI":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),

/***/ "4BQR":
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__("Jmof"),__webpack_require__("uva0"),__webpack_require__("D5HE")):"function"==typeof define&&define.amd?define("sheetforge",["react","mobx-react","mobx-state-tree"],t):"object"==typeof exports?exports.sheetforge=t(require("react"),require("mobx-react"),require("mobx-state-tree")):e.sheetforge=t(e.react,e["mobx-react"],e["mobx-state-tree"])}("undefined"!=typeof self?self:this,function(e,t,n){return function(e){function t(r){if(n[r])return n[r].exports
var a=n[r]={i:r,l:!1,exports:{}}
return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={}
return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e}
return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=18)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){}},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),p=r(f),m=n(5),y=r(m),v=n(3),h=r(v)
n(28)
var b=["text","multiline","boolean","number","slider"],g=(l=u=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,l=Array(u),d=0;d<u;d++)l[d]=arguments[d]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.state={editing:!1,resetValue:r.props.value},r.getEditorType=function(){var e=r.props.value,t=r.props.type
return void 0!==t&&b.includes(t)?t:(t=void 0===e?"undefined":s(e),"string"===t?e.includes("\n")?"multiline":"text":["boolean","number"].includes(t)?t:"text")},r.resetChanges=function(){r.props.onChange(r.state.resetValue,r.props.value),r.handleToggleEditing()},r.createRefWithAutoFocus=function(e){r.editor=e,e&&("function"==typeof e.focus&&e.focus(),r.props.forceEditMode&&"function"==typeof e.setSelectionRange&&e.setSelectionRange(e.value.length,e.value.length))},r.handleChange=function(e){var t=e.target,n=r.props,a=n.min,o=n.max,i=t.value
switch(r.getEditorType()){case"slider":case"number":i=parseInt(i||0,10),Number.isNaN(i)&&(i=r.props.value),i=(0,y.default)(i,{min:a,max:o})}r.props.onChange(i,r.state.resetValue)},r.handleKeys=function(e){var t=e.target,n=e.key,a=e.ctrlKey,o=e.metaKey
"Escape"===n&&r.resetChanges(),"Enter"===n&&("TEXTAREA"!==t.nodeName||a||o)&&r.handleToggleEditing()},r.handleReceivingFocus=function(){r.props.readonly||r.state.editing||r.handleToggleEditing()},r.handleToggleEditing=function(){if(!r.props.readonly){var e=!r.editing
r.setState({editing:e,resetValue:r.props.value},function(){r.state.editing?r.props.onEditStart():r.props.onEditEnd()})}},r.selectOnFocus=function(e){return e.target.select()},r.toggleBoolean=function(){r.props.onEditStart(),r.props.onChange(!r.props.value,r.props.value),r.props.onEditEnd()},r.renderBoolean=function(){return p.default.createElement("input",{type:"checkbox",checked:Boolean(r.props.value),disabled:r.props.readonly,onChange:r.toggleBoolean})},r.renderMultiline=function(){if(!r.editing){var e=(r.props.value||r.props.placeholder).split("\n"),t=e.map(function(e,t){return p.default.createElement("p",{key:t},e)}),n=["multiline",r.props.value?"":"placeholder"].join(" ").trim()
return p.default.createElement("div",{className:n,onClick:r.handleToggleEditing},t)}return p.default.createElement("textarea",{disabled:r.props.readonly,onBlur:r.handleToggleEditing,onChange:r.handleChange,onFocus:r.selectOnFocus,onKeyDown:r.handleKeys,placeholder:r.props.placeholder,ref:r.createRefWithAutoFocus,rows:r.props.value.split("\n").length,value:r.props.value})},r.renderNumber=function(){return r.editing?p.default.createElement("input",{type:"number",disabled:r.props.readonly,max:r.props.max,min:r.props.min,onBlur:r.handleToggleEditing,onChange:r.handleChange,onFocus:r.selectOnFocus,onKeyDown:r.handleKeys,placeholder:r.props.placeholder,ref:r.createRefWithAutoFocus,step:r.props.step,value:r.props.value}):r.renderStatic()},r.renderSlider=function(){return p.default.createElement("input",{type:"range",disabled:r.props.readonly,max:r.props.max,min:r.props.min,onBlur:r.handleToggleEditing,onChange:r.handleChange,ref:r.createRefWithAutoFocus,step:r.props.step,value:r.props.value})},r.renderText=function(){return r.editing?p.default.createElement("input",{type:"text",disabled:r.props.readonly,onBlur:r.handleToggleEditing,onChange:r.handleChange,onFocus:r.selectOnFocus,onKeyDown:r.handleKeys,placeholder:r.props.placeholder,ref:r.createRefWithAutoFocus,value:r.props.value}):r.renderStatic()},r.renderStatic=function(){var e=r.props.placeholder&&!r.props.value,t=e?"placeholder":""
return p.default.createElement("span",{className:t,onClick:r.handleToggleEditing},e?r.props.placeholder:r.props.value)},r.renderEditor=function(){switch(r.getEditorType()){case"boolean":return r.renderBoolean()
case"slider":return r.renderSlider()
case"multiline":return r.renderMultiline()
case"number":return r.renderNumber()
default:return r.renderText()}},r.render=function(){var e=r.props,t=e.className,n=e.readonly,a=["editable",r.editing?"editing":"",t||"",n?"readonly":""].filter(Boolean),o={}
return n||r.editing||(o={tabIndex:"0",onFocus:r.handleReceivingFocus}),p.default.createElement("div",c({className:a.join(" ")},o),r.renderEditor())},i=n,o(r,i)}return i(t,e),d(t,[{key:"editing",get:function(){return this.props.forceEditMode||this.state.editing}}]),t}(p.default.Component),u.displayName="Editable",u.defaultProps={className:"",forceEditMode:!1,max:void 0,min:void 0,onChange:h.default,onEditStart:h.default,onEditEnd:h.default,placeholder:"",readonly:!1,step:1,type:void 0,value:""},l)
t.default=g},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=t.min,r=t.max
return void 0!==n&&e<n?n:void 0!==r&&e>r?r:e}},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.autoHash=void 0
var r=n(2),a=n(13)
t.autoHash=r.types.optional(r.types.identifier(r.types.string),a.randomHash)},function(e,t,n){"use strict"
function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2
return i.types.model({}).views(function(t){return{get xpCost(){return e(t)}}}).actions(function(e){var a=function(){if(!n)return e
try{return(0,i.getParent)(e,n)}catch(t){return console.warn("Failed to find character "+n+" parents up from ExperienceCost model."),e}},u=function(e){var t=a()
t&&"function"==typeof t.setXP&&t.setXP(t.xp+e)},l=t.reduce(function(t,n){var a
return o({},t,(a={},r(a,n+"Unguarded",e[n]),r(a,n,function(){var t=(0,i.clone)(e)
t[n+"Unguarded"].apply(t,arguments)
var r=t.xpCost-e.xpCost
return u(-r),e[n+"Unguarded"].apply(e,arguments)}),a))},{})
return o({},l,{beforeDestroy:function(){u(e.xpCost)},xpCostAfter:function(t){var n=(0,i.clone)(e)
return t(n),n.xpCost},xpCostDelta:function(t){return e.xpCostAfter(t)-e.xpCost}})})}Object.defineProperty(t,"__esModule",{value:!0})
var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}
t.default=a
var i=n(2)},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(2),a=n(6),o=n(21),i=function(e){return e&&e.__esModule?e:{default:e}}(o),u=r.types.compose(r.types.model("Item",{id:a.autoHash,description:"",name:"New Item",quantity:r.types.optional(r.types.refinement(r.types.number,function(e){return e>=0}),1),type:r.types.optional(r.types.literal("item"),"item"),worth:r.types.optional(r.types.refinement(r.types.number,function(e){return e>=0}),0)}).actions(function(e){return{remove:function(){return(0,r.getParent)(e,2).removeItem(e)},setDescription:function(t){e.description=t},setName:function(t){e.name=t},setQuantity:function(t){e.quantity=t},setWorth:function(t){e.worth=t}}}),i.default)
t.default=u},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
return function(n,r){var a=String(n instanceof Map?n.get(e):n[e]),o=String(r instanceof Map?r.get(e):r[e])
return t?o.localeCompare(a):a.localeCompare(o)}}},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){var r=t.toLowerCase(),a=o({},n,{className:((n.className||"")+" "+r).trim()})
return u.default.createElement(c.default,o({caption:n.caption||u.default.createElement("i",{className:"icon-"+r}),className:r,onChange:e["set"+t],value:e[r]},a))}Object.defineProperty(t,"__esModule",{value:!0}),t.renderPropWithIcon=void 0
var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]
for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}
t.renderEditable=a
var i=n(0),u=r(i),l=n(37),c=r(l)
t.renderPropWithIcon=function(e,t){return a(e,t,{caption:u.default.createElement("abbr",{className:"icon-"+t.toLowerCase(),title:t}),min:0,type:"number"})}},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c,s=n(0),d=r(s),f=n(1),p=n(3),m=r(p)
n(39)
var y=(0,f.observer)((c=l=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.state={expanded:!1},r.toggleExpanded=function(){r.setState({expanded:!r.state.expanded})},r.render=function(){var e=r.props,t=e.className,n=e.contentsClassName,a=r.props,o=a.renderAlways,i=a.renderCollapsed,u=a.renderExpanded,l=r.state.expanded?"expanded":"collapsed"
return d.default.createElement("div",{className:("card "+l+" "+(t||"")).trim()},d.default.createElement("div",{className:"expander icon-"+l,onClick:r.toggleExpanded}),d.default.createElement("div",{className:("card-contents "+(n||"")).trim()},o(),r.state.expanded?u():i()))},i=n,o(r,i)}return i(t,e),t}(s.Component),l.defaultProps={renderAlways:m.default,renderCollapsed:m.default,renderExpanded:m.default},u=c))||u
t.default=y},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t]
return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_DESCRIPTORS=t.DERIVED_ATTRIBUTES=t.SECONDARY_ATTRIBUTES=t.PRIMARY_ATTRIBUTES=void 0
var o=n(2),i=n(6),u=n(19),l=n(5),c=(r(l),n(20)),s=r(c),d=n(15),f=r(d),p=n(22),m=r(p),y=n(8),v=r(y),h=n(16),b=r(h),g=n(23),E=r(g),_=n(24),O=r(_),j=n(17),w=r(j),x=t.PRIMARY_ATTRIBUTES=["acuity","agility","confidence","devotion","fitness","focus","intellect","intuition","strength"],P=(t.SECONDARY_ATTRIBUTES=["size","naturalArmor"],t.DERIVED_ATTRIBUTES=["body","mind","spirit","potency","reflex","resilience","accuracy","might","toughness","speed","power"],t.DEFAULT_DESCRIPTORS=["age","concept","eyes","gender","hair","height","homeland","race","weight"]),N=function(e){return e.replace(/^./,e.charAt(0).toUpperCase())},C=x.map(function(e){return{id:e,computed:!1,name:N(e),value:-1}}),A=[{id:"size",name:"Size",value:0},{id:"naturalArmor",name:"N. Armor",value:0}],M=P.map(function(e){return{id:e,name:N(e),value:""}}),S=o.types.model("Character",{id:i.autoHash,name:"Unnamed Character",rp:0,xp:0,portraitURL:"",primaryAttributes:o.types.optional(o.types.array(s.default),C),secondaryAttributes:o.types.optional(o.types.array(s.default),A),descriptors:o.types.optional(o.types.array(m.default),M),equipment:o.types.optional(o.types.array(o.types.union(f.default,v.default,w.default)),[]),health:o.types.optional(b.default,{}),skills:o.types.optional(o.types.array(E.default),[]),traits:o.types.optional(o.types.array(O.default),[])}).views(function(e){var t=function(t){return(e.attribute(t)||{}).value||0},n=function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r]
return n.map(function(e){return t(e)})},r=[s.default.create({id:"body",value:function(){return(0,u.average)(n("agility","fitness","strength"))},name:"Body"}),s.default.create({id:"mind",value:function(){return(0,u.average)(n("acuity","focus","intellect"))},name:"Mind"}),s.default.create({id:"potency",value:function(){return(0,u.average)(n("confidence","intellect","strength"))},name:"Potency"}),s.default.create({id:"reflex",value:function(){return(0,u.average)(n("acuity","agility","intuition"))},name:"Reflex"}),s.default.create({id:"resilience",value:function(){return(0,u.average)(n("devotion","fitness","focus"))},name:"Resilience"}),s.default.create({id:"speed",value:function(){return(0,u.sum)(6,t("size"),Math.round(t("fitness")/2))},name:"Speed"}),s.default.create({id:"spirit",value:function(){return(0,u.average)(n("confidence","devotion","intuition"))},name:"Spirit"})]
return{get attributes(){return[].concat(a(e.primaryAttributes),a(e.secondaryAttributes),r)},get attributeIds(){return[].concat(a(e.primaryAttributes.map(function(e){return e.id})),a(r.map(function(e){return e.id})))},get armor(){return e.equipment.filter(function(e){return f.default.is(e)})},get armorRating(){return t("naturalArmor")+(0,u.sum)(e.armor.map(function(e){return e.equipped?e.rating:0}))},get equipped(){return e.equipment.filter(function(e){return e.equipped})},get power(){return(0,u.sum)([].concat(a(e.primaryAttributes.map(function(e){return e.xpCost})),a(e.skills.map(function(e){return e.xpCost})),a(e.traits.map(function(e){return e.xpCost}))))},get weapons(){return e.equipment.filter(function(e){return w.default.is(e)})}}}).actions(function(e){return{addArmor:function(){e.equipment.push(f.default.create())},addItem:function(){e.equipment.push(v.default.create())},addSkill:function(){e.skills.push(E.default.create())},addTrait:function(){e.traits.push(O.default.create())},addWeapon:function(){e.equipment.push(w.default.create())},attribute:function(t){return e.attributes.find(function(e){return e.id===t})},removeItem:function(t){return e.equipment.remove(t)},removeSkill:function(t){return e.skills.remove(t)},removeTrait:function(t){return e.traits.remove(t)},setAttribute:function(t,n){e.attribute(t).setValue(n)},setName:function(t){e.name=t},setPortraitURL:function(t){e.portraitURL=t},setXP:function(t){e.xp=t},setRP:function(t){e.rp=t}}})
t.default=S},function(e,t,n){"use strict"
function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,n=String(e),r=0
return n.split("").forEach(function(e){r=(r<<5)-r+e.charCodeAt(0),r&=r}),Math.abs(r).toString(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r
t.randomHash=function(){return r(Math.random().toString())}},function(e,t,n){"use strict"
function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t]
return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e<=t?1:-1,a=Math.abs(t-e)/Math.abs(n)+1
return Array.apply(void 0,r(Array(a))).map(function(t,r){return e+r*n})}},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(2),a=n(8),o=function(e){return e&&e.__esModule?e:{default:e}}(a),i=r.types.refinement(r.types.number,function(e){return e>=0}),u=r.types.compose(o.default,r.types.model("Armor",{name:"New Armor",rating:r.types.optional(i,0),type:r.types.optional(r.types.literal("armor"),"armor")}).actions(function(e){return{setRating:function(t){e.rating=t}}}))
t.default=u},function(e,t,n){"use strict"
function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t]
return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.TYPES=void 0
var a=n(2),o=n(5),i=function(e){return e&&e.__esModule?e:{default:e}}(o),u=t.TYPES=["ok","light","heavy","bane"],l=a.types.union.apply(a.types,r(u.map(function(e){return a.types.literal(e)}))),c=a.types.model("Health",{levels:a.types.optional(a.types.array(l),[])}).volatile(function(e){return{get parent(){return(0,a.getParent)(e)}}}).views(function(e){return{get damage(){return e.levels.filter(function(e){return"ok"!==e}).length},get max(){var t=e.parent.attribute("resilience").value||0,n=e.parent.attribute("size").value||0
return(0,i.default)(5+t+n,{min:1})}}}).actions(function(e){return{heal:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=e.levels.toJS().reverse().filter(function(e){return"ok"!==e})
n.length-=(0,i.default)(t,{max:n.length}),e.levels=[].concat(r(Array(e.max-n.length).fill("ok")),r(n.reverse()))},healAll:function(){e.levels=Array(e.max).fill("ok")},setLevel:function(t,n){if(u.includes(n)){var r=(0,i.default)(t-1,{min:0,max:e.levels.length-1}),a=u.indexOf(n),o=u.indexOf(e.levels[r])
if(a!==o){var l=a>o?"↑":"↓"
e.levels=e.levels.map(function(e,t){if(t===r)return n
var o={}
return"↓"===l&&t<r?o.max=(0,i.default)(a,{min:0}):"↑"===l&&t>r&&(o.min=a),u[(0,i.default)(u.indexOf(e),o)]})}}},afterAttach:function(){(0,a.onSnapshot)(e.parent,function(){return e.resizeValues()}),e.resizeValues(),e.levels=e.levels.sort().reverse()},resizeValues:function(){var t,n=e.max,a=e.levels
a.length<n&&(t=e.levels).unshift.apply(t,r(Array(n-a.length).fill("ok"))),e.levels.length>n&&(e.levels.length=n)}}})
t.default=c},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(2),a=n(8),o=function(e){return e&&e.__esModule?e:{default:e}}(a),i=r.types.refinement(r.types.array(r.types.number),function(e){return 3===e.length}),u={accuracy:1,damage:0,range:2},l=r.types.compose(o.default,r.types.model("Weapon",{name:"New Weapon",type:r.types.optional(r.types.literal("weapon"),"weapon"),values:r.types.optional(i,[0,0,0])}).views(function(e){return{get accuracy(){return e.values[u.accuracy]},get damage(){return e.values[u.damage]},get range(){return e.values[u.range]}}}).actions(function(e){return{setAccuracy:function(t){e.setValue(u.accuracy,t)},setDamage:function(t){e.setValue(u.damage,t)},setRange:function(t){e.setValue(u.range,t)},setValue:function(t,n){e.values[t]=n},setValues:function(t){e.values=t}}}))
t.default=l},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Sheet=t.Character=void 0
var a=n(12),o=r(a),i=n(25),u=r(i)
t.Character=o.default,t.Sheet=u.default},function(e,t,n){"use strict"
function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t]
return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0})
var a=function(e){return function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a]
return e(!r.length&&Array.isArray(t)?t:[t].concat(r))}},o=t.sum=a(function(e){return e.reduce(function(e,t){return e+t},0)})
t.average=a(function(e){return Math.round(o.apply(void 0,r(e))/e.length)})},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t]
return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.createComputed=t.Computed=t.Secondary=t.Primary=void 0
var o=n(2),i=n(5),u=r(i),l=n(14),c=r(l),s=n(7),d=r(s),f=o.types.model("Attribute",{id:o.types.identifier(o.types.string),name:o.types.string}).actions(function(e){return{setValue:function(t){var n=(0,u.default)(t,{min:e.min,max:e.max})
n!==e.value&&(e.value=n)}}}),p=o.types.compose(o.types.model("Attribute",{max:10,min:-1,type:o.types.optional(o.types.literal("primary"),"primary"),value:-1}),f,(0,d.default)(function(e){var t=[]
return e.value>=0&&t.push.apply(t,a((0,c.default)(0,e.value))),t.reduce(function(e,t){return e+(0,u.default)(5*t,{min:5})},0)},["setValue"])),m=o.types.compose(o.types.model("Attribute",{type:o.types.optional(o.types.literal("secondary"),"secondary"),value:0}),f),y=o.types.model("Attribute",{id:o.types.identifier(o.types.string),name:o.types.string,type:o.types.optional(o.types.literal("computed"),"computed")}),v=function(e){return o.types.compose(y,o.types.model("Attribute",{}).views(function(t){return{get value(){return e(t)}}}))},h=o.types.union(function(e){return"function"==typeof e.value?v(e.value):["size","naturalArmor"].indexOf(e.id)>=0?m:p},p,m,y)
t.default=h,t.Primary=p,t.Secondary=m,t.Computed=y,t.createComputed=v},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(2),a=r.types.model({equipped:!1}).actions(function(e){return{equip:function(){e.equipped=!0},setEquipped:function(t){e.equipped=Boolean(t)},toggleEquipped:function(){e.equipped=!e.equipped},unequip:function(){e.equipped=!1}}})
t.default=a},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(2),a=r.types.model("Descriptor",{id:r.types.identifier(r.types.string),name:"",value:""}).actions(function(e){return{setName:function(t){e.name=t},setValue:function(t){e.value=t}}})
t.default=a},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t]
return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0})
var o=n(2),i=n(6),u=n(5),l=r(u),c=n(14),s=r(c),d=n(7),f=r(d),p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e
return o.types.refinement(o.types.optional(o.types.number,n),function(n){return void 0===n||n>=e&&n<=t})},m=o.types.compose(o.types.model("Skill",{id:i.autoHash,name:"New Skill",theory:p(0,10),mastery:p(0,10)}).views(function(e){return{get modifier(){return(0,o.getParent)(e,2).modifierFor(e.name)}}}).actions(function(e){return{remove:function(){return(0,o.getParent)(e,2).removeSkill(e)},setName:function(t){e.name=t},setTheory:function(t){e.theory=t},setMastery:function(t){e.mastery=t}}}),(0,f.default)(function(e){var t=[]
return e.theory>=1&&t.push.apply(t,a((0,s.default)(1,e.theory))),e.mastery>=1&&t.push.apply(t,a((0,s.default)(1,e.mastery))),t.reduce(function(e,t){return e+(0,l.default)(3*t,{min:3})},0)},["setMastery","setTheory"]))
t.default=m},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(2),a=n(6),o=n(7),i=function(e){return e&&e.__esModule?e:{default:e}}(o),u=r.types.compose(r.types.model("Trait",{id:a.autoHash,name:"New Trait",value:0}).actions(function(e){return{remove:function(){return(0,r.getParent)(e,2).removeTrait(e)},setName:function(t){e.name=t},setValue:function(t){e.value=t}}}),(0,i.default)(function(e){return e.value},["setValue"]))
t.default=u},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c,s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),f=r(d),p=n(1),m=n(2),y=n(5),v=r(y),h=n(3),b=r(h),g=n(12),E=r(g),_=n(26),O=r(_),j=n(31),w=r(j),x=n(4),P=r(x),N=n(35),C=r(N),A=n(46),M=r(A),S=n(48),T=r(S),R=n(50),k=r(R),q=n(54),D=r(q)
n(58),n(59)
var V=(0,p.observer)((c=l=function(e){function t(e){a(this,t)
var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))
return n.state={sizeClass:"large"},n.handleWindowResize=function(){if(n.container){var e=n.container.offsetWidth,t=(0,v.default)(Math.floor(e/250),{min:1,max:3}),r=["small","medium","large"][t-1]
n.setState({sizeClass:r})}},n.bindContainer=function(e){n.container=e},n.render=function(){var e=n.character,t=n.props.readonly,r=n.state.sizeClass,a=void 0===r?"large":r,o=["sheetforge sheet axis",a,t?"readonly":""].filter(Boolean).join(" ")
return f.default.createElement("div",{className:o,ref:n.bindContainer},f.default.createElement("header",null,f.default.createElement(P.default,{className:"character-name",value:e.name,onChange:e.setName}),f.default.createElement("div",{className:"xp attribute"},f.default.createElement("span",{className:"name"},"XP"),f.default.createElement(P.default,{min:0,value:e.xp,onChange:e.setXP})),f.default.createElement("div",{className:"rp attribute"},f.default.createElement("span",{className:"name"},"RP"),f.default.createElement(P.default,{min:0,max:5,value:e.rp,onChange:e.setRP})),f.default.createElement("div",{className:"power attribute"},f.default.createElement("div",{className:"name"},"CP"),f.default.createElement(P.default,{value:e.power,readonly:!0}))),f.default.createElement(T.default,{url:e.portraitURL,onChange:e.setPortraitURL}),f.default.createElement(M.default,{health:e.health}),f.default.createElement(w.default,{descriptors:e.descriptors}),f.default.createElement(O.default,{attributes:e.attributes,modifiers:e.modifiers}),f.default.createElement(D.default,{traits:e.traits,modifiers:e.modifiers,addTrait:e.addTrait,layout:a}),f.default.createElement(k.default,{skills:e.skills,modifiers:e.modifiers,addSkill:e.addSkill}),f.default.createElement(C.default,{buttons:f.default.createElement("div",{className:"buttons"},"Add:",f.default.createElement("button",{className:"icon-weapon",onClick:e.addWeapon}),f.default.createElement("button",{className:"icon-armor",onClick:e.addArmor}),f.default.createElement("button",{className:"icon-add",onClick:e.addItem})),equipment:e.equipment,layout:a}))},n.character=E.default.create(e.character),n.disposeOfSnapshotListener=(0,m.onSnapshot)(n.character,n.props.onChange),window.addEventListener("resize",n.handleWindowResize),n}return i(t,e),s(t,[{key:"componentDidMount",value:function(){this.handleWindowResize()}},{key:"componentWillUnmount",value:function(){this.disposeOfSnapshotListener()}}]),t}(d.Component),l.displayName="Sheet",l.defaultProps={character:{},onChange:b.default,readonly:!1},u=c))||u
t.default=V},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u=n(0),l=r(u),c=n(27),s=r(c)
n(30)
var d=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,c=Array(u),d=0;d<u;d++)c[d]=arguments[d]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.renderAttribute=function(e){var t=r.props.attributes.find(function(t){return t.id===e})
return l.default.createElement(s.default,{model:t,className:e})},r.renderComputed=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=r.props.attributes.find(function(t){return t.id===e})
return l.default.createElement(s.default,{model:n,className:e+" "+t+" computed",computed:!0})},r.renderHeader=function(e,t){return l.default.createElement("div",{className:"attribute "+e+" header highlight"},l.default.createElement("span",{className:"name"},t))},r.render=function(){return l.default.createElement("div",{className:"attributes section"},l.default.createElement("header",null,"Attributes"),r.renderComputed("potency","header highlight"),r.renderComputed("reflex","header highlight"),r.renderComputed("resilience","header highlight"),r.renderComputed("body","header highlight"),r.renderAttribute("strength"),r.renderAttribute("agility"),r.renderAttribute("fitness"),r.renderComputed("mind","header highlight"),r.renderAttribute("intellect"),r.renderAttribute("acuity"),r.renderAttribute("focus"),r.renderComputed("spirit","header highlight"),r.renderAttribute("confidence"),r.renderAttribute("intuition"),r.renderAttribute("devotion"),l.default.createElement("hr",{className:"divider"}),r.renderHeader("racial","Racial"),r.renderAttribute("size"),r.renderComputed("speed"),r.renderAttribute("naturalArmor"))},i=n,o(r,i)}return i(t,e),t}(u.Component)
t.default=d},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c,s=n(0),d=r(s),f=n(1),p=n(4),m=r(p)
n(29)
var y=(0,f.observer)((c=l=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.renderValue=function(){var e=r.props.model,t=e.computed,n=e.min,a=e.max,o=e.value,i="function"!=typeof o?o:o(),u=Boolean(!t&&0),l=t?i+0:i,c=t?d.default.createElement(m.default,{max:a,min:n,readonly:!0,value:l}):d.default.createElement(m.default,{max:a,min:n,onChange:e.setValue,value:i}),f=["value",u?"modified":""].filter(Boolean)
return d.default.createElement("div",{className:f.join(" ")},c,u&&d.default.createElement(s.Fragment,null,"↣",d.default.createElement("span",{className:"temporary"},0)))},r.render=function(){var e=r.props,t=e.className,n=void 0===t?"":t,a=e.model
return d.default.createElement("div",{className:"attribute "+n+" "+a.id},d.default.createElement("span",{className:"name"},a.name),r.renderValue())},i=n,o(r,i)}return i(t,e),t}(s.Component),l.defaultProps={className:"none",min:-10,max:10,model:{id:"none",name:""},modifier:0},u=c))||u
t.default=y},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0})
var a=n(0),o=r(a),i=n(1),u=n(32),l=r(u)
n(34)
var c=["homeland","race","concept","height","weight","gender","eyes","hair","age"],s=function(e){var t=e.descriptors
return o.default.createElement("div",{className:"descriptors section"},o.default.createElement("header",null,"Descriptors"),c.map(function(e){return o.default.createElement(l.default,{key:e,model:t.find(function(t){return t.id===e})})}))}
t.default=(0,i.observer)(s)},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0})
var a=n(0),o=r(a),i=n(1),u=n(4),l=r(u)
n(33)
var c=function(e){var t=e.model
return o.default.createElement("div",{className:"descriptor "+t.id},o.default.createElement("div",{className:"name"},t.name),o.default.createElement(l.default,{className:"value",value:t.value,onChange:t.setValue}))}
t.default=(0,i.observer)(c)},function(e,t){},function(e,t){},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0})
var a=n(0),o=r(a),i=n(1),u=n(9),l=r(u),c=n(36),s=r(c),d=n(15),f=r(d),p=n(41),m=r(p),y=n(43),v=r(y),h=n(17),b=r(h)
n(45)
var g=function(e){return e.sort((0,l.default)("name")).sort((0,l.default)("equipped",!0))},E={},_=(0,i.observer)(function(e){var t=e.buttons,n=e.equipment,r=void 0===n?[]:n,a=e.layout,i=void 0===a?"large":a,u="large"===i?Math.ceil(r.length/2)+1:r.length+1,l={gridTemplateRows:"repeat("+u+", auto)"}
return o.default.createElement("div",{className:"equipment section",style:l},o.default.createElement("header",{className:"icon-backpack"},"Equipment",t),g(r).map(function(e){E[e.id]||(E[e.id]=function(){""===e.name&&e.remove()})
var t={key:e.id,item:e,onEditEnd:E[e.id]},n=m.default
return b.default.is(e)&&(n=v.default),f.default.is(e)&&(n=s.default),o.default.createElement(n,t)}))})
_.displayName="EquipmentSection",t.default=_},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c,s=n(0),d=r(s),f=n(1),p=n(10),m=n(3),y=n(11),v=r(y)
n(40)
var h=(0,f.observer)((c=l=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.renderAlways=function(){var e=r.props,t=e.item,n=e.editing,a=e.onEditEnd,o=e.onEditStart
return d.default.createElement(s.Fragment,null,(0,p.renderEditable)(t,"Equipped",{type:"boolean"}),(0,p.renderEditable)(t,"Name",{className:"icon-armor",forceEditMode:n,onEditEnd:a,onEditStart:o}),(0,p.renderEditable)(t,"Rating",{type:"number",caption:"Armor Rating:"}))},r.renderExpanded=function(){var e=r.props.item
return d.default.createElement(s.Fragment,null,(0,p.renderEditable)(e,"Description",{placeholder:"Description"}))},r.render=function(){return d.default.createElement(v.default,{className:"armor-card",contentsClassName:"item armor",renderAlways:r.renderAlways,renderExpanded:r.renderExpanded})},i=n,o(r,i)}return i(t,e),t}(s.Component),l.defaultProps={item:{},onEditStart:m.noop,onEditEnd:m.noop},u=c))||u
t.default=h},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n={}
for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])
return n}Object.defineProperty(t,"__esModule",{value:!0})
var o=n(0),i=r(o),u=n(4),l=r(u)
n(38),t.default=function(e){var t=e.caption,n=e.className,r=a(e,["caption","className"])
return i.default.createElement("label",{className:("labeled-editable "+n).trim()},"string"==typeof t?i.default.createElement("span",{className:"caption"},t):t,i.default.createElement(l.default,r))}},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c,s=n(0),d=r(s),f=n(1),p=n(10),m=n(11),y=r(m),v=n(3),h=r(v)
n(42)
var b=(0,f.observer)((c=l=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.renderAlways=function(){var e=r.props,t=e.editing,n=e.onEditStart,a=e.onEditEnd,o=e.item
return d.default.createElement(s.Fragment,null,(0,p.renderEditable)(o,"Equipped",{type:"boolean"}),(0,p.renderEditable)(o,"Name",{className:"icon-backpack",forceEditMode:t,onEditEnd:a,onEditStart:n}))},r.renderExpanded=function(){var e=r.props.item,t=e.description||"Description"
return(0,p.renderEditable)(e,"Description",{placeholder:t})},r.render=function(){return d.default.createElement(y.default,{className:"item-card",contentsClassName:"item",renderAlways:r.renderAlways,renderExpanded:r.renderExpanded})},i=n,o(r,i)}return i(t,e),t}(s.Component),l.defaultProps={onEditStart:h.default,onEditEnd:h.default},u=c))||u
t.default=b},function(e,t){},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l=n(0),c=r(l),s=n(1),d=n(10),f=n(11),p=r(f)
n(44)
var m=(0,s.observer)(u=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,s=Array(u),f=0;f<u;f++)s[f]=arguments[f]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.renderAlways=function(){var e=r.props,t=e.editing,n=e.item,a=e.onEditEnd,o=e.onEditStart
return c.default.createElement(l.Fragment,null,(0,d.renderEditable)(n,"Equipped",{type:"boolean"}),(0,d.renderEditable)(n,"Name",{className:"icon-weapon",forceEditMode:t,onEditEnd:a,onEditStart:o}),(0,d.renderEditable)(n,"Damage",{type:"number",caption:c.default.createElement("abbr",{title:"Damage"},"Dmg:")}),(0,d.renderEditable)(n,"Range",{type:"number",caption:c.default.createElement("abbr",{title:"Range"},"Rng:")}),(0,d.renderEditable)(n,"Accuracy",{type:"number",caption:c.default.createElement("abbr",{title:"Accuracy"},"Acc:")}))},r.renderExpanded=function(){var e=r.props.item,t=e.description||"Description"
return(0,d.renderEditable)(e,"Description",{placeholder:t})},r.render=function(){return c.default.createElement(p.default,{className:"item-card weapon-card",contentsClassName:"item weapon",renderAlways:r.renderAlways,renderExpanded:r.renderExpanded})},i=n,o(r,i)}return i(t,e),t}(l.Component))||u
t.default=m},function(e,t){},function(e,t){},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l=n(0),c=r(l),s=n(1),d=n(16),f=n(13),p=r(f)
n(47)
var m=(0,s.observer)(u=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.handleClick=function(e){var t=r.props.health,n=parseInt(e.target.attributes.index.value,10),a=d.TYPES.indexOf(t.levels[n]),o=a+1
e.shiftKey&&(o=a-1),e.ctrlKey&&(o=0),o>d.TYPES.length-1&&(o=0),o<0&&(o=d.TYPES.length-1),t.setLevel(n+1,d.TYPES[o])},r.render=function(){var e=r.props.health,t=Math.ceil(e.max/10),n=t>1?10:e.max,a={gridTemplateColumns:"repeat("+n+", 1fr)",gridTemplateRows:"repeat("+t+", 1fr)"}
return c.default.createElement("div",{className:"health-bar"},c.default.createElement("div",{className:"header"},"Health"),c.default.createElement("div",{className:"levels",style:a},e.levels.map(function(e,t){return c.default.createElement("div",{className:e+" icon-health",index:t,key:(0,p.default)(t),onClick:r.handleClick})})))},i=n,o(r,i)}return i(t,e),t}(l.Component))||u
t.default=m},function(e,t){},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c,s=n(0),d=r(s),f=n(1),p=n(4),m=r(p),y=n(3),v=r(y)
n(49)
var h=function(e){return"url("+(e||"//via.placeholder.com/300x400/eeeeee?text=3x4+aspect+ratio")+")"},b=(0,f.observer)((c=l=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.state={editing:!1},r.toggleEditing=function(){r.setState({editing:!r.state.editing})},r.renderEditor=function(){return d.default.createElement(m.default,{forceEditMode:!0,type:"multiline",onChange:r.props.onChange,onEditEnd:r.toggleEditing,value:r.props.url})},r.render=function(){return d.default.createElement("div",{className:"portrait section"},d.default.createElement("header",null,"Portrait"),d.default.createElement("div",{className:"border-container"},d.default.createElement("div",{className:"image",onClick:r.toggleEditing,style:{backgroundImage:h(r.props.url)}},r.state.editing&&r.renderEditor())))},i=n,o(r,i)}return i(t,e),t}(s.Component),l.defaultProps={onChange:v.default,url:"//via.placeholder.com/300x400/eeeeee?text=3x4+aspect+ratio"},u=c))||u
t.default=b},function(e,t){},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l=n(0),c=r(l),s=n(1),d=n(9),f=r(d),p=n(51),m=r(p)
n(53)
var y=(0,f.default)("name"),v={},h=(0,s.observer)(u=function(e){function t(){var e,n,r,i
a(this,t)
for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s]
return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.render=function(){var e=r.props,t=e.addSkill,n=e.skills,a=void 0===n?[]:n,o=Math.ceil(a.length/2),i={gridTemplateRows:"25px 25px repeat("+(o||1)+", 30px)"}
return c.default.createElement("div",{className:"skills section",style:i},c.default.createElement("header",null,"Skills",c.default.createElement("button",{className:"icon-add",onClick:t})),c.default.createElement("header",{className:"subheader"},c.default.createElement("div",{className:"skill"},c.default.createElement("span",{className:"name"},"Name"),c.default.createElement("abbr",{className:"theory",title:"Theory"},"Th"),c.default.createElement("abbr",{className:"mastery",title:"Mastery"},"Ms")),c.default.createElement("div",{className:"skill"},c.default.createElement("span",{className:"name"},"Name"),c.default.createElement("abbr",{className:"theory",title:"Theory"},"Th"),c.default.createElement("abbr",{className:"mastery",title:"Mastery"},"Ms"))),a.sort(y).map(function(e){return v[e.id]||(v[e.id]=function(){""===e.name&&e.remove()}),c.default.createElement(m.default,{key:e.id,skill:e,onEditEnd:v[e.id]})}))},i=n,o(r,i)}return i(t,e),t}(l.Component))||u
t.default=h},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c,s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),f=r(d),p=n(1),m=n(4),y=r(m),v=n(3),h=r(v)
n(52)
var b=(0,p.observer)((c=l=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"render",value:function(){var e=this.props,t=e.editing,n=e.onEditStart,r=e.onEditEnd,a=e.skill
return f.default.createElement("div",{className:"skill"},f.default.createElement(y.default,{className:"name",forceEditMode:t,onChange:a.setName,onEditStart:n,onEditEnd:r,value:a.name}),f.default.createElement(y.default,{className:"theory",max:10,min:0,type:"number",onChange:a.setTheory,value:a.theory||"-"}),f.default.createElement(y.default,{className:"mastery",max:10,min:0,type:"number",onChange:a.setMastery,value:a.mastery||"-"}))}}]),t}(d.Component),l.defaultProps={onEditStart:h.default,onEditEnd:h.default},u=c))||u
t.default=b},function(e,t){},function(e,t){},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0})
var a=n(0),o=r(a),i=n(1),u=n(9),l=r(u),c=n(3),s=r(c),d=n(55),f=r(d)
n(57)
var p=(0,l.default)("name"),m={},y=(0,i.observer)(function(e){var t=e.addTrait,n=void 0===t?s.default:t,r=e.layout,a=void 0===r?"large":r,i=e.traits,u=void 0===i?[]:i,l="medium"===a?Math.ceil(u.length/2):u.length,c={gridTemplateRows:"25px 25px repeat("+(l||1)+", 30px)"}
return o.default.createElement("div",{className:"traits section",style:c},o.default.createElement("header",null,"Traits",o.default.createElement("button",{className:"icon-add",onClick:n})),o.default.createElement("header",{className:"subheader"},o.default.createElement("div",{className:"trait"},o.default.createElement("span",{className:"name"},"Name"),o.default.createElement("span",{className:"value"},"Cost")),o.default.createElement("div",{className:"trait"},o.default.createElement("span",{className:"name"},"Name"),o.default.createElement("span",{className:"value"},"Cost"))),u.sort(p).map(function(e){return m[e.id]||(m[e.id]=function(){""===e.name&&e.remove()}),o.default.createElement(f.default,{key:e.id,trait:e,onEditEnd:m[e.id]})}))})
y.displayName="TraitSection",t.default=y},function(e,t,n){"use strict"
function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var u,l,c,s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),f=r(d),p=n(1),m=n(4),y=r(m),v=n(3),h=r(v)
n(56)
var b=(0,p.observer)((c=l=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"render",value:function(){var e=this.props,t=e.editing,n=e.onEditStart,r=e.onEditEnd,a=e.trait
return f.default.createElement("div",{className:"trait"},f.default.createElement(y.default,{className:"name",forceEditMode:t,onChange:a.setName,onEditStart:n,onEditEnd:r,value:a.name}),f.default.createElement(y.default,{className:"value",type:"number",onChange:a.setValue,value:a.value||"-"}))}}]),t}(d.Component),l.defaultProps={onEditStart:h.default,onEditEnd:h.default},u=c))||u
t.default=b},function(e,t){},function(e,t){},function(e,t){},function(e,t){}])})


/***/ }),

/***/ "4mcu":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "52gC":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "5GVZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobxStateTree = __webpack_require__("D5HE");

var _ArticlePage = __webpack_require__("zQLw");

var _ArticlePage2 = _interopRequireDefault(_ArticlePage);

var _MediaPage = __webpack_require__("otPO");

var _MediaPage2 = _interopRequireDefault(_MediaPage);

var _ProfilePage = __webpack_require__("LGog");

var _ProfilePage2 = _interopRequireDefault(_ProfilePage);

var _SearchPage = __webpack_require__("aO2Z");

var _SearchPage2 = _interopRequireDefault(_SearchPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mobxStateTree.types.union(_ArticlePage2.default, _MediaPage2.default, _ProfilePage2.default, _SearchPage2.default);

/***/ }),

/***/ "5N57":
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__("ICSD"),
    root = __webpack_require__("TQ3y");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "5PlU":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("RY/4");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var Iterators = __webpack_require__("/bQp");
module.exports = __webpack_require__("FeBl").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "5QVw":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("BwfY"), __esModule: true };

/***/ }),

/***/ "5Zxu":
/***/ (function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__("sBat");

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),

/***/ "5zde":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("zQR9");
__webpack_require__("qyJz");
module.exports = __webpack_require__("FeBl").Array.from;


/***/ }),

/***/ "68dF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _noop = __webpack_require__("TgZ1");

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TAB = {
  id: 'blank',
  onClick: _noop2.default,
  renderTab: function renderTab() {
    return _react2.default.createElement('div', null);
  },
  renderContents: function renderContents() {
    return _react2.default.createElement('div', null);
  }
};

var TabSet = function TabSet(_ref) {
  var activeTabId = _ref.activeTabId,
      buttons = _ref.buttons,
      _ref$onTabClicked = _ref.onTabClicked,
      onTabClicked = _ref$onTabClicked === undefined ? _noop2.default : _ref$onTabClicked,
      _ref$showTabs = _ref.showTabs,
      showTabs = _ref$showTabs === undefined ? true : _ref$showTabs,
      _ref$tabs = _ref.tabs,
      tabs = _ref$tabs === undefined ? [] : _ref$tabs;

  if (tabs.length === 0) tabs.push(DEFAULT_TAB);

  var activeId = activeTabId || tabs[0].id;
  var activeTab = tabs.find(function (tab) {
    return tab.id === activeId;
  }) || tabs[0];
  var className = ['tab-set', !showTabs ? 'no-tabs' : ''].filter(Boolean).join(' ');

  return _react2.default.createElement(
    'div',
    { className: className },
    showTabs && _react2.default.createElement(
      _react.Fragment,
      null,
      _react2.default.createElement(
        'ul',
        { className: 'tabs ' + activeTabId },
        tabs.map(function (tab) {
          // eslint-disable-next-line no-param-reassign
          if (!tab.onClick) tab.onClick = function () {
            return onTabClicked(tab.id);
          };

          var liClassName = ['tab', tab.className, tab.id, activeTab.id === tab.id && 'is-active'].filter(Boolean).join(' ');

          return _react2.default.createElement(
            'li',
            { key: tab.id, className: liClassName, onClick: tab.onClick },
            tab.tab
          );
        }),
        _react2.default.createElement(
          'li',
          { className: 'buttons' },
          buttons
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'tab-contents' },
      activeTab.contents
    )
  );
};

TabSet.displayName = 'TabSet';
exports.default = TabSet;

/***/ }),

/***/ "6Hnu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var _class, _class2, _temp2;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__("uva0");

var _unique = __webpack_require__("lMsm");

var _unique2 = _interopRequireDefault(_unique);

var _config = __webpack_require__("1wn0");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = document.querySelector('html');
var head = document.querySelector('head') || document.createElement('head');
if (!head.parentElement) html.insertBefore(head, html.firstChild);

var getOrCreateHeadTag = function getOrCreateHeadTag(name) {
  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'meta';

  var el = head.querySelector(tag + '[name="' + name + '"]') || (0, _assign2.default)(document.createElement(tag), { name: name });
  if (!el.parentElement) head.appendChild(el);

  return el;
};

var HtmlMetadata = (0, _mobxReact.observer)(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3.default)(HtmlMetadata, _Component);

  function HtmlMetadata() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, HtmlMetadata);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HtmlMetadata.__proto__ || (0, _getPrototypeOf2.default)(HtmlMetadata)).call.apply(_ref, [this].concat(args))), _this), _this.restoreHeadTag = function () {
      _this.meta.author.content = _this.originalValues.author;
      _this.meta.description.content = _this.originalValues.description;
      _this.meta.keywords.content = _this.originalValues.keywords;
      _this.meta.title.textContent = _this.originalValues.title;
    }, _this.updateHeadTag = function (props) {
      _this.meta.author.content = props.author;
      _this.meta.description.content = props.description;
      _this.meta.keywords.content = (0, _unique2.default)(props.keywords).sort().join(', ');
      _this.meta.title.textContent = _this.props.titleFormat.replace('%TITLE%', props.title).replace('%APPNAME%', _config2.default.applicationName);
    }, _this.meta = {
      author: getOrCreateHeadTag('author'),
      description: getOrCreateHeadTag('description'),
      keywords: getOrCreateHeadTag('keywords'),
      title: getOrCreateHeadTag('', 'title')
    }, _this.originalValues = {
      author: _this.meta.author.content,
      description: _this.meta.description.content,
      keywords: _this.meta.keywords.content,
      title: _this.meta.title.textContent
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(HtmlMetadata, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateHeadTag(this.props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateHeadTag(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.restoreHeadTag();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return HtmlMetadata;
}(_react.Component), _class2.defaultProps = {
  author: '',
  description: '',
  keywords: [],
  title: '',
  titleFormat: '%TITLE% - %APPNAME%'
}, _temp2)) || _class;

exports.default = HtmlMetadata;

/***/ }),

/***/ "6MiT":
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__("aCM0"),
    isObjectLike = __webpack_require__("UnEC");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "6uJE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__("+6Bu");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = __webpack_require__("wF3A");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _noop = __webpack_require__("TgZ1");

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TinyMCE = (0, _reactLoadable2.default)({
  loader: function loader() {
    return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, "J7sp"));
  },
  loading: function loading() {
    return _react2.default.createElement('div', { className: 'loading' });
  }
});

var WysiwygEditor = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(WysiwygEditor, _Component);

  function WysiwygEditor() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, WysiwygEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WysiwygEditor.__proto__ || (0, _getPrototypeOf2.default)(WysiwygEditor)).call.apply(_ref, [this].concat(args))), _this), _this.previousValue = _this.props.html, _this.handleChangeEvent = function (_, editor) {
      var html = editor.getContent();
      if (html !== _this.previousValue) {
        _this.props.onChange(html);
        _this.previousValue = html;
      }
    }, _this.render = function () {
      var _this$props = _this.props,
          html = _this$props.html,
          onChange = _this$props.onChange,
          props = (0, _objectWithoutProperties3.default)(_this$props, ['html', 'onChange']);

      return _react2.default.createElement(
        'div',
        { className: 'wysiwyg-editor' },
        _react2.default.createElement('div', { className: 'menubar' }),
        _react2.default.createElement(TinyMCE, (0, _extends3.default)({}, props, {
          initialValue: html,
          inline: true,
          onNodeChange: _this.handleChangeEvent,
          onCut: _this.handleChangeEvent,
          onKeyUp: _this.handleChangeEvent,
          onPaste: _this.handleChangeEvent
        }))
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(WysiwygEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.previousValue = props.html;
    }
  }]);
  return WysiwygEditor;
}(_react.Component), _class.defaultProps = {
  onChange: _noop2.default
}, _temp2);
exports.default = WysiwygEditor;

/***/ }),

/***/ "77Pl":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("EqjI");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "7KvD":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "7UMu":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("R9M2");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "7YkW":
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__("YeCl"),
    setCacheAdd = __webpack_require__("Cskv"),
    setCacheHas = __webpack_require__("aQOO");

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ "7ZyS":
/***/ (function(module, exports, __webpack_require__) {

var basePropertyOf = __webpack_require__("Kl7s");

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;


/***/ }),

/***/ "7e4z":
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__("uieL"),
    isArguments = __webpack_require__("1Yb9"),
    isArray = __webpack_require__("NGEn"),
    isBuffer = __webpack_require__("ggOT"),
    isIndex = __webpack_require__("ZGh9"),
    isTypedArray = __webpack_require__("YsVG");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "7nRM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__("c/Tr");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
};

/***/ }),

/***/ "8++/":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ "880/":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("hJx8");


/***/ }),

/***/ "8jhr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ANONYMOUS = undefined;

var _regenerator = __webpack_require__("Xxa5");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var _mobxStateTree = __webpack_require__("D5HE");

var _commonModels = __webpack_require__("Cde9");

var _fetch = __webpack_require__("06WZ");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthToken = _mobxStateTree.types.model('AuthToken', {
  algorithm: '',
  code: '',
  issued_at: 0,
  user_id: ''
});

var ANONYMOUS = exports.ANONYMOUS = {
  articles: [],
  email: '',
  favorites: [],
  id: '',
  name: 'Anonymous',
  privileges: [],
  tags: [],
  token: AuthToken.create()
};

exports.default = _mobxStateTree.types.model('User', {
  articles: _commonModels.optionalArrayOfStrings,
  email: '',
  favorites: _commonModels.optionalArrayOfStrings,
  id: '',
  name: 'Anonymous',
  privileges: _commonModels.optionalArrayOfStrings,
  tags: _commonModels.optionalArrayOfStrings,
  token: _mobxStateTree.types.optional(AuthToken, {})
}).views(function (self) {
  return {
    get anonymous() {
      return !self.id;
    }
  };
}).actions(function (self) {
  return {
    become: function become(user) {
      (0, _assign2.default)(self, user);
    },

    fetchProfile: (0, _mobxStateTree.flow)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fb) {
      var response, profile;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fetch.GET)('/api/my/profile');

            case 2:
              response = _context.sent;
              profile = ANONYMOUS;

              if (!(response.status === 200)) {
                _context.next = 8;
                break;
              }

              _context.next = 7;
              return response.json();

            case 7:
              profile = _context.sent;

            case 8:

              self.become((0, _extends3.default)({}, fb, profile));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })),
    saveProfile: (0, _mobxStateTree.flow)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var response, profile;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _fetch.POST)('/api/my/profile', self.toJSON());

            case 2:
              response = _context2.sent;

              if (!(response.status === 200)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 6;
              return response.json();

            case 6:
              profile = _context2.sent;

              self.become(profile);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }))
  };
});

/***/ }),

/***/ "8jiO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__("+6Bu");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _class;

var _reactJsxParser = __webpack_require__("qNGt");

var _reactJsxParser2 = _interopRequireDefault(_reactJsxParser);

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("KC3J");

var _mobxReact = __webpack_require__("uva0");

var _ArticleChildren = __webpack_require__("Mzvm");

var _ArticleChildren2 = _interopRequireDefault(_ArticleChildren);

var _Editable = __webpack_require__("qcZZ");

var _Editable2 = _interopRequireDefault(_Editable);

var _Favorite = __webpack_require__("T1u4");

var _Favorite2 = _interopRequireDefault(_Favorite);

var _Icon = __webpack_require__("jMsb");

var _Icon2 = _interopRequireDefault(_Icon);

var _HtmlEditor = __webpack_require__("mg9w");

var _HtmlEditor2 = _interopRequireDefault(_HtmlEditor);

var _Sheet = __webpack_require__("jWSG");

var _Sheet2 = _interopRequireDefault(_Sheet);

var _Tab = __webpack_require__("Zy/b");

var _Tab2 = _interopRequireDefault(_Tab);

var _TabSet = __webpack_require__("68dF");

var _TabSet2 = _interopRequireDefault(_TabSet);

var _TagBar = __webpack_require__("/w+E");

var _TagBar2 = _interopRequireDefault(_TagBar);

var _Tengwar = __webpack_require__("ZD1u");

var _Tengwar2 = _interopRequireDefault(_Tengwar);

var _WysiwygEditor = __webpack_require__("6uJE");

var _WysiwygEditor2 = _interopRequireDefault(_WysiwygEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsxLink = function JsxLink(_ref) {
  var href = _ref.href,
      props = (0, _objectWithoutProperties3.default)(_ref, ['href']);
  return _react2.default.createElement(_reactRouterDom.Link, (0, _extends3.default)({ to: href }, props));
};
JsxLink.displayName = 'JsxLink';

var Article = (0, _mobxReact.observer)(_class = function (_Component) {
  (0, _inherits3.default)(Article, _Component);

  function Article() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Article);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = Article.__proto__ || (0, _getPrototypeOf2.default)(Article)).call.apply(_ref2, [this].concat(args))), _this), _this.handleAddSheet = function () {
      _this.props.page.data.createCharacterData();
      _this.props.page.setActiveTabId('sheet');
    }, _this.handleDeleteArticle = function () {
      if (window.confirm('Are you sure? Deleting an article is permanent')) {
        _this.props.page.delete();
      }
    }, _this.handleTabClicked = function (activeTabId) {
      if (activeTabId === 'add-sheet') return;
      _this.props.page.setActiveTabId(activeTabId);
    }, _this.addSheetButton = function () {
      return _react2.default.createElement(
        'button',
        { className: 'icon-add', onClick: _this.handleAddSheet },
        'Add Sheet'
      );
    }, _this.deleteArticleButton = function () {
      return _react2.default.createElement(
        'button',
        { className: 'danger', onClick: _this.handleDeleteArticle },
        'Delete'
      );
    }, _this.saveButton = function () {
      return _react2.default.createElement(
        'button',
        { className: 'icon-save', onClick: _this.props.page.save },
        'Save'
      );
    }, _this.editorTab = function (_ref3) {
      var html = _ref3.html,
          setHTML = _ref3.setHTML;
      return {
        id: 'wysiwyg',
        tab: _react2.default.createElement(_Icon2.default, { name: 'edit' }),
        contents: _react2.default.createElement(_WysiwygEditor2.default, { html: html, onChange: setHTML })
      };
    }, _this.htmlTab = function (_ref4) {
      var html = _ref4.html,
          setHTML = _ref4.setHTML;
      return {
        id: 'html',
        tab: _react2.default.createElement(_Icon2.default, { name: 'html' }),
        contents: _react2.default.createElement(_HtmlEditor2.default, { html: html, onChange: setHTML })
      };
    }, _this.readerTab = function (_ref5) {
      var html = _ref5.html,
          children = _ref5.children;
      return {
        id: 'reader',
        tab: _react2.default.createElement(_Tab2.default, { caption: 'Article', icon: 'read' }),
        contents: _react2.default.createElement(
          _react.Fragment,
          null,
          _react2.default.createElement(_reactJsxParser2.default, {
            components: {
              a: JsxLink,
              Tengwar: _Tengwar2.default
            },
            jsx: html
          }),
          _react2.default.createElement(_ArticleChildren2.default, { articles: children })
        )
      };
    }, _this.sheetTab = function (_ref6) {
      var data = _ref6.data,
          readonly = _ref6.readonly;
      var sheet = data.characterData;

      if (!sheet) return null;

      return {
        id: 'sheet',
        tab: _react2.default.createElement(_Tab2.default, {
          caption: 'Sheet',
          icon: 'sheet',
          onRemoveClick: data.removeCharacterData,
          removable: !readonly
        }),
        contents: _react2.default.createElement(_Sheet2.default, {
          character: sheet.toJSON(),
          onChange: data.setCharacterData,
          readonly: readonly
        })
      };
    }, _this.renderButtons = function () {
      var _this$props = _this.props,
          page = _this$props.page,
          viewport = _this$props.viewport;


      return _react2.default.createElement(
        _react.Fragment,
        null,
        !page.data.characterData && _this.addSheetButton(),
        (!viewport.isSmall || page.activeTabId === 'sheet') && _this.saveButton(),
        page.privileges.includes('admin') && _this.deleteArticleButton()
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Article, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          page = _props.page,
          user = _props.user;

      var hideTagBar = !page.tags.length && page.readonly;

      if (page.loading) return _react2.default.createElement('div', { className: 'article page loading' });

      var classes = ['article page', hideTagBar ? 'no-tagbar' : '', page.readonly ? 'readonly' : ''].filter(Boolean).join(' ');

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'header',
          { className: 'title' },
          _react2.default.createElement(_Editable2.default, { value: page.displayName, onChange: page.setTitle, readonly: page.readonly }),
          !user.anonymous && _react2.default.createElement(_Favorite2.default, { value: page.isFavorite, onToggle: page.toggleFavorite })
        ),
        _react2.default.createElement(
          'div',
          { className: 'contents' },
          _react2.default.createElement(_TabSet2.default, {
            activeTabId: page.activeTabId,
            onTabClicked: this.handleTabClicked,
            showTabs: page.data.characterData || !page.readonly,
            buttons: !page.readonly && this.renderButtons(),
            tabs: [this.readerTab(page), this.sheetTab(page), !page.readonly && this.editorTab(page), !page.readonly && this.htmlTab(page)].filter(Boolean)
          })
        ),
        hideTagBar || _react2.default.createElement(_TagBar2.default, {
          onChange: page.setTags,
          onRemove: page.removeTag,
          readonly: page.readonly,
          tags: page.tags
        })
      );
    }
  }]);
  return Article;
}(_react.Component)) || _class;

exports.default = Article;

/***/ }),

/***/ "9+jM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _Message = __webpack_require__("xiZN");

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function (_Component) {
  (0, _inherits3.default)(NotFound, _Component);

  function NotFound() {
    (0, _classCallCheck3.default)(this, NotFound);
    return (0, _possibleConstructorReturn3.default)(this, (NotFound.__proto__ || (0, _getPrototypeOf2.default)(NotFound)).apply(this, arguments));
  }

  (0, _createClass3.default)(NotFound, [{
    key: 'render',
    value: function render() {
      var parts = window.location.pathname.split('/');
      var slug = parts[parts.length - 1];
      var url = '/page/' + slug;

      return _react2.default.createElement(
        'div',
        { className: 'not-found page' },
        _react2.default.createElement(
          _Message2.default,
          { title: '404' },
          _react2.default.createElement(
            'p',
            { className: 'center' },
            'Whoops, how did you get here? Are you looking for ',
            _react2.default.createElement(
              'a',
              { href: url },
              url
            ),
            '?'
          )
        )
      );
    }
  }]);
  return NotFound;
}(_react.Component);

exports.default = NotFound;

/***/ }),

/***/ "94VQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("Yobk");
var descriptor = __webpack_require__("X8DO");
var setToStringTag = __webpack_require__("e6n0");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("hJx8")(IteratorPrototype, __webpack_require__("dSzd")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "94sX":
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__("dCZQ");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "9bBU":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("mClu");
var $Object = __webpack_require__("FeBl").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "A9mX":
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__("pTUa");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "ACr5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__("uva0");

var _reactRouterDom = __webpack_require__("KC3J");

var _findIndex = __webpack_require__("KgVm");

var _findIndex2 = _interopRequireDefault(_findIndex);

var _includes = __webpack_require__("q+Dy");

var _includes2 = _interopRequireDefault(_includes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = (0, _mobxReact.observer)(_class = function (_Component) {
  (0, _inherits3.default)(Search, _Component);

  function Search() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Search.__proto__ || (0, _getPrototypeOf2.default)(Search)).call.apply(_ref, [this].concat(args))), _this), _this.getDisplayData = function () {
      var _this$props$page = _this.props.page,
          results = _this$props$page.results,
          term = _this$props$page.term;

      return results.map(function (article) {
        var previews = (article.results || []).map(function (hit) {
          var words = hit.text.split(' ');
          var index = (0, _findIndex2.default)(words, function (word) {
            return (0, _includes2.default)(word.toLowerCase(), term.toLowerCase());
          });

          // not found
          if (index < 0) return { html: hit.text, line: hit.line };
          return { html: hit.text, line: hit.line };
        }).filter(function (preview) {
          return preview !== null;
        });

        return {
          key: article.file,
          hits: previews.length + article.aliases.length,
          image: article.image,
          slug: article.file,
          title: article.title,
          subtitle: article.aliases.join(', '),
          previews: previews
        };
      });
    }, _this.renderResult = function (_ref2) {
      var key = _ref2.key,
          slug = _ref2.slug,
          image = _ref2.image,
          title = _ref2.title,
          subtitle = _ref2.subtitle,
          hits = _ref2.hits,
          previews = _ref2.previews;

      var classes = ['result card', image ? 'has-media' : 'no-media'].join(' ');

      return _react2.default.createElement(
        _reactRouterDom.Link,
        { className: classes, key: key, to: '/page/' + slug },
        image && _react2.default.createElement('div', { className: 'media', style: { backgroundImage: 'url(' + image + ')' } }),
        _react2.default.createElement(
          'div',
          { className: 'results' },
          _react2.default.createElement(
            'div',
            { className: 'title' },
            _react2.default.createElement(
              'b',
              null,
              title
            ),
            ' ',
            _react2.default.createElement(
              'i',
              null,
              subtitle
            )
          ),
          previews.slice(0, 3).map(function (preview, index) {
            return _react2.default.createElement('div', { key: index // eslint-disable-line react/no-array-index-key
              , className: 'search-match',
              dangerouslySetInnerHTML: { __html: preview.html } // eslint-disable-line
            });
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'hits' },
          _react2.default.createElement(
            'i',
            null,
            hits,
            ' hits'
          )
        )
      );
    }, _this.renderNoResults = function () {
      return _react2.default.createElement(
        'div',
        { className: 'card no-results is-centered' },
        _react2.default.createElement(
          'div',
          { className: 'content' },
          'No results found for this search term.'
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Search, [{
    key: 'render',
    value: function render() {
      if (this.props.page.loading) return _react2.default.createElement('div', { className: 'search page loading' });

      var results = this.getDisplayData();
      return _react2.default.createElement(
        'div',
        { className: 'search page' },
        _react2.default.createElement(
          'h1',
          null,
          'Search Results'
        ),
        results.length ? results.map(this.renderResult) : this.renderNoResults()
      );
    }
  }]);
  return Search;
}(_react.Component)) || _class;

exports.default = Search;

/***/ }),

/***/ "AOM6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "react"
var external__react_ = __webpack_require__("Jmof");
var external__react__default = /*#__PURE__*/__webpack_require__.n(external__react_);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("KSGD");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/attr-accept/dist/index.js
var dist = __webpack_require__("YDeE");
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// CONCATENATED MODULE: ./node_modules/react-dropzone/dist/es/utils/index.js


var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;

function getDataTransferItems(event) {
  var dataTransferItemsList = [];
  if (event.dataTransfer) {
    var dt = event.dataTransfer;
    if (dt.files && dt.files.length) {
      dataTransferItemsList = dt.files;
    } else if (dt.items && dt.items.length) {
      // During the drag even the dataTransfer.files is null
      // but Chrome implements some drag store, which is accesible via dataTransfer.items
      dataTransferItemsList = dt.items;
    }
  } else if (event.target && event.target.files) {
    dataTransferItemsList = event.target.files;
  }
  // Convert from DataTransferItemsList to the native Array
  return Array.prototype.slice.call(dataTransferItemsList);
}

// Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
// that MIME type will always be accepted
function fileAccepted(file, accept) {
  return file.type === 'application/x-moz-file' || dist_default()(file, accept);
}

function fileMatchSize(file, maxSize, minSize) {
  return file.size <= maxSize && file.size >= minSize;
}

function allFilesAccepted(files, accept) {
  return files.every(function (file) {
    return fileAccepted(file, accept);
  });
}

// allow the entire document to be a drag target
function onDocumentDragOver(evt) {
  evt.preventDefault();
}
// CONCATENATED MODULE: ./node_modules/react-dropzone/dist/es/utils/styles.js
/* harmony default export */ var styles = ({
  rejected: {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
  },
  disabled: {
    opacity: 0.5
  },
  active: {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
  },
  default: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
  }
});
// CONCATENATED MODULE: ./node_modules/react-dropzone/dist/es/index.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint prefer-template: 0 */






var es_Dropzone = function (_React$Component) {
  _inherits(Dropzone, _React$Component);

  function Dropzone(props, context) {
    _classCallCheck(this, Dropzone);

    var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this, props, context));

    _this.renderChildren = function (children, isDragActive, isDragAccept, isDragReject) {
      if (typeof children === 'function') {
        return children(_extends({}, _this.state, {
          isDragActive: isDragActive,
          isDragAccept: isDragAccept,
          isDragReject: isDragReject
        }));
      }
      return children;
    };

    _this.composeHandlers = _this.composeHandlers.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onDocumentDrop = _this.onDocumentDrop.bind(_this);
    _this.onDragEnter = _this.onDragEnter.bind(_this);
    _this.onDragLeave = _this.onDragLeave.bind(_this);
    _this.onDragOver = _this.onDragOver.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onDrop = _this.onDrop.bind(_this);
    _this.onFileDialogCancel = _this.onFileDialogCancel.bind(_this);
    _this.onInputElementClick = _this.onInputElementClick.bind(_this);

    _this.setRef = _this.setRef.bind(_this);
    _this.setRefs = _this.setRefs.bind(_this);

    _this.isFileDialogActive = false;

    _this.state = {
      draggedFiles: [],
      acceptedFiles: [],
      rejectedFiles: []
    };
    return _this;
  }

  _createClass(Dropzone, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var preventDropOnDocument = this.props.preventDropOnDocument;

      this.dragTargets = [];

      if (preventDropOnDocument) {
        document.addEventListener('dragover', onDocumentDragOver, false);
        document.addEventListener('drop', this.onDocumentDrop, false);
      }
      this.fileInputEl.addEventListener('click', this.onInputElementClick, false);
      // Tried implementing addEventListener, but didn't work out
      document.body.onfocus = this.onFileDialogCancel;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var preventDropOnDocument = this.props.preventDropOnDocument;

      if (preventDropOnDocument) {
        document.removeEventListener('dragover', onDocumentDragOver);
        document.removeEventListener('drop', this.onDocumentDrop);
      }
      if (this.fileInputEl != null) {
        this.fileInputEl.removeEventListener('click', this.onInputElementClick, false);
      }
      // Can be replaced with removeEventListener, if addEventListener works
      if (document != null) {
        document.body.onfocus = null;
      }
    }
  }, {
    key: 'composeHandlers',
    value: function composeHandlers(handler) {
      if (this.props.disabled) {
        return null;
      }

      return handler;
    }
  }, {
    key: 'onDocumentDrop',
    value: function onDocumentDrop(evt) {
      if (this.node && this.node.contains(evt.target)) {
        // if we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
        return;
      }
      evt.preventDefault();
      this.dragTargets = [];
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(evt) {
      if (this.props.onDragStart) {
        this.props.onDragStart.call(this, evt);
      }
    }
  }, {
    key: 'onDragEnter',
    value: function onDragEnter(evt) {
      evt.preventDefault();

      // Count the dropzone and any children that are entered.
      if (this.dragTargets.indexOf(evt.target) === -1) {
        this.dragTargets.push(evt.target);
      }

      this.setState({
        isDragActive: true, // Do not rely on files for the drag state. It doesn't work in Safari.
        draggedFiles: getDataTransferItems(evt)
      });

      if (this.props.onDragEnter) {
        this.props.onDragEnter.call(this, evt);
      }
    }
  }, {
    key: 'onDragOver',
    value: function onDragOver(evt) {
      // eslint-disable-line class-methods-use-this
      evt.preventDefault();
      evt.stopPropagation();
      try {
        // The file dialog on Chrome allows users to drag files from the dialog onto
        // the dropzone, causing the browser the crash when the file dialog is closed.
        // A drop effect of 'none' prevents the file from being dropped
        evt.dataTransfer.dropEffect = this.isFileDialogActive ? 'none' : 'copy'; // eslint-disable-line no-param-reassign
      } catch (err) {
        // continue regardless of error
      }

      if (this.props.onDragOver) {
        this.props.onDragOver.call(this, evt);
      }
      return false;
    }
  }, {
    key: 'onDragLeave',
    value: function onDragLeave(evt) {
      var _this2 = this;

      evt.preventDefault();

      // Only deactivate once the dropzone and all children have been left.
      this.dragTargets = this.dragTargets.filter(function (el) {
        return el !== evt.target && _this2.node.contains(el);
      });
      if (this.dragTargets.length > 0) {
        return;
      }

      // Clear dragging files state
      this.setState({
        isDragActive: false,
        draggedFiles: []
      });

      if (this.props.onDragLeave) {
        this.props.onDragLeave.call(this, evt);
      }
    }
  }, {
    key: 'onDrop',
    value: function onDrop(evt) {
      var _this3 = this;

      var _props = this.props,
          onDrop = _props.onDrop,
          onDropAccepted = _props.onDropAccepted,
          onDropRejected = _props.onDropRejected,
          multiple = _props.multiple,
          disablePreview = _props.disablePreview,
          accept = _props.accept;

      var fileList = getDataTransferItems(evt);
      var acceptedFiles = [];
      var rejectedFiles = [];

      // Stop default browser behavior
      evt.preventDefault();

      // Reset the counter along with the drag on a drop.
      this.dragTargets = [];
      this.isFileDialogActive = false;

      fileList.forEach(function (file) {
        if (!disablePreview) {
          try {
            file.preview = window.URL.createObjectURL(file); // eslint-disable-line no-param-reassign
          } catch (err) {
            if (undefined !== 'production') {
              console.error('Failed to generate preview for file', file, err); // eslint-disable-line no-console
            }
          }
        }

        if (fileAccepted(file, accept) && fileMatchSize(file, _this3.props.maxSize, _this3.props.minSize)) {
          acceptedFiles.push(file);
        } else {
          rejectedFiles.push(file);
        }
      });

      if (!multiple) {
        // if not in multi mode add any extra accepted files to rejected.
        // This will allow end users to easily ignore a multi file drop in "single" mode.
        rejectedFiles.push.apply(rejectedFiles, _toConsumableArray(acceptedFiles.splice(1)));
      }

      if (onDrop) {
        onDrop.call(this, acceptedFiles, rejectedFiles, evt);
      }

      if (rejectedFiles.length > 0 && onDropRejected) {
        onDropRejected.call(this, rejectedFiles, evt);
      }

      if (acceptedFiles.length > 0 && onDropAccepted) {
        onDropAccepted.call(this, acceptedFiles, evt);
      }

      // Clear files value
      this.draggedFiles = null;

      // Reset drag state
      this.setState({
        isDragActive: false,
        draggedFiles: [],
        acceptedFiles: acceptedFiles,
        rejectedFiles: rejectedFiles
      });
    }
  }, {
    key: 'onClick',
    value: function onClick(evt) {
      var _props2 = this.props,
          onClick = _props2.onClick,
          disableClick = _props2.disableClick;

      if (!disableClick) {
        evt.stopPropagation();

        if (onClick) {
          onClick.call(this, evt);
        }

        // in IE11/Edge the file-browser dialog is blocking, ensure this is behind setTimeout
        // this is so react can handle state changes in the onClick prop above above
        // see: https://github.com/react-dropzone/react-dropzone/issues/450
        setTimeout(this.open.bind(this), 0);
      }
    }
  }, {
    key: 'onInputElementClick',
    value: function onInputElementClick(evt) {
      evt.stopPropagation();
      if (this.props.inputProps && this.props.inputProps.onClick) {
        this.props.inputProps.onClick();
      }
    }
  }, {
    key: 'onFileDialogCancel',
    value: function onFileDialogCancel() {
      var _this4 = this;

      // timeout will not recognize context of this method
      var onFileDialogCancel = this.props.onFileDialogCancel;
      // execute the timeout only if the FileDialog is opened in the browser

      if (this.isFileDialogActive) {
        setTimeout(function () {
          if (_this4.fileInputEl != null) {
            // Returns an object as FileList
            var files = _this4.fileInputEl.files;


            if (!files.length) {
              _this4.isFileDialogActive = false;
            }
          }

          if (typeof onFileDialogCancel === 'function') {
            onFileDialogCancel();
          }
        }, 300);
      }
    }
  }, {
    key: 'setRef',
    value: function setRef(ref) {
      this.node = ref;
    }
  }, {
    key: 'setRefs',
    value: function setRefs(ref) {
      this.fileInputEl = ref;
    }
    /**
     * Open system file upload dialog.
     *
     * @public
     */

  }, {
    key: 'open',
    value: function open() {
      this.isFileDialogActive = true;
      this.fileInputEl.value = null;
      this.fileInputEl.click();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          accept = _props3.accept,
          acceptClassName = _props3.acceptClassName,
          activeClassName = _props3.activeClassName,
          children = _props3.children,
          disabled = _props3.disabled,
          disabledClassName = _props3.disabledClassName,
          inputProps = _props3.inputProps,
          multiple = _props3.multiple,
          name = _props3.name,
          rejectClassName = _props3.rejectClassName,
          rest = _objectWithoutProperties(_props3, ['accept', 'acceptClassName', 'activeClassName', 'children', 'disabled', 'disabledClassName', 'inputProps', 'multiple', 'name', 'rejectClassName']);

      var acceptStyle = rest.acceptStyle,
          activeStyle = rest.activeStyle,
          _rest$className = rest.className,
          className = _rest$className === undefined ? '' : _rest$className,
          disabledStyle = rest.disabledStyle,
          rejectStyle = rest.rejectStyle,
          style = rest.style,
          props = _objectWithoutProperties(rest, ['acceptStyle', 'activeStyle', 'className', 'disabledStyle', 'rejectStyle', 'style']);

      var _state = this.state,
          isDragActive = _state.isDragActive,
          draggedFiles = _state.draggedFiles;

      var filesCount = draggedFiles.length;
      var isMultipleAllowed = multiple || filesCount <= 1;
      var isDragAccept = filesCount > 0 && allFilesAccepted(draggedFiles, this.props.accept);
      var isDragReject = filesCount > 0 && (!isDragAccept || !isMultipleAllowed);
      var noStyles = !className && !style && !activeStyle && !acceptStyle && !rejectStyle && !disabledStyle;

      if (isDragActive && activeClassName) {
        className += ' ' + activeClassName;
      }
      if (isDragAccept && acceptClassName) {
        className += ' ' + acceptClassName;
      }
      if (isDragReject && rejectClassName) {
        className += ' ' + rejectClassName;
      }
      if (disabled && disabledClassName) {
        className += ' ' + disabledClassName;
      }

      if (noStyles) {
        style = styles.default;
        activeStyle = styles.active;
        acceptStyle = style.active;
        rejectStyle = styles.rejected;
        disabledStyle = styles.disabled;
      }

      var appliedStyle = _extends({}, style);
      if (activeStyle && isDragActive) {
        appliedStyle = _extends({}, style, activeStyle);
      }
      if (acceptStyle && isDragAccept) {
        appliedStyle = _extends({}, appliedStyle, acceptStyle);
      }
      if (rejectStyle && isDragReject) {
        appliedStyle = _extends({}, appliedStyle, rejectStyle);
      }
      if (disabledStyle && disabled) {
        appliedStyle = _extends({}, style, disabledStyle);
      }

      var inputAttributes = {
        accept: accept,
        disabled: disabled,
        type: 'file',
        style: { display: 'none' },
        multiple: supportMultiple && multiple,
        ref: this.setRefs,
        onChange: this.onDrop,
        autoComplete: 'off'
      };

      if (name && name.length) {
        inputAttributes.name = name;
      }

      // Destructure custom props away from props used for the div element

      var acceptedFiles = props.acceptedFiles,
          preventDropOnDocument = props.preventDropOnDocument,
          disablePreview = props.disablePreview,
          disableClick = props.disableClick,
          onDropAccepted = props.onDropAccepted,
          onDropRejected = props.onDropRejected,
          onFileDialogCancel = props.onFileDialogCancel,
          maxSize = props.maxSize,
          minSize = props.minSize,
          divProps = _objectWithoutProperties(props, ['acceptedFiles', 'preventDropOnDocument', 'disablePreview', 'disableClick', 'onDropAccepted', 'onDropRejected', 'onFileDialogCancel', 'maxSize', 'minSize']);

      return external__react__default.a.createElement(
        'div',
        _extends({
          className: className,
          style: appliedStyle
        }, divProps /* expand user provided props first so event handlers are never overridden */, {
          onClick: this.composeHandlers(this.onClick),
          onDragStart: this.composeHandlers(this.onDragStart),
          onDragEnter: this.composeHandlers(this.onDragEnter),
          onDragOver: this.composeHandlers(this.onDragOver),
          onDragLeave: this.composeHandlers(this.onDragLeave),
          onDrop: this.composeHandlers(this.onDrop),
          ref: this.setRef,
          'aria-disabled': disabled
        }),
        this.renderChildren(children, isDragActive, isDragAccept, isDragReject),
        external__react__default.a.createElement('input', _extends({}, inputProps /* expand user provided inputProps first so inputAttributes override them */, inputAttributes))
      );
    }
  }]);

  return Dropzone;
}(external__react__default.a.Component);

/* harmony default export */ var es = __webpack_exports__["default"] = (es_Dropzone);

es_Dropzone.propTypes = {
  /**
   * Allow specific types of files. See https://github.com/okonet/attr-accept for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all.
   * See: https://github.com/react-dropzone/react-dropzone/issues/276
   */
  accept: prop_types_default.a.string,

  /**
   * Contents of the dropzone
   */
  children: prop_types_default.a.oneOfType([prop_types_default.a.node, prop_types_default.a.func]),

  /**
   * Disallow clicking on the dropzone container to open file dialog
   */
  disableClick: prop_types_default.a.bool,

  /**
   * Enable/disable the dropzone entirely
   */
  disabled: prop_types_default.a.bool,

  /**
   * Enable/disable preview generation
   */
  disablePreview: prop_types_default.a.bool,

  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: prop_types_default.a.bool,

  /**
   * Pass additional attributes to the `<input type="file"/>` tag
   */
  inputProps: prop_types_default.a.object,

  /**
   * Allow dropping multiple files
   */
  multiple: prop_types_default.a.bool,

  /**
   * `name` attribute for the input tag
   */
  name: prop_types_default.a.string,

  /**
   * Maximum file size (in bytes)
   */
  maxSize: prop_types_default.a.number,

  /**
   * Minimum file size (in bytes)
   */
  minSize: prop_types_default.a.number,

  /**
   * className
   */
  className: prop_types_default.a.string,

  /**
   * className for active state
   */
  activeClassName: prop_types_default.a.string,

  /**
   * className for accepted state
   */
  acceptClassName: prop_types_default.a.string,

  /**
   * className for rejected state
   */
  rejectClassName: prop_types_default.a.string,

  /**
   * className for disabled state
   */
  disabledClassName: prop_types_default.a.string,

  /**
   * CSS styles to apply
   */
  style: prop_types_default.a.object,

  /**
   * CSS styles to apply when drag is active
   */
  activeStyle: prop_types_default.a.object,

  /**
   * CSS styles to apply when drop will be accepted
   */
  acceptStyle: prop_types_default.a.object,

  /**
   * CSS styles to apply when drop will be rejected
   */
  rejectStyle: prop_types_default.a.object,

  /**
   * CSS styles to apply when dropzone is disabled
   */
  disabledStyle: prop_types_default.a.object,

  /**
   * onClick callback
   * @param {Event} event
   */
  onClick: prop_types_default.a.func,

  /**
   * onDrop callback
   */
  onDrop: prop_types_default.a.func,

  /**
   * onDropAccepted callback
   */
  onDropAccepted: prop_types_default.a.func,

  /**
   * onDropRejected callback
   */
  onDropRejected: prop_types_default.a.func,

  /**
   * onDragStart callback
   */
  onDragStart: prop_types_default.a.func,

  /**
   * onDragEnter callback
   */
  onDragEnter: prop_types_default.a.func,

  /**
   * onDragOver callback
   */
  onDragOver: prop_types_default.a.func,

  /**
   * onDragLeave callback
   */
  onDragLeave: prop_types_default.a.func,

  /**
   * Provide a callback on clicking the cancel button of the file dialog
   */
  onFileDialogCancel: prop_types_default.a.func
};

es_Dropzone.defaultProps = {
  preventDropOnDocument: true,
  disabled: false,
  disablePreview: false,
  disableClick: false,
  multiple: true,
  maxSize: Infinity,
  minSize: 0
};

/***/ }),

/***/ "Ai/T":
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "BEQ0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "BHVn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__("Gu7T");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__("d7EF");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toArray2 = __webpack_require__("7nRM");

var _toArray3 = _interopRequireDefault(_toArray2);

var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

exports.slugify = slugify;
exports.extractSlug = extractSlug;
exports.slugifyUrl = slugifyUrl;

var _kebabCase = __webpack_require__("Ex7i");

var _kebabCase2 = _interopRequireDefault(_kebabCase);

var _unique = __webpack_require__("lMsm");

var _unique2 = _interopRequireDefault(_unique);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function strip(string) {
  return string.replace(/\s/g, ' ').replace(/[^a-z0-9_.-]/gi, '-');
}

function slugify(input) {
  if (Array.isArray(input)) {
    var list = input.map(slugify).filter(function (slug) {
      return slug;
    });
    return (0, _unique2.default)(list).sort();
  }

  if (!input || (typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object' || typeof input === 'function') {
    return ''; // Return '' for all falsy values, objects and fn's
  }

  var lowercase = strip(input).toLowerCase();
  return lowercase.split('.').map(_kebabCase2.default).join('.');
  // Split file.ext and kebab-case each section, then rejoin
}

function extractSlug(input) {
  if (Array.isArray(input)) {
    return input.map(extractSlug).filter(function (slug) {
      return slug;
    });
  }

  if (typeof input !== 'string') return '';

  return slugify(input.split(/[/\\]/g).pop().split(/[?#]/g).shift());
}
function slugifyUrl(input) {
  if (Array.isArray(input)) {
    return input.map(slugifyUrl).filter(function (slug) {
      return slug;
    });
  }

  if (typeof input !== 'string') return '';

  var result = [];

  var _input$split$reverse = input.split('/').reverse(),
      _input$split$reverse2 = (0, _toArray3.default)(_input$split$reverse),
      file = _input$split$reverse2[0],
      path = _input$split$reverse2.slice(1);

  var _file$split = file.split('.'),
      _file$split2 = (0, _slicedToArray3.default)(_file$split, 2),
      slug = _file$split2[0],
      extension = _file$split2[1];

  if (path.length) {
    result = [path.reverse().join('/'), '/'];
  }

  result.push(slugify(slug));

  if (extension) {
    result = [].concat((0, _toConsumableArray3.default)(result), ['.', extension]);
  }

  return result.join('');
}

/***/ }),

/***/ "BO1k":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("fxRn"), __esModule: true };

/***/ }),

/***/ "BwfY":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("fWfb");
__webpack_require__("M6a0");
__webpack_require__("OYls");
__webpack_require__("QWe/");
module.exports = __webpack_require__("FeBl").Symbol;


/***/ }),

/***/ "C0hh":
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "C4MV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("9bBU"), __esModule: true };

/***/ }),

/***/ "CW5P":
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__("T/bE"),
    ListCache = __webpack_require__("duB3"),
    Map = __webpack_require__("POb3");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "Cde9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionalArrayOfStrings = exports.arrayOfStrings = undefined;

var _mobxStateTree = __webpack_require__("D5HE");

var arrayOfStrings = exports.arrayOfStrings = _mobxStateTree.types.array(_mobxStateTree.types.string);
var optionalArrayOfStrings = exports.optionalArrayOfStrings = _mobxStateTree.types.optional(arrayOfStrings, []);

/***/ }),

/***/ "Cskv":
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ "CzH9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__("+6Bu");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("wLXD");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mobxReact = __webpack_require__("uva0");

var _reactRouterDom = __webpack_require__("KC3J");

var _createBrowserHistory = __webpack_require__("ciQf");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _ApplicationState = __webpack_require__("D+2C");

var _ApplicationState2 = _interopRequireDefault(_ApplicationState);

var _Article = __webpack_require__("8jiO");

var _Article2 = _interopRequireDefault(_Article);

var _ArticlePage = __webpack_require__("zQLw");

var _ArticlePage2 = _interopRequireDefault(_ArticlePage);

var _HtmlMetadata = __webpack_require__("6Hnu");

var _HtmlMetadata2 = _interopRequireDefault(_HtmlMetadata);

var _Media = __webpack_require__("N5yO");

var _Media2 = _interopRequireDefault(_Media);

var _MediaPage = __webpack_require__("otPO");

var _MediaPage2 = _interopRequireDefault(_MediaPage);

var _Navigation = __webpack_require__("s67h");

var _Navigation2 = _interopRequireDefault(_Navigation);

var _NotFound = __webpack_require__("9+jM");

var _NotFound2 = _interopRequireDefault(_NotFound);

var _Profile = __webpack_require__("sTP2");

var _Profile2 = _interopRequireDefault(_Profile);

var _ProfilePage = __webpack_require__("LGog");

var _ProfilePage2 = _interopRequireDefault(_ProfilePage);

var _Search = __webpack_require__("ACr5");

var _Search2 = _interopRequireDefault(_Search);

var _SearchPage = __webpack_require__("aO2Z");

var _SearchPage2 = _interopRequireDefault(_SearchPage);

var _SiteHeader = __webpack_require__("Dj/A");

var _SiteHeader2 = _interopRequireDefault(_SiteHeader);

var _Upload = __webpack_require__("/pYj");

var _Upload2 = _interopRequireDefault(_Upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appState = _ApplicationState2.default.create(window.InitialState || {});
window.appState = appState;
window.routerHistory = (0, _createBrowserHistory2.default)();

appState.setRoute(window.routerHistory.location);
window.routerHistory.listen(function (route) {
  return appState.setRoute(route);
});

var PageRoute = function PageRoute(_ref) {
  var Component = _ref.component,
      computedMatch = _ref.computedMatch,
      model = _ref.model,
      props = (0, _objectWithoutProperties3.default)(_ref, ['component', 'computedMatch', 'model']);

  if (model) appState.setPage(model, computedMatch.params);
  return _react2.default.createElement(_reactRouterDom.Route, (0, _extends3.default)({}, props, { render: function render() {
      return _react2.default.createElement(Component, (0, _extends3.default)({ match: computedMatch }, appState));
    } }));
};
PageRoute.displayName = 'PageRoute';

var renderLayoutHeader = function renderLayoutHeader() {
  var _appState$page = appState.page,
      author = _appState$page.author,
      description = _appState$page.description,
      displayName = _appState$page.displayName,
      keywords = _appState$page.keywords,
      title = _appState$page.title;
  var showMenu = appState.viewport.showMenu;


  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement('input', {
      id: 'navigation-menu',
      className: 'icon icon-menu menu-toggle',
      defaultChecked: showMenu,
      onClick: appState.viewport.toggleMenu,
      type: 'checkbox'
    }),
    _react2.default.createElement('label', { className: 'icon icon-menu', htmlFor: 'navigation-menu' }),
    _react2.default.createElement(_HtmlMetadata2.default, { author: author, description: description, keywords: keywords, title: title || displayName }),
    _react2.default.createElement(_SiteHeader2.default, { page: appState.page, user: appState.user }),
    _react2.default.createElement(_Navigation2.default, { menuItems: appState.navigation, current: appState.route })
  );
};

_reactDom2.default.render(_react2.default.createElement(
  _reactRouterDom.Router,
  { history: window.routerHistory },
  _react2.default.createElement(
    'div',
    { className: 'axis wiki layout' },
    _react2.default.createElement(_mobxReact.Observer, { render: renderLayoutHeader }),
    _react2.default.createElement(
      'div',
      { className: 'page-container' },
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Redirect, { exact: true, from: '/', to: '/page/home' }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/media/:filename',
          render: function render(_ref2) {
            var match = _ref2.match;
            return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/ info / media / ' + match.params.filename });
          }
        }),
        _react2.default.createElement(PageRoute, { exact: true, path: '/profile', component: _Profile2.default, model: _ProfilePage2.default }),
        _react2.default.createElement(PageRoute, { exact: true, path: '/search', component: _Search2.default, model: _SearchPage2.default }),
        _react2.default.createElement(PageRoute, { exact: true, path: '/upload', component: _Upload2.default }),
        _react2.default.createElement(PageRoute, { path: '/info/media/:filename', component: _Media2.default, model: _MediaPage2.default }),
        _react2.default.createElement(PageRoute, { path: '/page/:slug', component: _Article2.default, model: _ArticlePage2.default }),
        _react2.default.createElement(PageRoute, { path: '/profile/:id', component: _Profile2.default, model: _ProfilePage2.default }),
        _react2.default.createElement(PageRoute, { path: '/search/:term', component: _Search2.default, model: _SearchPage2.default }),
        _react2.default.createElement(PageRoute, { component: _NotFound2.default })
      )
    )
  )
), document.getElementById('application'));

/***/ }),

/***/ "D+2C":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobxStateTree = __webpack_require__("D5HE");

var _MenuItem = __webpack_require__("3hV1");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Page = __webpack_require__("5GVZ");

var _Page2 = _interopRequireDefault(_Page);

var _Route = __webpack_require__("v/+d");

var _Route2 = _interopRequireDefault(_Route);

var _User = __webpack_require__("8jhr");

var _User2 = _interopRequireDefault(_User);

var _Viewport = __webpack_require__("lb9e");

var _Viewport2 = _interopRequireDefault(_Viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mobxStateTree.types.model('ApplicationState', {
  navigation: _mobxStateTree.types.optional(_mobxStateTree.types.array(_MenuItem2.default), []),
  page: _mobxStateTree.types.optional(_Page2.default, _Page2.default.create({ type: 'article' })),
  route: _mobxStateTree.types.optional(_Route2.default, _Route2.default.create()),
  user: _mobxStateTree.types.optional(_User2.default, _User2.default.create()),
  viewport: _mobxStateTree.types.optional(_Viewport2.default, _Viewport2.default.create())
}).actions(function (self) {
  return {
    /* eslint-disable no-param-reassign */
    setPage: function setPage(type, routeParams) {
      self.page = type.create();
      self.page.load(routeParams);
    },
    setRoute: function setRoute(route) {
      self.route = _Route2.default.create(route);
    }
  };
}
/* eslint-enable no-param-reassign */
);

/***/ }),

/***/ "D2L2":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "D5HE":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_D5HE__;

/***/ }),

/***/ "Dc0G":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__("blYT");

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("3IRH")(module)))

/***/ }),

/***/ "Dd8w":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ "Dj/A":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("KC3J");

var _mobxReact = __webpack_require__("uva0");

var _Facebook = __webpack_require__("iaJ1");

var _Facebook2 = _interopRequireDefault(_Facebook);

var _SearchBox = __webpack_require__("Oeca");

var _SearchBox2 = _interopRequireDefault(_SearchBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SiteHeader = (0, _mobxReact.observer)(function (_ref) {
  var page = _ref.page,
      user = _ref.user;
  return _react2.default.createElement(
    'header',
    { className: 'site-header' },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { className: 'logo icon-axis', to: '/' },
      _react2.default.createElement(
        'span',
        { className: 'name' },
        _react2.default.createElement(
          'b',
          null,
          'Axis'
        ),
        'RPG'
      )
    ),
    _react2.default.createElement(_SearchBox2.default, { term: page.term || '' }),
    _react2.default.createElement(_Facebook2.default, { user: user })
  );
});

SiteHeader.displayName = 'Header';
exports.default = SiteHeader;

/***/ }),

/***/ "DuR2":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "Dv2r":
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__("pTUa");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "E4Hj":
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "EGZi":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "EHRO":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("NkRn"),
    Uint8Array = __webpack_require__("qwTf"),
    eq = __webpack_require__("22B7"),
    equalArrays = __webpack_require__("FhcP"),
    mapToArray = __webpack_require__("WFiI"),
    setToArray = __webpack_require__("octw");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ "EqjI":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "Ex7i":
/***/ (function(module, exports, __webpack_require__) {

var createCompounder = __webpack_require__("RjDc");

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

module.exports = kebabCase;


/***/ }),

/***/ "FCuZ":
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__("uIr7"),
    isArray = __webpack_require__("NGEn");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ "FKtm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);

/***/ }),

/***/ "FeBl":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "FhcP":
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__("7YkW"),
    arraySome = __webpack_require__("2X2u"),
    cacheHas = __webpack_require__("dmQx");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ "G2xm":
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "G8ar":
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__("cdq7"),
    baseIsNaN = __webpack_require__("8++/"),
    strictIndexOf = __webpack_require__("i6nN");

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),

/***/ "Gu7T":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__("c/Tr");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ "GvBW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (undefined !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "HT7L":
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "HhN8":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "Hxdr":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "ICSD":
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__("ITwD"),
    getValue = __webpack_require__("mTAn");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "IGcM":
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__("bIjD"),
    isArguments = __webpack_require__("1Yb9"),
    isArray = __webpack_require__("NGEn"),
    isIndex = __webpack_require__("ZGh9"),
    isLength = __webpack_require__("Rh28"),
    toKey = __webpack_require__("Ubhr");

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ "IPGu":
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__("SayF"),
    hasUnicodeWord = __webpack_require__("yxsw"),
    toString = __webpack_require__("ZT2e"),
    unicodeWords = __webpack_require__("pVq3");

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;


/***/ }),

/***/ "ITwD":
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__("gGqR"),
    isMasked = __webpack_require__("eFps"),
    isObject = __webpack_require__("yCNF"),
    toSource = __webpack_require__("Ai/T");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "Ibhu":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("D2L2");
var toIObject = __webpack_require__("TcQ7");
var arrayIndexOf = __webpack_require__("vFc/")(false);
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "Ie6m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (undefined !== 'production') {
  var invariant = __webpack_require__("cxPT");
  var warning = __webpack_require__("YyeZ");
  var ReactPropTypesSecret = __webpack_require__("gt/O");
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (undefined !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "Izpu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = exports.hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = exports.stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),

/***/ "JBvZ":
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__("imBK");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "JDN0":
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__("aCM0"),
    isArray = __webpack_require__("NGEn"),
    isObjectLike = __webpack_require__("UnEC");

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),

/***/ "JUs9":
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__("G8ar");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "Jmof":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Jmof__;

/***/ }),

/***/ "JtmH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__("e6+Q");
var invariant = __webpack_require__("cxPT");
var warning = __webpack_require__("YyeZ");
var assign = __webpack_require__("BEQ0");

var ReactPropTypesSecret = __webpack_require__("gt/O");
var checkPropTypes = __webpack_require__("Ie6m");

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (undefined !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (undefined !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      undefined !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      undefined !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "JyYQ":
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__("d+aQ"),
    baseMatchesProperty = __webpack_require__("eKBv"),
    identity = __webpack_require__("wSKX"),
    isArray = __webpack_require__("NGEn"),
    property = __webpack_require__("iL3P");

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),

/***/ "K4R9":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("NA/8");
module.exports = __webpack_require__("FeBl").Number.isNaN;


/***/ }),

/***/ "KC3J":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_KC3J__;

/***/ }),

/***/ "KSGD":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (undefined !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__("JtmH")(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("Q4WQ")();
}


/***/ }),

/***/ "KgVm":
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__("cdq7"),
    baseIteratee = __webpack_require__("JyYQ"),
    toInteger = __webpack_require__("5Zxu");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;


/***/ }),

/***/ "Kh4W":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("dSzd");


/***/ }),

/***/ "Kh5d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__("sB3e");
var $getPrototypeOf = __webpack_require__("PzxK");

__webpack_require__("uqUo")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "Kl7s":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


/***/ }),

/***/ "KmWZ":
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__("duB3");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "L8MQ":
/***/ (function(module, exports, __webpack_require__) {

var baseValues = __webpack_require__("ktnU"),
    keys = __webpack_require__("ktak");

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),

/***/ "LGog":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__("Xxa5");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _mobxStateTree = __webpack_require__("D5HE");

var _commonModels = __webpack_require__("Cde9");

var _fetch = __webpack_require__("06WZ");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = {
  id: '',
  email: '',
  favorites: [],
  name: '',
  privileges: [],
  tags: [],
  type: 'profile'
};

exports.default = _mobxStateTree.types.model('ProfilePage', (0, _extends3.default)({}, DEFAULTS, {
  favorites: _commonModels.optionalArrayOfStrings,
  privileges: _commonModels.optionalArrayOfStrings,
  tags: _commonModels.optionalArrayOfStrings,
  type: _mobxStateTree.types.optional(_mobxStateTree.types.literal('profile'), 'profile')
})).views(function (self) {
  return {
    get title() {
      return self.name;
    },
    get keywords() {
      return [self.name, self.type];
    }
  };
}).actions(function (self) {
  return {
    /* eslint-disable no-param-reassign */
    load: (0, _mobxStateTree.flow)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
      var id = _ref.id;
      var response, profile;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fetch.GET)(id ? '/api/profile/' + id : '/api/my/profile');

            case 2:
              response = _context.sent;

              if (!(response.status === 200)) {
                _context.next = 8;
                break;
              }

              _context.next = 6;
              return response.json();

            case 6:
              profile = _context.sent;

              (0, _assign2.default)(self, profile);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
    /* eslint-enable no-param-reassign */
  };
});

/***/ }),

/***/ "LKZe":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("NpIQ");
var createDesc = __webpack_require__("X8DO");
var toIObject = __webpack_require__("TcQ7");
var toPrimitive = __webpack_require__("MmMw");
var has = __webpack_require__("D2L2");
var IE8_DOM_DEFINE = __webpack_require__("SfB7");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("+E39") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "M6a0":
/***/ (function(module, exports) {



/***/ }),

/***/ "MICi":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("K4R9"), __esModule: true };

/***/ }),

/***/ "MPPF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobxStateTree = __webpack_require__("D5HE");

var _titleCase = __webpack_require__("f70R");

var _titleCase2 = _interopRequireDefault(_titleCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mobxStateTree.types.model('ChildArticle', {
  slug: '',
  title: ''
}).views(function (self) {
  return {
    get displayName() {
      return self.title || (0, _titleCase2.default)(self.slug);
    }
  };
});

/***/ }),

/***/ "MU5D":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("R9M2");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "Mhyx":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("/bQp");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "MmMw":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("EqjI");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "MoMe":
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__("FCuZ"),
    getSymbols = __webpack_require__("l9Lx"),
    keys = __webpack_require__("ktak");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ "Mzvm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("KC3J");

var _Icon = __webpack_require__("jMsb");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArticleChildren = function ArticleChildren(_ref) {
  var _ref$articles = _ref.articles,
      articles = _ref$articles === undefined ? [] : _ref$articles,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? 'Child Articles' : _ref$caption,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$iconName = _ref.iconName,
      iconName = _ref$iconName === undefined ? 'tag' : _ref$iconName;

  if (!articles.length) return _react2.default.createElement('div', { className: 'tag-browser is-hidden' });

  var links = articles.sort(function (a, b) {
    return a.displayName.localeCompare(b.displayName);
  }).map(function (_ref2) {
    var slug = _ref2.slug,
        displayName = _ref2.displayName;
    return _react2.default.createElement(
      _reactRouterDom.Link,
      { key: slug, to: '/page/' + slug },
      displayName
    );
  });

  return _react2.default.createElement(
    'div',
    { className: ('article-children ' + className).trim() },
    _react2.default.createElement(
      'header',
      null,
      _react2.default.createElement(_Icon2.default, { name: iconName }),
      ' ',
      caption
    ),
    _react2.default.createElement(
      'div',
      { className: 'link-list' },
      links
    )
  );
};

ArticleChildren.displayName = 'ArticleChildren';
exports.default = ArticleChildren;

/***/ }),

/***/ "N5yO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Media = function Media(_ref) {
  var match = _ref.match;
  return _react2.default.createElement(
    "div",
    { className: "media page" },
    _react2.default.createElement(
      "div",
      { className: "media-container" },
      _react2.default.createElement("img", {
        alt: match.params.filename,
        src: "/media/full/" + match.params.filename
      })
    )
  );
};

Media.displayName = 'Media';
exports.default = Media;

/***/ }),

/***/ "NA/8":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__("kM2E");

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),

/***/ "NGEn":
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "NkRn":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("TQ3y");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "NpIQ":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "NqZt":
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "O4Lo":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("yCNF"),
    now = __webpack_require__("RVHk"),
    toNumber = __webpack_require__("kxzG");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "O4g8":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "ON07":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("EqjI");
var document = __webpack_require__("7KvD").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "OYls":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("crlp")('asyncIterator');


/***/ }),

/***/ "Oeca":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _debounce = __webpack_require__("O4Lo");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchFor = (0, _debounce2.default)(function (term) {
  return window.routerHistory.push('/search/' + term);
}, 500);

var SearchBox = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(SearchBox, _React$Component);

  function SearchBox(props) {
    (0, _classCallCheck3.default)(this, SearchBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBox.__proto__ || (0, _getPrototypeOf2.default)(SearchBox)).call(this, props));

    _this.onKeyUp = function (e) {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyF') {
        e.preventDefault();
        e.stopPropagation();
        _this.input.focus();
      }
    };

    _this.createRef = function (input) {
      _this.input = input;
    };

    _this.state = { term: props.term };
    return _this;
  }

  (0, _createClass3.default)(SearchBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.term !== this.state.term) this.setState({ term: props.term });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          placeholder = _props.placeholder;

      return _react2.default.createElement(
        'div',
        { className: 'search-box ' + className },
        _react2.default.createElement('input', { type: 'text',
          placeholder: placeholder,
          value: this.state.term,
          onChange: function onChange(event) {
            _this2.setState({ term: event.target.value });
            searchFor(event.target.value);
          },
          ref: this.createRef
        }),
        _react2.default.createElement('i', { className: 'icon icon-search fa' })
      );
    }
  }]);
  return SearchBox;
}(_react2.default.Component), _class.defaultProps = {
  className: '',
  placeholder: 'Search... (Ctrl+Shift+F)',
  term: ''
}, _temp);
exports.default = SearchBox;

/***/ }),

/***/ "OvRC":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("oM7Q"), __esModule: true };

/***/ }),

/***/ "POb3":
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__("ICSD"),
    root = __webpack_require__("TQ3y");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "Pf15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__("kiBT");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__("OvRC");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ "PzxK":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("D2L2");
var toObject = __webpack_require__("sB3e");
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "Q4WQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__("e6+Q");
var invariant = __webpack_require__("cxPT");
var ReactPropTypesSecret = __webpack_require__("gt/O");

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "Q7hp":
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__("uCi2");

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ "QRG4":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("UuGF");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "QWe/":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("crlp")('observable');


/***/ }),

/***/ "R4wc":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("kM2E");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("To3L") });


/***/ }),

/***/ "R9M2":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "RGrk":
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__("dCZQ");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "RN6t":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobxStateTree = __webpack_require__("D5HE");

var _sheetforge = __webpack_require__("4BQR");

exports.default = _mobxStateTree.types.model('PageData', {
  characterData: _mobxStateTree.types.union(_sheetforge.Character, _mobxStateTree.types.undefined)
}).actions(function (self) {
  return {
    /* eslint-disable no-param-reassign */
    createCharacterData: function createCharacterData() {
      self.characterData = {};
    },
    setCharacterData: function setCharacterData(data) {
      self.characterData = data;
    },
    removeCharacterData: function removeCharacterData() {
      self.characterData = undefined;
    }
  };
}
/* eslint-enable no-param-reassign */
);

/***/ }),

/***/ "RPLV":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7KvD").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "RVHk":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("TQ3y");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "RY/4":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("R9M2");
var TAG = __webpack_require__("dSzd")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "RfZv":
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__("SOZo"),
    hasPath = __webpack_require__("IGcM");

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),

/***/ "Rh28":
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "RjDc":
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__("3rZI"),
    deburr = __webpack_require__("lAob"),
    words = __webpack_require__("IPGu");

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;


/***/ }),

/***/ "Rrel":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("TcQ7");
var gOPN = __webpack_require__("n0T6").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "S7p9":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "S82l":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "SHWz":
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__("MoMe");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ "SOZo":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),

/***/ "SayF":
/***/ (function(module, exports) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;


/***/ }),

/***/ "SfB7":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("+E39") && !__webpack_require__("S82l")(function () {
  return Object.defineProperty(__webpack_require__("ON07")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "T/bE":
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__("94sX"),
    hashDelete = __webpack_require__("ue/d"),
    hashGet = __webpack_require__("eVIm"),
    hashHas = __webpack_require__("RGrk"),
    hashSet = __webpack_require__("Z2pD");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "T1u4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _noop = __webpack_require__("TgZ1");

var _noop2 = _interopRequireDefault(_noop);

var _Icon = __webpack_require__("jMsb");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Favorite = function Favorite(_ref) {
  var _ref$onToggle = _ref.onToggle,
      onToggle = _ref$onToggle === undefined ? _noop2.default : _ref$onToggle,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? false : _ref$value;
  return _react2.default.createElement(_Icon2.default, {
    className: 'favorite',
    name: 'favorite-' + (value ? 'on' : 'off'),
    onClick: onToggle
  });
};

Favorite.displayName = 'Favorite';
exports.default = Favorite;

/***/ }),

/***/ "TQ3y":
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__("blYT");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "TcQ7":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("MU5D");
var defined = __webpack_require__("52gC");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "TgZ1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {};

/***/ }),

/***/ "To3L":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("lktj");
var gOPS = __webpack_require__("1kS7");
var pIE = __webpack_require__("NpIQ");
var toObject = __webpack_require__("sB3e");
var IObject = __webpack_require__("MU5D");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("S82l")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "Tvex":
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__("7YkW"),
    arrayIncludes = __webpack_require__("JUs9"),
    arrayIncludesWith = __webpack_require__("s96k"),
    cacheHas = __webpack_require__("dmQx"),
    createSet = __webpack_require__("V3Yo"),
    setToArray = __webpack_require__("octw");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),

/***/ "Ubhr":
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__("6MiT");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ "UnEC":
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "UnLw":
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__("fMqj");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ "UuGF":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "Uz1a":
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__("bJWQ"),
    equalArrays = __webpack_require__("FhcP"),
    equalByTag = __webpack_require__("EHRO"),
    equalObjects = __webpack_require__("SHWz"),
    getTag = __webpack_require__("gHOb"),
    isArray = __webpack_require__("NGEn"),
    isBuffer = __webpack_require__("ggOT"),
    isTypedArray = __webpack_require__("YsVG");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ "V3Yo":
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__("5N57"),
    noop = __webpack_require__("qrdl"),
    setToArray = __webpack_require__("octw");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;


/***/ }),

/***/ "V3tA":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("R4wc");
module.exports = __webpack_require__("FeBl").Object.assign;


/***/ }),

/***/ "VM0c":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__("Jmof"), __webpack_require__("KSGD")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.React, global.propTypes);
    global.ReactTagsInput = mod.exports;
  }
})(this, function (module, exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function uniq(arr) {
    var out = [];

    for (var i = 0; i < arr.length; i++) {
      if (out.indexOf(arr[i]) === -1) {
        out.push(arr[i]);
      }
    }

    return out;
  }

  /* istanbul ignore next */
  function getClipboardData(e) {
    if (window.clipboardData) {
      return window.clipboardData.getData('Text');
    }

    if (e.clipboardData) {
      return e.clipboardData.getData('text/plain');
    }

    return '';
  }

  function defaultRenderTag(props) {
    var tag = props.tag,
        key = props.key,
        disabled = props.disabled,
        onRemove = props.onRemove,
        classNameRemove = props.classNameRemove,
        getTagDisplayValue = props.getTagDisplayValue,
        other = _objectWithoutProperties(props, ['tag', 'key', 'disabled', 'onRemove', 'classNameRemove', 'getTagDisplayValue']);

    return _react2.default.createElement(
      'span',
      _extends({ key: key }, other),
      getTagDisplayValue(tag),
      !disabled && _react2.default.createElement('a', { className: classNameRemove, onClick: function onClick(e) {
          return onRemove(key);
        } })
    );
  }

  function defaultRenderInput(_ref) {
    var addTag = _ref.addTag,
        props = _objectWithoutProperties(_ref, ['addTag']);

    var onChange = props.onChange,
        value = props.value,
        other = _objectWithoutProperties(props, ['onChange', 'value']);

    return _react2.default.createElement('input', _extends({ type: 'text', onChange: onChange, value: value }, other));
  }

  function defaultRenderLayout(tagComponents, inputComponent) {
    return _react2.default.createElement(
      'span',
      null,
      tagComponents,
      inputComponent
    );
  }

  function defaultPasteSplit(data) {
    return data.split(' ').map(function (d) {
      return d.trim();
    });
  }

  var defaultInputProps = {
    className: 'react-tagsinput-input',
    placeholder: 'Add a tag'
  };

  var TagsInput = function (_React$Component) {
    _inherits(TagsInput, _React$Component);

    /* istanbul ignore next */
    function TagsInput() {
      _classCallCheck(this, TagsInput);

      var _this = _possibleConstructorReturn(this, (TagsInput.__proto__ || Object.getPrototypeOf(TagsInput)).call(this));

      _this.state = { tag: '', isFocused: false };
      _this.focus = _this.focus.bind(_this);
      _this.blur = _this.blur.bind(_this);
      return _this;
    }

    _createClass(TagsInput, [{
      key: '_getTagDisplayValue',
      value: function _getTagDisplayValue(tag) {
        var tagDisplayProp = this.props.tagDisplayProp;


        if (tagDisplayProp) {
          return tag[tagDisplayProp];
        }

        return tag;
      }
    }, {
      key: '_makeTag',
      value: function _makeTag(tag) {
        var tagDisplayProp = this.props.tagDisplayProp;


        if (tagDisplayProp) {
          return _defineProperty({}, tagDisplayProp, tag);
        }

        return tag;
      }
    }, {
      key: '_removeTag',
      value: function _removeTag(index) {
        var value = this.props.value.concat([]);
        if (index > -1 && index < value.length) {
          var changed = value.splice(index, 1);
          this.props.onChange(value, changed, [index]);
        }
      }
    }, {
      key: '_clearInput',
      value: function _clearInput() {
        if (this.hasControlledInput()) {
          this.props.onChangeInput('');
        } else {
          this.setState({ tag: '' });
        }
      }
    }, {
      key: '_tag',
      value: function _tag() {
        if (this.hasControlledInput()) {
          return this.props.inputValue;
        }

        return this.state.tag;
      }
    }, {
      key: '_addTags',
      value: function _addTags(tags) {
        var _this2 = this;

        var _props = this.props,
            validationRegex = _props.validationRegex,
            onChange = _props.onChange,
            onValidationReject = _props.onValidationReject,
            onlyUnique = _props.onlyUnique,
            maxTags = _props.maxTags,
            value = _props.value;


        if (onlyUnique) {
          tags = uniq(tags);
          tags = tags.filter(function (tag) {
            return value.every(function (currentTag) {
              return _this2._getTagDisplayValue(currentTag) !== _this2._getTagDisplayValue(tag);
            });
          });
        }

        var rejectedTags = tags.filter(function (tag) {
          return !validationRegex.test(_this2._getTagDisplayValue(tag));
        });
        tags = tags.filter(function (tag) {
          return validationRegex.test(_this2._getTagDisplayValue(tag));
        });
        tags = tags.filter(function (tag) {
          var tagDisplayValue = _this2._getTagDisplayValue(tag);
          if (typeof tagDisplayValue.trim === 'function') {
            return tagDisplayValue.trim().length > 0;
          } else {
            return tagDisplayValue;
          }
        });

        if (maxTags >= 0) {
          var remainingLimit = Math.max(maxTags - value.length, 0);
          tags = tags.slice(0, remainingLimit);
        }

        if (onValidationReject && rejectedTags.length > 0) {
          onValidationReject(rejectedTags);
        }

        if (tags.length > 0) {
          var newValue = value.concat(tags);
          var indexes = [];
          for (var i = 0; i < tags.length; i++) {
            indexes.push(value.length + i);
          }
          onChange(newValue, tags, indexes);
          this._clearInput();
          return true;
        }

        if (rejectedTags.length > 0) {
          return false;
        }

        this._clearInput();
        return false;
      }
    }, {
      key: '_shouldPreventDefaultEventOnAdd',
      value: function _shouldPreventDefaultEventOnAdd(added, empty, keyCode) {
        if (added) {
          return true;
        }

        if (keyCode === 13) {
          return this.props.preventSubmit || !this.props.preventSubmit && !empty;
        }

        return false;
      }
    }, {
      key: 'focus',
      value: function focus() {
        if (this.input && typeof this.input.focus === 'function') {
          this.input.focus();
        }

        this.handleOnFocus();
      }
    }, {
      key: 'blur',
      value: function blur() {
        if (this.input && typeof this.input.blur === 'function') {
          this.input.blur();
        }

        this.handleOnBlur();
      }
    }, {
      key: 'accept',
      value: function accept() {
        var tag = this._tag();

        if (tag !== '') {
          tag = this._makeTag(tag);
          return this._addTags([tag]);
        }

        return false;
      }
    }, {
      key: 'addTag',
      value: function addTag(tag) {
        return this._addTags([tag]);
      }
    }, {
      key: 'clearInput',
      value: function clearInput() {
        this._clearInput();
      }
    }, {
      key: 'handlePaste',
      value: function handlePaste(e) {
        var _this3 = this;

        var _props2 = this.props,
            addOnPaste = _props2.addOnPaste,
            pasteSplit = _props2.pasteSplit;


        if (!addOnPaste) {
          return;
        }

        e.preventDefault();

        var data = getClipboardData(e);
        var tags = pasteSplit(data).map(function (tag) {
          return _this3._makeTag(tag);
        });

        this._addTags(tags);
      }
    }, {
      key: 'handleKeyDown',
      value: function handleKeyDown(e) {
        if (e.defaultPrevented) {
          return;
        }

        var _props3 = this.props,
            value = _props3.value,
            removeKeys = _props3.removeKeys,
            addKeys = _props3.addKeys;

        var tag = this._tag();
        var empty = tag === '';
        var keyCode = e.keyCode;
        var key = e.key;
        var add = addKeys.indexOf(keyCode) !== -1 || addKeys.indexOf(key) !== -1;
        var remove = removeKeys.indexOf(keyCode) !== -1 || removeKeys.indexOf(key) !== -1;

        if (add) {
          var added = this.accept();
          if (this._shouldPreventDefaultEventOnAdd(added, empty, keyCode)) {
            e.preventDefault();
          }
        }

        if (remove && value.length > 0 && empty) {
          e.preventDefault();
          this._removeTag(value.length - 1);
        }
      }
    }, {
      key: 'handleClick',
      value: function handleClick(e) {
        if (e.target === this.div) {
          this.focus();
        }
      }
    }, {
      key: 'handleChange',
      value: function handleChange(e) {
        var onChangeInput = this.props.onChangeInput;
        var onChange = this.props.inputProps.onChange;

        var tag = e.target.value;

        if (onChange) {
          onChange(e);
        }

        if (this.hasControlledInput()) {
          onChangeInput(tag);
        } else {
          this.setState({ tag: tag });
        }
      }
    }, {
      key: 'handleOnFocus',
      value: function handleOnFocus(e) {
        var onFocus = this.props.inputProps.onFocus;


        if (onFocus) {
          onFocus(e);
        }

        this.setState({ isFocused: true });
      }
    }, {
      key: 'handleOnBlur',
      value: function handleOnBlur(e) {
        var onBlur = this.props.inputProps.onBlur;


        this.setState({ isFocused: false });

        if (e == null) {
          return;
        }

        if (onBlur) {
          onBlur(e);
        }

        if (this.props.addOnBlur) {
          var tag = this._makeTag(e.target.value);
          this._addTags([tag]);
        }
      }
    }, {
      key: 'handleRemove',
      value: function handleRemove(tag) {
        this._removeTag(tag);
      }
    }, {
      key: 'inputProps',
      value: function inputProps() {
        var _props$inputProps = this.props.inputProps,
            onChange = _props$inputProps.onChange,
            onFocus = _props$inputProps.onFocus,
            onBlur = _props$inputProps.onBlur,
            otherInputProps = _objectWithoutProperties(_props$inputProps, ['onChange', 'onFocus', 'onBlur']);

        var props = _extends({}, defaultInputProps, otherInputProps);

        if (this.props.disabled) {
          props.disabled = true;
        }

        return props;
      }
    }, {
      key: 'inputValue',
      value: function inputValue(props) {
        return props.currentValue || props.inputValue || '';
      }
    }, {
      key: 'hasControlledInput',
      value: function hasControlledInput() {
        var _props4 = this.props,
            inputValue = _props4.inputValue,
            onChangeInput = _props4.onChangeInput;


        return typeof onChangeInput === 'function' && typeof inputValue === 'string';
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.hasControlledInput()) {
          return;
        }

        this.setState({
          tag: this.inputValue(this.props)
        });
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        /* istanbul ignore next */
        if (this.hasControlledInput()) {
          return;
        }

        if (!this.inputValue(nextProps)) {
          return;
        }

        this.setState({
          tag: this.inputValue(nextProps)
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var _props5 = this.props,
            value = _props5.value,
            onChange = _props5.onChange,
            tagProps = _props5.tagProps,
            renderLayout = _props5.renderLayout,
            renderTag = _props5.renderTag,
            renderInput = _props5.renderInput,
            addKeys = _props5.addKeys,
            removeKeys = _props5.removeKeys,
            className = _props5.className,
            focusedClassName = _props5.focusedClassName,
            addOnBlur = _props5.addOnBlur,
            addOnPaste = _props5.addOnPaste,
            inputProps = _props5.inputProps,
            pasteSplit = _props5.pasteSplit,
            onlyUnique = _props5.onlyUnique,
            maxTags = _props5.maxTags,
            validationRegex = _props5.validationRegex,
            disabled = _props5.disabled,
            tagDisplayProp = _props5.tagDisplayProp,
            inputValue = _props5.inputValue,
            onChangeInput = _props5.onChangeInput,
            other = _objectWithoutProperties(_props5, ['value', 'onChange', 'tagProps', 'renderLayout', 'renderTag', 'renderInput', 'addKeys', 'removeKeys', 'className', 'focusedClassName', 'addOnBlur', 'addOnPaste', 'inputProps', 'pasteSplit', 'onlyUnique', 'maxTags', 'validationRegex', 'disabled', 'tagDisplayProp', 'inputValue', 'onChangeInput']);

        var isFocused = this.state.isFocused;


        if (isFocused) {
          className += ' ' + focusedClassName;
        }

        var tagComponents = value.map(function (tag, index) {
          return renderTag(_extends({
            key: index,
            tag: tag,
            onRemove: _this4.handleRemove.bind(_this4),
            disabled: disabled,
            getTagDisplayValue: _this4._getTagDisplayValue.bind(_this4)
          }, tagProps));
        });

        var inputComponent = renderInput(_extends({
          ref: function ref(r) {
            _this4.input = r;
          },
          value: this._tag(),
          onPaste: this.handlePaste.bind(this),
          onKeyDown: this.handleKeyDown.bind(this),
          onChange: this.handleChange.bind(this),
          onFocus: this.handleOnFocus.bind(this),
          onBlur: this.handleOnBlur.bind(this),
          addTag: this.addTag.bind(this)
        }, this.inputProps()));

        return _react2.default.createElement(
          'div',
          { ref: function ref(r) {
              _this4.div = r;
            }, onClick: this.handleClick.bind(this), className: className },
          renderLayout(tagComponents, inputComponent)
        );
      }
    }]);

    return TagsInput;
  }(_react2.default.Component);

  TagsInput.defaultProps = {
    className: 'react-tagsinput',
    focusedClassName: 'react-tagsinput--focused',
    addKeys: [9, 13],
    addOnBlur: false,
    addOnPaste: false,
    inputProps: {},
    removeKeys: [8],
    renderInput: defaultRenderInput,
    renderTag: defaultRenderTag,
    renderLayout: defaultRenderLayout,
    pasteSplit: defaultPasteSplit,
    tagProps: { className: 'react-tagsinput-tag', classNameRemove: 'react-tagsinput-remove' },
    onlyUnique: false,
    maxTags: -1,
    validationRegex: /.*/,
    disabled: false,
    tagDisplayProp: null,
    preventSubmit: true
  };
  exports.default = TagsInput;
  module.exports = exports['default'];
});



/***/ }),

/***/ "VXg5":
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__("JyYQ"),
    baseUniq = __webpack_require__("Tvex");

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}

module.exports = uniqBy;


/***/ }),

/***/ "W529":
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__("f931");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "WFiI":
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ "Wpbd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),

/***/ "WxI4":
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "X8DO":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "Xc4G":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("lktj");
var gOPS = __webpack_require__("1kS7");
var pIE = __webpack_require__("NpIQ");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "Xd32":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("+tPU");
__webpack_require__("zQR9");
module.exports = __webpack_require__("5PlU");


/***/ }),

/***/ "Xxa5":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1H6C");


/***/ }),

/***/ "YDHx":
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__("Uz1a"),
    isObjectLike = __webpack_require__("UnEC");

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ "YDeE":
/***/ (function(module, exports) {

module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){"use strict";n.__esModule=!0,r(8),r(9),n["default"]=function(t,n){if(t&&n){var r=function(){var r=Array.isArray(n)?n:n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return{v:r.some(function(t){var n=t.trim();return"."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):/\/\*$/.test(n)?i===n.replace(/\/.*$/,""):o===n})}}();if("object"==typeof r)return r.v}return!0},t.exports=n["default"]},function(t,n){var r=t.exports={version:"1.2.2"};"number"==typeof __e&&(__e=r)},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(2),o=r(1),i=r(4),u=r(19),c="prototype",f=function(t,n){return function(){return t.apply(n,arguments)}},s=function(t,n,r){var a,p,l,y,d=t&s.G,h=t&s.P,v=d?e:t&s.S?e[n]||(e[n]={}):(e[n]||{})[c],x=d?o:o[n]||(o[n]={});d&&(r=n);for(a in r)p=!(t&s.F)&&v&&a in v,l=(p?v:r)[a],y=t&s.B&&p?f(l,e):h&&"function"==typeof l?f(Function.call,l):l,v&&!p&&u(v,a,l),x[a]!=l&&i(x,a,y),h&&((x[c]||(x[c]={}))[a]=l)};e.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,n,r){var e=r(5),o=r(18);t.exports=r(22)?function(t,n,r){return e.setDesc(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){var e=r(20)("wks"),o=r(2).Symbol;t.exports=function(t){return e[t]||(e[t]=o&&o[t]||(o||r(6))("Symbol."+t))}},function(t,n,r){r(26),t.exports=r(1).Array.some},function(t,n,r){r(25),t.exports=r(1).String.endsWith},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r(7)("match")]=!1,!"/./"[t](n)}catch(o){}}return!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(16),o=r(11),i=r(7)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(2),o=r(4),i=r(6)("src"),u="toString",c=Function[u],f=(""+c).split(u);r(1).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,u){"function"==typeof r&&(o(r,i,t[n]?""+t[n]:f.join(String(n))),"name"in r||(r.name=n)),t===e?t[n]=r:(u||delete t[n],o(t,n,r))})(Function.prototype,u,function(){return"function"==typeof this&&this[i]||c.call(this)})},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e=r(17),o=r(13);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){t.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){"use strict";var e=r(3),o=r(24),i=r(21),u="endsWith",c=""[u];e(e.P+e.F*r(14)(u),"String",{endsWith:function(t){var n=i(this,t,u),r=arguments,e=r.length>1?r[1]:void 0,f=o(n.length),s=void 0===e?f:Math.min(o(e),f),a=String(t);return c?c.call(n,a,s):n.slice(s-a.length,s)===a}})},function(t,n,r){var e=r(5),o=r(3),i=r(1).Array||Array,u={},c=function(t,n){e.each.call(t.split(","),function(t){void 0==n&&t in i?u[t]=i[t]:t in[]&&(u[t]=r(12)(Function.call,[][t],n))})};c("pop,reverse,shift,keys,values,entries",1),c("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),c("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",u)}]);

/***/ }),

/***/ "YeCl":
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__("CW5P"),
    mapCacheDelete = __webpack_require__("A9mX"),
    mapCacheGet = __webpack_require__("v8Dt"),
    mapCacheHas = __webpack_require__("agim"),
    mapCacheSet = __webpack_require__("Dv2r");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "Yobk":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("77Pl");
var dPs = __webpack_require__("qio6");
var enumBugKeys = __webpack_require__("xnc9");
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("ON07")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("RPLV").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "YsVG":
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__("z4hc"),
    baseUnary = __webpack_require__("S7p9"),
    nodeUtil = __webpack_require__("Dc0G");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "YyeZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__("e6+Q");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (undefined !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "Z2pD":
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__("dCZQ");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "ZD1u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = __webpack_require__("wF3A");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tengwar = (0, _reactLoadable2.default)({
  loader: function loader() {
    return __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, "2Cq2"));
  },
  loading: function loading() {
    return _react2.default.createElement('div', { className: 'loading' });
  },
  render: function render(_ref, props) {
    var Glaemscribe = _ref.default;
    return _react2.default.createElement(Glaemscribe, props);
  }
});

Tengwar.displayName = 'Tengwar';
exports.default = Tengwar;

/***/ }),

/***/ "ZGh9":
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "ZT2e":
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__("o2mx");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "ZaQb":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("EqjI");
var anObject = __webpack_require__("77Pl");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("+ZMJ")(Function.call, __webpack_require__("LKZe").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "Zrlr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ "Zx67":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("fS6E"), __esModule: true };

/***/ }),

/***/ "Zy/b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _Icon = __webpack_require__("jMsb");

var _Icon2 = _interopRequireDefault(_Icon);

var _noop = __webpack_require__("TgZ1");

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tab = function Tab(_ref) {
  var _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? '' : _ref$caption,
      children = _ref.children,
      _ref$icon = _ref.icon,
      icon = _ref$icon === undefined ? '' : _ref$icon,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === undefined ? _noop2.default : _ref$onClick,
      _ref$onRemoveClick = _ref.onRemoveClick,
      onRemoveClick = _ref$onRemoveClick === undefined ? _noop2.default : _ref$onRemoveClick,
      _ref$removable = _ref.removable,
      removable = _ref$removable === undefined ? false : _ref$removable;
  return _react2.default.createElement(
    'div',
    { className: 'tab', onClick: onClick },
    icon && _react2.default.createElement(_Icon2.default, { name: icon }),
    caption && _react2.default.createElement(
      'div',
      { className: 'caption' },
      caption
    ),
    removable && _react2.default.createElement(_Icon2.default, { name: 'remove is-small', onClick: onRemoveClick }),
    children
  );
};

Tab.displayName = 'Tab';
exports.default = Tab;

/***/ }),

/***/ "Zzip":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("/n6Q"), __esModule: true };

/***/ }),

/***/ "aCM0":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("NkRn"),
    getRawTag = __webpack_require__("uLhX"),
    objectToString = __webpack_require__("+66z");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "aO2Z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__("Xxa5");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _mobxStateTree = __webpack_require__("D5HE");

var _commonModels = __webpack_require__("Cde9");

var _fetch = __webpack_require__("06WZ");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MatchResult = _mobxStateTree.types.model('MatchResult', {
  text: ''
});

var SearchResult = _mobxStateTree.types.model('SearchResult', {
  aliases: _commonModels.optionalArrayOfStrings,
  file: '',
  image: '',
  results: _mobxStateTree.types.optional(_mobxStateTree.types.array(MatchResult), []),
  title: ''
});

exports.default = _mobxStateTree.types.model('SearchPage', {
  term: '',
  results: _mobxStateTree.types.optional(_mobxStateTree.types.array(SearchResult), []),
  type: _mobxStateTree.types.optional(_mobxStateTree.types.literal('search'), 'search')
}).views(function (self) {
  return {
    get title() {
      return 'Search: ' + self.term;
    },
    get keywords() {
      return [self.term, self.type];
    }
  };
}).actions(function (self) {
  return {
    /* eslint-disable no-param-reassign */
    load: (0, _mobxStateTree.flow)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
      var term = _ref.term;
      var response, results;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fetch.GET)('/api/search/' + term);

            case 2:
              response = _context.sent;

              if (!(response.status !== 200)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return');

            case 5:
              _context.next = 7;
              return response.json();

            case 7:
              results = _context.sent;

              self.term = term;
              self.results = results;

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }))
    /* eslint-enable no-param-reassign */
  };
});

/***/ }),

/***/ "aQOO":
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ "agim":
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__("pTUa");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "ax3d":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("e8AB")('keys');
var uid = __webpack_require__("3Eo+");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "bGc4":
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__("gGqR"),
    isLength = __webpack_require__("Rh28");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "bIbi":
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__("ICSD"),
    root = __webpack_require__("TQ3y");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "bIjD":
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__("NGEn"),
    isKey = __webpack_require__("hIPy"),
    stringToPath = __webpack_require__("UnLw"),
    toString = __webpack_require__("ZT2e");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ "bJWQ":
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__("duB3"),
    stackClear = __webpack_require__("KmWZ"),
    stackDelete = __webpack_require__("NqZt"),
    stackGet = __webpack_require__("E4Hj"),
    stackHas = __webpack_require__("G2xm"),
    stackSet = __webpack_require__("zpVT");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "bO0Y":
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__("ICSD"),
    root = __webpack_require__("TQ3y");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "blYT":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "c/Tr":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("5zde"), __esModule: true };

/***/ }),

/***/ "cdq7":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ "ciQf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__("GvBW");

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__("crWv");

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__("xIPz");

var _PathUtils = __webpack_require__("Izpu");

var _createTransitionManager = __webpack_require__("tqq1");

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__("zFGm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = (0, _DOMUtils.supportsHistory)();
  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + (0, _PathUtils.createPath)(location);
  };

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createBrowserHistory;

/***/ }),

/***/ "crWv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (undefined !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "crlp":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var LIBRARY = __webpack_require__("O4g8");
var wksExt = __webpack_require__("Kh4W");
var defineProperty = __webpack_require__("evD5").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "cxPT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (undefined !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "d+aQ":
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__("hbAh"),
    getMatchData = __webpack_require__("16tV"),
    matchesStrictComparable = __webpack_require__("sJvV");

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),

/***/ "d4US":
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__("ICSD"),
    root = __webpack_require__("TQ3y");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "d7EF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__("us/S");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__("BO1k");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),

/***/ "dCZQ":
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__("ICSD");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "dFpP":
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__("imBK");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "dGoz":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_dGoz__;

/***/ }),

/***/ "dSzd":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("e8AB")('wks');
var uid = __webpack_require__("3Eo+");
var Symbol = __webpack_require__("7KvD").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "dY0y":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("dSzd")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "deUO":
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__("imBK");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "dmQx":
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ "duB3":
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__("WxI4"),
    listCacheDelete = __webpack_require__("dFpP"),
    listCacheGet = __webpack_require__("JBvZ"),
    listCacheHas = __webpack_require__("2Hvv"),
    listCacheSet = __webpack_require__("deUO");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "e6+Q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "e6n0":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("evD5").f;
var has = __webpack_require__("D2L2");
var TAG = __webpack_require__("dSzd")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "e8AB":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "eFps":
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__("+gg+");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "eG8/":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),

/***/ "eKBv":
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__("YDHx"),
    get = __webpack_require__("Q7hp"),
    hasIn = __webpack_require__("RfZv"),
    isKey = __webpack_require__("hIPy"),
    isStrictComparable = __webpack_require__("tO4o"),
    matchesStrictComparable = __webpack_require__("sJvV"),
    toKey = __webpack_require__("Ubhr");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),

/***/ "eVIm":
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__("dCZQ");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "eYTX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("KC3J");

var _Icon = __webpack_require__("jMsb");

var _Icon2 = _interopRequireDefault(_Icon);

var _noop = __webpack_require__("TgZ1");

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Tag, _Component);

  function Tag() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tag);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).call.apply(_ref, [this].concat(args))), _this), _this.handleClickRemove = function () {
      return _this.props.onClickRemove(_this.props.tag);
    }, _this.render = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          removable = _this$props.removable,
          linkTo = _this$props.linkTo,
          tag = _this$props.tag;


      var classNames = ['tag', className, removable ? 'removable' : ''].filter(Boolean);
      var text = tag.slice(0, 10);
      if (text !== tag) text += '…';

      return _react2.default.createElement(
        'span',
        { className: classNames.join(' ') },
        linkTo ? _react2.default.createElement(
          _reactRouterDom.Link,
          { className: 'link', to: linkTo },
          text
        ) : _react2.default.createElement(
          'span',
          { className: 'text' },
          text
        ),
        removable && _react2.default.createElement(_Icon2.default, { name: 'remove', onClick: _this.handleClickRemove })
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return Tag;
}(_react.Component), _class.defaultProps = {
  className: 'icon-tag',
  linkTo: undefined,
  onClickRemove: _noop2.default,
  removable: false,
  tag: ''
}, _temp2);
exports.default = Tag;

/***/ }),

/***/ "evD5":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("77Pl");
var IE8_DOM_DEFINE = __webpack_require__("SfB7");
var toPrimitive = __webpack_require__("MmMw");
var dP = Object.defineProperty;

exports.f = __webpack_require__("+E39") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "exh5":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__("kM2E");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__("ZaQb").set });


/***/ }),

/***/ "f70R":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  return String(string).replace(/([a-z])([A-Z])/g, '$1 $2').split(/[ -]/).map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
};

/***/ }),

/***/ "f931":
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "fBQ2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("evD5");
var createDesc = __webpack_require__("X8DO");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "fMqj":
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__("zGZ6");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ "fS6E":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Kh5d");
module.exports = __webpack_require__("FeBl").Object.getPrototypeOf;


/***/ }),

/***/ "fWfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7KvD");
var has = __webpack_require__("D2L2");
var DESCRIPTORS = __webpack_require__("+E39");
var $export = __webpack_require__("kM2E");
var redefine = __webpack_require__("880/");
var META = __webpack_require__("06OY").KEY;
var $fails = __webpack_require__("S82l");
var shared = __webpack_require__("e8AB");
var setToStringTag = __webpack_require__("e6n0");
var uid = __webpack_require__("3Eo+");
var wks = __webpack_require__("dSzd");
var wksExt = __webpack_require__("Kh4W");
var wksDefine = __webpack_require__("crlp");
var enumKeys = __webpack_require__("Xc4G");
var isArray = __webpack_require__("7UMu");
var anObject = __webpack_require__("77Pl");
var isObject = __webpack_require__("EqjI");
var toIObject = __webpack_require__("TcQ7");
var toPrimitive = __webpack_require__("MmMw");
var createDesc = __webpack_require__("X8DO");
var _create = __webpack_require__("Yobk");
var gOPNExt = __webpack_require__("Rrel");
var $GOPD = __webpack_require__("LKZe");
var $DP = __webpack_require__("evD5");
var $keys = __webpack_require__("lktj");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("n0T6").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("NpIQ").f = $propertyIsEnumerable;
  __webpack_require__("1kS7").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("O4g8")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("hJx8")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "fkB2":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("UuGF");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "fxRn":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("+tPU");
__webpack_require__("zQR9");
module.exports = __webpack_require__("g8Ux");


/***/ }),

/***/ "g8Ux":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("77Pl");
var get = __webpack_require__("3fs2");
module.exports = __webpack_require__("FeBl").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "gGqR":
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__("aCM0"),
    isObject = __webpack_require__("yCNF");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "gHOb":
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__("d4US"),
    Map = __webpack_require__("POb3"),
    Promise = __webpack_require__("bO0Y"),
    Set = __webpack_require__("5N57"),
    WeakMap = __webpack_require__("bIbi"),
    baseGetTag = __webpack_require__("aCM0"),
    toSource = __webpack_require__("Ai/T");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "ggOT":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__("TQ3y"),
    stubFalse = __webpack_require__("gwcX");

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("3IRH")(module)))

/***/ }),

/***/ "gt/O":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "gwcX":
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "h65t":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("UuGF");
var defined = __webpack_require__("52gC");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "hIPy":
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__("NGEn"),
    isSymbol = __webpack_require__("6MiT");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ "hJx8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("evD5");
var createDesc = __webpack_require__("X8DO");
module.exports = __webpack_require__("+E39") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "hbAh":
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__("bJWQ"),
    baseIsEqual = __webpack_require__("YDHx");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),

/***/ "hygk":
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__("YDHx");

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),

/***/ "i/C/":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("exh5");
module.exports = __webpack_require__("FeBl").Object.setPrototypeOf;


/***/ }),

/***/ "i6nN":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ "iL3P":
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__("eG8/"),
    basePropertyDeep = __webpack_require__("3Did"),
    isKey = __webpack_require__("hIPy"),
    toKey = __webpack_require__("Ubhr");

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),

/***/ "iaJ1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _class2, _temp2;

var _jsCookie = __webpack_require__("lbHh");

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("KC3J");

var _mobxReact = __webpack_require__("uva0");

var _config = __webpack_require__("1wn0");

var _config2 = _interopRequireDefault(_config);

var _User = __webpack_require__("8jhr");

var _Icon = __webpack_require__("jMsb");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncLoadSDK() {
  var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en_US';

  (function (d, s, id) {
    var element = d.querySelector(s);
    var fjs = element;
    var js = element;
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);js.id = id;
    js.src = '//connect.facebook.net/' + language + '/all.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

var COOKIE = 'fbsr_' + _config2.default.facebook.appId;

var Facebook = (0, _mobxReact.observer)(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3.default)(Facebook, _Component);

  function Facebook() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Facebook);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Facebook.__proto__ || (0, _getPrototypeOf2.default)(Facebook)).call.apply(_ref, [this].concat(args))), _this), _this.initializeFacebook = function () {
      var _CONFIG$facebook = _config2.default.facebook,
          appId = _CONFIG$facebook.appId,
          version = _CONFIG$facebook.version;

      window.FB.init({
        appId: appId,
        cookie: false, // disable - control this explicitly
        version: version, // use props-specified graph api version
        xfbml: true // parse social plugins on page
      });
      window.FB.getLoginStatus(_this.handleStatus);
    }, _this.handleStatus = function (response) {
      var scope = _config2.default.facebook.scope;

      var cookie = _jsCookie2.default.get(COOKIE);
      if (cookie && response.status === 'connected') {
        // Logged in, authorized
        window.FB.api('/me/permissions', {}, function (_ref2) {
          var data = _ref2.data;

          var granted = data.filter(function (_ref3) {
            var status = _ref3.status;
            return status === 'granted';
          }).map(function (_ref4) {
            var permission = _ref4.permission;
            return permission;
          });

          var denied = scope.filter(function (s) {
            return granted.indexOf(s) === -1;
          });
          if (denied.length) {
            window.FB.login(_this.loadProfile, {
              scope: scope.join(','),
              auth_type: 'rerequest'
            });
          } else {
            _this.loadProfile();
          }
        });
      } else {
        // Not authorized, or not logged in to FB
        _this.logOff();
      }
    }, _this.loadProfile = function () {
      var user = _this.props.user;


      window.FB.api('/me', { fields: _config2.default.facebook.fields }, function (me) {
        _this.updateCookie();
        user.fetchProfile(me);
      });
    }, _this.logOn = function () {
      window.FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          _this.loadProfile();
        } else {
          window.FB.login(_this.loadProfile, { scope: _config2.default.facebook.scope.join(',') });
        }
      });
    }, _this.logOff = function () {
      _this.props.user.become(_User.ANONYMOUS);
      _this.removeCookie();
    }, _this.removeCookie = function () {
      var user = _this.props.user;

      if (user.id && _jsCookie2.default.get(COOKIE)) {
        _jsCookie2.default.remove(COOKIE, {
          domain: window.location.hostname,
          path: '/'
        });
      }
    }, _this.updateCookie = function () {
      var fbAuthResponse = window.FB.getAuthResponse();
      _jsCookie2.default.set(COOKIE, fbAuthResponse.signedRequest, {
        domain: window.location.hostname,
        expires: fbAuthResponse.expiresIn,
        path: '/'
      });
    }, _this.renderAnonymous = function () {
      return _react2.default.createElement(
        'button',
        { onClick: _this.logOn, className: 'login button icon icon-facebook', tabIndex: '-1' },
        'Log In'
      );
    }, _this.renderLoggedIn = function () {
      var user = _this.props.user;
      var version = _config2.default.facebook.version;

      var imageSrc = '//graph.facebook.com/' + version + '/' + user.id + '/picture?height=36&width=36';

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { className: 'profile button', to: '/profile', tabIndex: '-1' },
          _react2.default.createElement('img', { alt: '', src: imageSrc }),
          _react2.default.createElement(
            'span',
            { className: 'name' },
            user.name
          )
        ),
        _react2.default.createElement(_Icon2.default, { className: 'logoff button', name: 'logout', onClick: _this.logOff })
      );
    }, _this.render = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          user = _this$props.user;


      return _react2.default.createElement(
        'div',
        { className: ('fb ' + className).trim() },
        user.id ? _this.renderLoggedIn() : _this.renderAnonymous()
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Facebook, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (document.getElementById('facebook-jssdk') && window.FB) {
        return this.initializeFacebook();
      }

      window.fbAsyncInit = function () {
        _this2.initializeFacebook();
      };
      return asyncLoadSDK();
    }
  }]);
  return Facebook;
}(_react.Component), _class2.defaultProps = {
  className: '',
  user: {}
}, _temp2)) || _class;

exports.default = Facebook;

/***/ }),

/***/ "imBK":
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__("22B7");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "jMsb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$name = _ref.name,
      name = _ref$name === undefined ? 'settings' : _ref$name,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 'default' : _ref$size,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'span',
    {
      className: 'icon is-' + size + ' ' + className,
      onClick: onClick,
      style: { cursor: onClick ? 'pointer' : 'inherit' }
    },
    _react2.default.createElement('i', { className: 'icon-' + name })
  );
};

Icon.displayName = 'Icon';
exports.default = Icon;

/***/ }),

/***/ "jWSG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = __webpack_require__("wF3A");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sheet = (0, _reactLoadable2.default)({
  loader: function loader() {
    return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, "1eJs"));
  },
  loading: function loading() {
    return _react2.default.createElement('div', { className: 'loading' });
  },
  render: function render(_ref, props) {
    var SfSheet = _ref.default;
    return _react2.default.createElement(SfSheet, props);
  }
});

// const Sheet = props => <SfSheet {...props} />

Sheet.displayName = 'Sheet';
exports.default = Sheet;

/***/ }),

/***/ "kM2E":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var ctx = __webpack_require__("+ZMJ");
var hide = __webpack_require__("hJx8");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "kiBT":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("i/C/"), __esModule: true };

/***/ }),

/***/ "ktak":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__("7e4z"),
    baseKeys = __webpack_require__("/GnY"),
    isArrayLike = __webpack_require__("bGc4");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "ktnU":
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__("Hxdr");

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),

/***/ "kxzG":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("yCNF"),
    isSymbol = __webpack_require__("6MiT");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "l9Lx":
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__("lb6C"),
    stubArray = __webpack_require__("C0hh");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ "lAob":
/***/ (function(module, exports, __webpack_require__) {

var deburrLetter = __webpack_require__("7ZyS"),
    toString = __webpack_require__("ZT2e");

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;


/***/ }),

/***/ "lMsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unique;
function unique(array) {
  var list = void 0;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length > 0) {
    list = [array].concat(args);
  } else if (Array.isArray(array)) {
    list = array;
  } else {
    list = [array];
  }
  return list.filter(function (el, ix, all) {
    return all.indexOf(el) === ix;
  });
}

/***/ }),

/***/ "lOnJ":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "lb6C":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ "lb9e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobxStateTree = __webpack_require__("D5HE");

var SCREEN_SM_WIDTH = 500;
var SCREEN_LG_WIDTH = 980;

var largeScreenQuery = '(min-width: ' + SCREEN_LG_WIDTH + 'px)';
var mediumScreenQuery = '(max-width: ' + (SCREEN_LG_WIDTH - 1) + 'px) and ' + ('(min-width: ' + (SCREEN_SM_WIDTH + 1) + 'px)');
var smallScreenQuery = '(max-width: ' + SCREEN_SM_WIDTH + 'px)';

exports.default = _mobxStateTree.types.model('Viewport', {
  height: 0,
  menuToggled: false,
  size: 'large',
  width: 0
}).views(function (self) {
  return {
    get isLarge() {
      return self.size === 'large';
    },
    get isMedium() {
      return self.size === 'medium';
    },
    get isSmall() {
      return self.size === 'small';
    },
    get showMenu() {
      return self.width >= 550 || self.menuToggled;
    }
  };
}).actions(function (self) {
  return {
    /* eslint-disable no-param-reassign */
    // Lifecycle
    afterCreate: function afterCreate() {
      window.addEventListener('resize', self.onWindowResize);
      self.onWindowResize();
    },
    beforeDestroy: function beforeDestroy() {
      window.removeEventListener('resize', self.onWindowResize);
    },


    // Setters
    onWindowResize: function onWindowResize() {
      if (window.matchMedia(smallScreenQuery).matches) self.size = 'small';
      if (window.matchMedia(mediumScreenQuery).matches) self.size = 'medium';
      if (window.matchMedia(largeScreenQuery).matches) self.size = 'large';

      self.setHeight(window.innerHeight);
      self.setWidth(window.innerWidth);
    },
    setHeight: function setHeight(height) {
      self.height = height;
    },
    setWidth: function setWidth(width) {
      self.width = width;
    },
    toggleMenu: function toggleMenu() {
      self.menuToggled = !self.menuToggled;
    }
  };
}
/* eslint-enable no-param-reassign */
);

/***/ }),

/***/ "lbHh":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ "lktj":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("Ibhu");
var enumBugKeys = __webpack_require__("xnc9");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "mClu":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("kM2E");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("+E39"), 'Object', { defineProperty: __webpack_require__("evD5").f });


/***/ }),

/***/ "mTAn":
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "mg9w":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__("+6Bu");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = __webpack_require__("wF3A");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HtmlEditor = (0, _reactLoadable2.default)({
  loader: function loader() {
    return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, "FuHO"));
  },
  loading: function loading() {
    return _react2.default.createElement('div', { className: 'loading' });
  },
  render: function render(_ref2, _ref) {
    var AceEditor = _ref2.default;
    var html = _ref.html,
        readonly = _ref.readonly,
        props = (0, _objectWithoutProperties3.default)(_ref, ['html', 'readonly']);
    return _react2.default.createElement(AceEditor, (0, _extends3.default)({}, props, { value: html, readOnly: readonly }));
  }
});

HtmlEditor.displayName = 'HtmlEditor';
exports.default = HtmlEditor;

/***/ }),

/***/ "mgnk":
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__("aCM0"),
    isObjectLike = __webpack_require__("UnEC");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "msXi":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("77Pl");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "mvHQ":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("qkKv"), __esModule: true };

/***/ }),

/***/ "n0T6":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("Ibhu");
var hiddenKeys = __webpack_require__("xnc9").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "o2mx":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("NkRn"),
    arrayMap = __webpack_require__("Hxdr"),
    isArray = __webpack_require__("NGEn"),
    isSymbol = __webpack_require__("6MiT");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "oM7Q":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("sF+V");
var $Object = __webpack_require__("FeBl").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "octw":
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ "otPO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobxStateTree = __webpack_require__("D5HE");

exports.default = _mobxStateTree.types.model('MediaPage', {
  filename: '',
  type: _mobxStateTree.types.optional(_mobxStateTree.types.literal('media'), 'media')
}).views(function (self) {
  return {
    get title() {
      return self.filename;
    },
    get keywords() {
      return [self.filename, self.type];
    }
  };
}).actions(function (self) {
  return {
    load: function load() {}
  };
});

/***/ }),

/***/ "pFYg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__("Zzip");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__("5QVw");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ "pTUa":
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__("/I3N");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "pVq3":
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;


/***/ }),

/***/ "q+Dy":
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__("G8ar"),
    isArrayLike = __webpack_require__("bGc4"),
    isString = __webpack_require__("JDN0"),
    toInteger = __webpack_require__("5Zxu"),
    values = __webpack_require__("L8MQ");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;


/***/ }),

/***/ "qNGt":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__("Jmof")):"function"==typeof define&&define.amd?define("react-jsx-parser",["react"],e):"object"==typeof exports?exports["react-jsx-parser"]=e(require("react")):t["react-jsx-parser"]=e(t.react)}("undefined"!=typeof self?self:this,function(t){return function(t){function e(i){if(s[i])return s[i].exports
var r=s[i]={i:i,l:!1,exports:{}}
return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var s={}
return e.m=t,e.c=s,e.d=function(t,s,i){e.o(t,s)||Object.defineProperty(t,s,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t}
return e.d(s,"a",s),s},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,s){"use strict"
function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e)
t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0})
var o=function(){function t(t,e){var s=[],i=!0,r=!1,n=void 0
try{for(var a,o=t[Symbol.iterator]();!(i=(a=o.next()).done)&&(s.push(a.value),!e||s.length!==e);i=!0);}catch(t){r=!0,n=t}finally{try{!i&&o.return&&o.return()}finally{if(r)throw n}}return s}return function(e,s){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return t(e,s)
throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),h=function(){function t(t,e){for(var s=0;s<e.length;s++){var i=e[s]
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,s,i){return s&&t(e.prototype,s),i&&t(e,i),e}}(),p=s(1),c=s(5),u=i(c),l=s(6),d=i(l),f=s(8),m=s(9),x=i(m),y=s(10),v={plugins:{jsx:!0}},g=function(t){function e(t){r(this,e)
var s=n(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))
return b.call(s),s.handleNewProps(t),s}return a(e,t),h(e,[{key:"componentWillReceiveProps",value:function(t){this.handleNewProps(t)}}]),e}(c.Component)
g.defaultProps={bindings:{},blacklistedAttrs:[/^on.+/i],blacklistedTags:["script"],components:[],jsx:"",onError:function(){},showWarnings:!1,renderInWrapper:!0},g.displayName="JsxParser"
var b=function(){var t=this
this.handleNewProps=function(e){t.blacklistedTags=(e.blacklistedTags||[]).map(function(t){return t.trim().toLowerCase()}).filter(Boolean),t.blacklistedAttrs=(e.blacklistedAttrs||[]).map(function(t){return t instanceof RegExp?t:new RegExp(t,"i")})
var s=(e.jsx||"").trim().replace(/<!DOCTYPE([^>]*)>/g,"")
t.ParsedChildren=t.parseJSX(s)},this.parseJSX=function(e){var s="<root>"+e+"</root>",i=[]
try{i=new p.Parser(v,s).parse(),i=i.body[0].expression.children||[]}catch(e){return t.props.showWarnings&&console.warn(e),t.props.onError&&t.props.onError(e),[]}return i.map(t.parseExpression).filter(Boolean)},this.parseExpression=function(e){switch(e.type){case"JSXElement":return t.parseElement(e)
case"JSXText":return u.default.createElement(c.Fragment,{key:(0,f.randomHash)()},e.value||"")
case"JSXAttribute":return null===e.value||t.parseExpression(e.value)
case"ArrayExpression":return e.elements.map(t.parseExpression)
case"ObjectExpression":var s={}
return e.properties.forEach(function(e){s[e.key.name||e.key.value]=t.parseExpression(e.value)}),s
case"Identifier":return t.props.bindings[e.name]||void 0
case"JSXExpressionContainer":return t.parseExpression(e.expression)
case"Literal":return e.value
default:return}},this.parseElement=function(e){var s=t.props.components,i=void 0===s?{}:s,r=e.children,n=void 0===r?[]:r,a=e.openingElement,h=a.attributes,p=void 0===h?[]:h,c=a.name
c=void 0===c?{}:c
var l=c.name
if(/^(html|head|body)$/i.test(l))return n.map(function(e){return t.parseElement(e)})
if(-1===t.blacklistedTags.indexOf(l.trim().toLowerCase())){var m=void 0
if(i[l]||(0,y.canHaveChildren)(l))if(m=n.map(t.parseExpression),i[l]||(0,y.canHaveWhitespace)(l)||(m=m.filter(function(t){return"string"!=typeof t||!/^\s*$/.test(t)})),0===m.length)m=void 0
else if(1===m.length){var v=m,g=o(v,1)
m=g[0]}var b={key:(0,f.randomHash)()}
return p.forEach(function(e){var s=e.name.name,i=x.default[s]||s,r=t.parseExpression(e)
0===t.blacklistedAttrs.filter(function(t){return t.test(i)}).length&&(b[i]=r)}),"string"==typeof b.style&&(b.style=(0,d.default)(b.style)),m&&(b.children=m),u.default.createElement(i[l]||l.toLowerCase(),b)}},this.render=function(){return t.props.renderInWrapper?u.default.createElement("div",{className:"jsx-parser"},t.ParsedChildren):u.default.createElement(c.Fragment,null,t.ParsedChildren)}}
e.default=g},function(t,e,s){"use strict"
t.exports=s(2)(s(4))},function(t,e,s){"use strict"
var i=s(3),r=/^[\da-fA-F]+$/,n=/^\d+$/
t.exports=function(t){function e(t){return t?"JSXIdentifier"===t.type?t.name:"JSXNamespacedName"===t.type?t.namespace.name+":"+t.name.name:"JSXMemberExpression"===t.type?e(t.object)+"."+e(t.property):void 0:t}var s=t.tokTypes,a=t.tokContexts
a.j_oTag=new t.TokContext("<tag",!1),a.j_cTag=new t.TokContext("</tag",!1),a.j_expr=new t.TokContext("<tag>...</tag>",!0,!0),s.jsxName=new t.TokenType("jsxName"),s.jsxText=new t.TokenType("jsxText",{beforeExpr:!0}),s.jsxTagStart=new t.TokenType("jsxTagStart"),s.jsxTagEnd=new t.TokenType("jsxTagEnd"),s.jsxTagStart.updateContext=function(){this.context.push(a.j_expr),this.context.push(a.j_oTag),this.exprAllowed=!1},s.jsxTagEnd.updateContext=function(t){var e=this.context.pop()
e===a.j_oTag&&t===s.slash||e===a.j_cTag?(this.context.pop(),this.exprAllowed=this.curContext()===a.j_expr):this.exprAllowed=!0}
var o=t.Parser.prototype
return o.jsx_readToken=function(){for(var e="",i=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated JSX contents")
var r=this.input.charCodeAt(this.pos)
switch(r){case 60:case 123:return this.pos===this.start?60===r&&this.exprAllowed?(++this.pos,this.finishToken(s.jsxTagStart)):this.getTokenFromCode(r):(e+=this.input.slice(i,this.pos),this.finishToken(s.jsxText,e))
case 38:e+=this.input.slice(i,this.pos),e+=this.jsx_readEntity(),i=this.pos
break
default:t.isNewLine(r)?(e+=this.input.slice(i,this.pos),e+=this.jsx_readNewLine(!0),i=this.pos):++this.pos}}},o.jsx_readNewLine=function(t){var e,s=this.input.charCodeAt(this.pos)
return++this.pos,13===s&&10===this.input.charCodeAt(this.pos)?(++this.pos,e=t?"\n":"\r\n"):e=String.fromCharCode(s),this.options.locations&&(++this.curLine,this.lineStart=this.pos),e},o.jsx_readString=function(e){for(var i="",r=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant")
var n=this.input.charCodeAt(this.pos)
if(n===e)break
38===n?(i+=this.input.slice(r,this.pos),i+=this.jsx_readEntity(),r=this.pos):t.isNewLine(n)?(i+=this.input.slice(r,this.pos),i+=this.jsx_readNewLine(!1),r=this.pos):++this.pos}return i+=this.input.slice(r,this.pos++),this.finishToken(s.string,i)},o.jsx_readEntity=function(){var t,e="",s=0,a=this.input[this.pos]
"&"!==a&&this.raise(this.pos,"Entity must start with an ampersand")
for(var o=++this.pos;this.pos<this.input.length&&s++<10;){if(";"===(a=this.input[this.pos++])){"#"===e[0]?"x"===e[1]?(e=e.substr(2),r.test(e)&&(t=String.fromCharCode(parseInt(e,16)))):(e=e.substr(1),n.test(e)&&(t=String.fromCharCode(parseInt(e,10)))):t=i[e]
break}e+=a}return t||(this.pos=o,"&")},o.jsx_readWord=function(){var e,i=this.pos
do{e=this.input.charCodeAt(++this.pos)}while(t.isIdentifierChar(e)||45===e)
return this.finishToken(s.jsxName,this.input.slice(i,this.pos))},o.jsx_parseIdentifier=function(){var t=this.startNode()
return this.type===s.jsxName?t.name=this.value:this.type.keyword?t.name=this.type.keyword:this.unexpected(),this.next(),this.finishNode(t,"JSXIdentifier")},o.jsx_parseNamespacedName=function(){var t=this.start,e=this.startLoc,i=this.jsx_parseIdentifier()
if(!this.options.plugins.jsx.allowNamespaces||!this.eat(s.colon))return i
var r=this.startNodeAt(t,e)
return r.namespace=i,r.name=this.jsx_parseIdentifier(),this.finishNode(r,"JSXNamespacedName")},o.jsx_parseElementName=function(){if(this.type===s.jsxTagEnd)return""
var t=this.start,e=this.startLoc,i=this.jsx_parseNamespacedName()
for(this.type!==s.dot||"JSXNamespacedName"!==i.type||this.options.plugins.jsx.allowNamespacedObjects||this.unexpected();this.eat(s.dot);){var r=this.startNodeAt(t,e)
r.object=i,r.property=this.jsx_parseIdentifier(),i=this.finishNode(r,"JSXMemberExpression")}return i},o.jsx_parseAttributeValue=function(){switch(this.type){case s.braceL:var t=this.jsx_parseExpressionContainer()
return"JSXEmptyExpression"===t.expression.type&&this.raise(t.start,"JSX attributes must only be assigned a non-empty expression"),t
case s.jsxTagStart:case s.string:return this.parseExprAtom()
default:this.raise(this.start,"JSX value should be either an expression or a quoted JSX text")}},o.jsx_parseEmptyExpression=function(){var t=this.startNodeAt(this.lastTokEnd,this.lastTokEndLoc)
return this.finishNodeAt(t,"JSXEmptyExpression",this.start,this.startLoc)},o.jsx_parseExpressionContainer=function(){var t=this.startNode()
return this.next(),t.expression=this.type===s.braceR?this.jsx_parseEmptyExpression():this.parseExpression(),this.expect(s.braceR),this.finishNode(t,"JSXExpressionContainer")},o.jsx_parseAttribute=function(){var t=this.startNode()
return this.eat(s.braceL)?(this.expect(s.ellipsis),t.argument=this.parseMaybeAssign(),this.expect(s.braceR),this.finishNode(t,"JSXSpreadAttribute")):(t.name=this.jsx_parseNamespacedName(),t.value=this.eat(s.eq)?this.jsx_parseAttributeValue():null,this.finishNode(t,"JSXAttribute"))},o.jsx_parseOpeningElementAt=function(t,e){var i=this.startNodeAt(t,e)
for(i.attributes=[],i.name=this.jsx_parseElementName();this.type!==s.slash&&this.type!==s.jsxTagEnd;)i.attributes.push(this.jsx_parseAttribute())
return i.selfClosing=this.eat(s.slash),this.expect(s.jsxTagEnd),this.finishNode(i,"JSXOpeningElement")},o.jsx_parseClosingElementAt=function(t,e){var i=this.startNodeAt(t,e)
return i.name=this.jsx_parseElementName(),this.expect(s.jsxTagEnd),this.finishNode(i,"JSXClosingElement")},o.jsx_parseElementAt=function(t,i){var r=this.startNodeAt(t,i),n=[],a=this.jsx_parseOpeningElementAt(t,i),o=null
if(!a.selfClosing){t:for(;;)switch(this.type){case s.jsxTagStart:if(t=this.start,i=this.startLoc,this.next(),this.eat(s.slash)){o=this.jsx_parseClosingElementAt(t,i)
break t}n.push(this.jsx_parseElementAt(t,i))
break
case s.jsxText:n.push(this.parseExprAtom())
break
case s.braceL:n.push(this.jsx_parseExpressionContainer())
break
default:this.unexpected()}e(o.name)!==e(a.name)&&this.raise(o.start,"Expected corresponding JSX closing tag for <"+e(a.name)+">")}return r.openingElement=a,r.closingElement=o,r.children=n,this.type===s.relational&&"<"===this.value&&this.raise(this.start,"Adjacent JSX elements must be wrapped in an enclosing tag"),this.finishNode(r,a.name?"JSXElement":"JSXFragment")},o.jsx_parseText=function(t){var e=this.parseLiteral(t)
return e.type="JSXText",e},o.jsx_parseElement=function(){var t=this.start,e=this.startLoc
return this.next(),this.jsx_parseElementAt(t,e)},t.plugins.jsx=function(e,i){i&&("object"!=typeof i&&(i={}),e.options.plugins.jsx={allowNamespaces:!1!==i.allowNamespaces,allowNamespacedObjects:!!i.allowNamespacedObjects},e.extend("parseExprAtom",function(t){return function(e){return this.type===s.jsxText?this.jsx_parseText(this.value):this.type===s.jsxTagStart?this.jsx_parseElement():t.call(this,e)}}),e.extend("readToken",function(e){return function(i){var r=this.curContext()
if(r===a.j_expr)return this.jsx_readToken()
if(r===a.j_oTag||r===a.j_cTag){if(t.isIdentifierStart(i))return this.jsx_readWord()
if(62==i)return++this.pos,this.finishToken(s.jsxTagEnd)
if((34===i||39===i)&&r==a.j_oTag)return this.jsx_readString(i)}return 60===i&&this.exprAllowed&&33!==this.input.charCodeAt(this.pos+1)?(++this.pos,this.finishToken(s.jsxTagStart)):e.call(this,i)}}),e.extend("updateContext",function(t){return function(e){if(this.type==s.braceL){var i=this.curContext()
i==a.j_oTag?this.context.push(a.b_expr):i==a.j_expr?this.context.push(a.b_tmpl):t.call(this,e),this.exprAllowed=!0}else{if(this.type!==s.slash||e!==s.jsxTagStart)return t.call(this,e)
this.context.length-=2,this.context.push(a.j_cTag),this.exprAllowed=!1}}}))},t}},function(t,e){t.exports={quot:'"',amp:"&",apos:"'",lt:"<",gt:">",nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",times:"×",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",divide:"÷",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",fnof:"ƒ",circ:"ˆ",tilde:"˜",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",bull:"•",hellip:"…",permil:"‰",prime:"′",Prime:"″",lsaquo:"‹",rsaquo:"›",oline:"‾",frasl:"⁄",euro:"€",image:"ℑ",weierp:"℘",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪",int:"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",lang:"〈",rang:"〉",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦"}},function(t,e,s){"use strict"
function i(t,e){for(var s=65536,i=0;i<e.length;i+=2){if((s+=e[i])>t)return!1
if((s+=e[i+1])>=t)return!0}}function r(t,e){return t<65?36===t:t<91||(t<97?95===t:t<123||(t<=65535?t>=170&&T.test(String.fromCharCode(t)):!1!==e&&i(t,L)))}function n(t,e){return t<48?36===t:t<58||!(t<65)&&(t<91||(t<97?95===t:t<123||(t<=65535?t>=170&&N.test(String.fromCharCode(t)):!1!==e&&(i(t,L)||i(t,P)))))}function a(t,e){return new j(t,{beforeExpr:!0,binop:e})}function o(t,e){return void 0===e&&(e={}),e.keyword=t,V[t]=new j(t,e)}function h(t){return 10===t||13===t||8232===t||8233===t}function p(t,e){return X.call(t,e)}function c(t,e){for(var s=1,i=0;;){M.lastIndex=i
var r=M.exec(t)
if(!(r&&r.index<e))return new J(s,e-i);++s,i=r.index+r[0].length}}function u(t){var e={}
for(var s in $)e[s]=t&&p(t,s)?t[s]:$[s]
if(e.ecmaVersion>=2015&&(e.ecmaVersion-=2009),null==e.allowReserved&&(e.allowReserved=e.ecmaVersion<5),z(e.onToken)){var i=e.onToken
e.onToken=function(t){return i.push(t)}}return z(e.onComment)&&(e.onComment=l(e,e.onComment)),e}function l(t,e){return function(s,i,r,n,a,o){var h={type:s?"Block":"Line",value:i,start:r,end:n}
t.locations&&(h.loc=new W(this,a,o)),t.ranges&&(h.range=[r,n]),e.push(h)}}function d(t){return new RegExp("^(?:"+t.replace(/ /g,"|")+")$")}function f(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1}function m(t,e,s,i){return t.type=e,t.end=s,this.options.locations&&(t.loc.end=i),this.options.ranges&&(t.range[1]=s),t}function x(t,e,s,i){try{return new RegExp(t,e)}catch(t){if(void 0!==s)throw t instanceof SyntaxError&&i.raise(s,"Error parsing regular expression: "+t.message),t}}function y(t){return t<=65535?String.fromCharCode(t):(t-=65536,String.fromCharCode(55296+(t>>10),56320+(1023&t)))}function v(t,e){return new H(e,t).parse()}function g(t,e,s){var i=new H(s,t,e)
return i.nextToken(),i.parseExpression()}function b(t,e){return new H(e,t)}function k(t,e,s){vt=t,gt=e,bt=s}Object.defineProperty(e,"__esModule",{value:!0}),s.d(e,"version",function(){return kt}),s.d(e,"parse",function(){return v}),s.d(e,"parseExpressionAt",function(){return g}),s.d(e,"tokenizer",function(){return b}),s.d(e,"parse_dammit",function(){return vt}),s.d(e,"LooseParser",function(){return gt}),s.d(e,"pluginsLoose",function(){return bt}),s.d(e,"addLooseExports",function(){return k}),s.d(e,"Parser",function(){return H}),s.d(e,"plugins",function(){return G}),s.d(e,"defaultOptions",function(){return $}),s.d(e,"Position",function(){return J}),s.d(e,"SourceLocation",function(){return W}),s.d(e,"getLineInfo",function(){return c}),s.d(e,"Node",function(){return ht}),s.d(e,"TokenType",function(){return j}),s.d(e,"tokTypes",function(){return O}),s.d(e,"keywordTypes",function(){return V}),s.d(e,"TokContext",function(){return ct}),s.d(e,"tokContexts",function(){return ut}),s.d(e,"isIdentifierChar",function(){return n}),s.d(e,"isIdentifierStart",function(){return r}),s.d(e,"Token",function(){return dt}),s.d(e,"isNewLine",function(){return h}),s.d(e,"lineBreak",function(){return F}),s.d(e,"lineBreakG",function(){return M}),s.d(e,"nonASCIIwhitespace",function(){return D})
var E={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},w="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",A={5:w,6:w+" const class extends export import super"},S=/^in(stanceof)?$/,C="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",_="‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣔ-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿",T=new RegExp("["+C+"]"),N=new RegExp("["+C+_+"]")
C=_=null
var L=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,785,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,54,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,25,391,63,32,0,449,56,264,8,2,36,18,0,50,29,881,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,65,0,32,6124,20,754,9486,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,60,67,1213,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,10591,541],P=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,10,2,4,9,83,11,7,0,161,11,6,9,7,3,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,87,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,423,9,838,7,2,7,17,9,57,21,2,13,19882,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,2214,6,110,6,6,9,792487,239],j=function(t,e){void 0===e&&(e={}),this.label=t,this.keyword=e.keyword,this.beforeExpr=!!e.beforeExpr,this.startsExpr=!!e.startsExpr,this.isLoop=!!e.isLoop,this.isAssign=!!e.isAssign,this.prefix=!!e.prefix,this.postfix=!!e.postfix,this.binop=e.binop||null,this.updateContext=null},I={beforeExpr:!0},R={startsExpr:!0},V={},O={num:new j("num",R),regexp:new j("regexp",R),string:new j("string",R),name:new j("name",R),eof:new j("eof"),bracketL:new j("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new j("]"),braceL:new j("{",{beforeExpr:!0,startsExpr:!0}),braceR:new j("}"),parenL:new j("(",{beforeExpr:!0,startsExpr:!0}),parenR:new j(")"),comma:new j(",",I),semi:new j(";",I),colon:new j(":",I),dot:new j("."),question:new j("?",I),arrow:new j("=>",I),template:new j("template"),invalidTemplate:new j("invalidTemplate"),ellipsis:new j("...",I),backQuote:new j("`",R),dollarBraceL:new j("${",{beforeExpr:!0,startsExpr:!0}),eq:new j("=",{beforeExpr:!0,isAssign:!0}),assign:new j("_=",{beforeExpr:!0,isAssign:!0}),incDec:new j("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new j("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:a("||",1),logicalAND:a("&&",2),bitwiseOR:a("|",3),bitwiseXOR:a("^",4),bitwiseAND:a("&",5),equality:a("==/!=/===/!==",6),relational:a("</>/<=/>=",7),bitShift:a("<</>>/>>>",8),plusMin:new j("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:a("%",10),star:a("*",10),slash:a("/",10),starstar:new j("**",{beforeExpr:!0}),_break:o("break"),_case:o("case",I),_catch:o("catch"),_continue:o("continue"),_debugger:o("debugger"),_default:o("default",I),_do:o("do",{isLoop:!0,beforeExpr:!0}),_else:o("else",I),_finally:o("finally"),_for:o("for",{isLoop:!0}),_function:o("function",R),_if:o("if"),_return:o("return",I),_switch:o("switch"),_throw:o("throw",I),_try:o("try"),_var:o("var"),_const:o("const"),_while:o("while",{isLoop:!0}),_with:o("with"),_new:o("new",{beforeExpr:!0,startsExpr:!0}),_this:o("this",R),_super:o("super",R),_class:o("class",R),_extends:o("extends",I),_export:o("export"),_import:o("import"),_null:o("null",R),_true:o("true",R),_false:o("false",R),_in:o("in",{beforeExpr:!0,binop:7}),_instanceof:o("instanceof",{beforeExpr:!0,binop:7}),_typeof:o("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:o("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:o("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},F=/\r\n?|\n|\u2028|\u2029/,M=new RegExp(F.source,"g"),D=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,B=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,q=Object.prototype,X=q.hasOwnProperty,U=q.toString,z=Array.isArray||function(t){return"[object Array]"===U.call(t)},J=function(t,e){this.line=t,this.column=e}
J.prototype.offset=function(t){return new J(this.line,this.column+t)}
var W=function(t,e,s){this.start=e,this.end=s,null!==t.sourceFile&&(this.source=t.sourceFile)},$={ecmaVersion:7,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1,plugins:{}},G={},H=function(t,e,s){this.options=t=u(t),this.sourceFile=t.sourceFile,this.keywords=d(A[t.ecmaVersion>=6?6:5])
var i=""
if(!t.allowReserved){for(var r=t.ecmaVersion;!(i=E[r]);r--);"module"==t.sourceType&&(i+=" await")}this.reservedWords=d(i)
var n=(i?i+" ":"")+E.strict
this.reservedWordsStrict=d(n),this.reservedWordsStrictBind=d(n+" "+E.strictBind),this.input=String(e),this.containsEsc=!1,this.loadPlugins(t.plugins),s?(this.pos=s,this.lineStart=this.input.lastIndexOf("\n",s-1)+1,this.curLine=this.input.slice(0,this.lineStart).split(F).length):(this.pos=this.lineStart=0,this.curLine=1),this.type=O.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule="module"===t.sourceType,this.strict=this.inModule||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.inFunction=this.inGenerator=this.inAsync=!1,this.yieldPos=this.awaitPos=0,this.labels=[],0===this.pos&&t.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2),this.scopeStack=[],this.enterFunctionScope()}
H.prototype.isKeyword=function(t){return this.keywords.test(t)},H.prototype.isReservedWord=function(t){return this.reservedWords.test(t)},H.prototype.extend=function(t,e){this[t]=e(this[t])},H.prototype.loadPlugins=function(t){var e=this
for(var s in t){var i=G[s]
if(!i)throw new Error("Plugin '"+s+"' not found")
i(e,t[s])}},H.prototype.parse=function(){var t=this.options.program||this.startNode()
return this.nextToken(),this.parseTopLevel(t)}
var Y=H.prototype,Q=/^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/
Y.strictDirective=function(t){for(var e=this;;){B.lastIndex=t,t+=B.exec(e.input)[0].length
var s=Q.exec(e.input.slice(t))
if(!s)return!1
if("use strict"==(s[1]||s[2]))return!0
t+=s[0].length}},Y.eat=function(t){return this.type===t&&(this.next(),!0)},Y.isContextual=function(t){return this.type===O.name&&this.value===t&&!this.containsEsc},Y.eatContextual=function(t){return!!this.isContextual(t)&&(this.next(),!0)},Y.expectContextual=function(t){this.eatContextual(t)||this.unexpected()},Y.canInsertSemicolon=function(){return this.type===O.eof||this.type===O.braceR||F.test(this.input.slice(this.lastTokEnd,this.start))},Y.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0},Y.semicolon=function(){this.eat(O.semi)||this.insertSemicolon()||this.unexpected()},Y.afterTrailingComma=function(t,e){if(this.type==t)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),e||this.next(),!0},Y.expect=function(t){this.eat(t)||this.unexpected()},Y.unexpected=function(t){this.raise(null!=t?t:this.start,"Unexpected token")},Y.checkPatternErrors=function(t,e){if(t){t.trailingComma>-1&&this.raiseRecoverable(t.trailingComma,"Comma is not permitted after the rest element")
var s=e?t.parenthesizedAssign:t.parenthesizedBind
s>-1&&this.raiseRecoverable(s,"Parenthesized pattern")}},Y.checkExpressionErrors=function(t,e){if(!t)return!1
var s=t.shorthandAssign,i=t.doubleProto
if(!e)return s>=0||i>=0
s>=0&&this.raise(s,"Shorthand property assignments are valid only in destructuring patterns"),i>=0&&this.raiseRecoverable(i,"Redefinition of __proto__ property")},Y.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")},Y.isSimpleAssignTarget=function(t){return"ParenthesizedExpression"===t.type?this.isSimpleAssignTarget(t.expression):"Identifier"===t.type||"MemberExpression"===t.type}
var Z=H.prototype
Z.parseTopLevel=function(t){var e=this,s={}
for(t.body||(t.body=[]);this.type!==O.eof;){var i=e.parseStatement(!0,!0,s)
t.body.push(i)}return this.adaptDirectivePrologue(t.body),this.next(),this.options.ecmaVersion>=6&&(t.sourceType=this.options.sourceType),this.finishNode(t,"Program")}
var K={kind:"loop"},tt={kind:"switch"}
Z.isLet=function(){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1
B.lastIndex=this.pos
var t=B.exec(this.input),e=this.pos+t[0].length,s=this.input.charCodeAt(e)
if(91===s||123==s)return!0
if(r(s,!0)){for(var i=e+1;n(this.input.charCodeAt(i),!0);)++i
var a=this.input.slice(e,i)
if(!S.test(a))return!0}return!1},Z.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1
B.lastIndex=this.pos
var t=B.exec(this.input),e=this.pos+t[0].length
return!(F.test(this.input.slice(this.pos,e))||"function"!==this.input.slice(e,e+8)||e+8!=this.input.length&&n(this.input.charAt(e+8)))},Z.parseStatement=function(t,e,s){var i,r=this.type,n=this.startNode()
switch(this.isLet()&&(r=O._var,i="let"),r){case O._break:case O._continue:return this.parseBreakContinueStatement(n,r.keyword)
case O._debugger:return this.parseDebuggerStatement(n)
case O._do:return this.parseDoStatement(n)
case O._for:return this.parseForStatement(n)
case O._function:return!t&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(n,!1)
case O._class:return t||this.unexpected(),this.parseClass(n,!0)
case O._if:return this.parseIfStatement(n)
case O._return:return this.parseReturnStatement(n)
case O._switch:return this.parseSwitchStatement(n)
case O._throw:return this.parseThrowStatement(n)
case O._try:return this.parseTryStatement(n)
case O._const:case O._var:return i=i||this.value,t||"var"==i||this.unexpected(),this.parseVarStatement(n,i)
case O._while:return this.parseWhileStatement(n)
case O._with:return this.parseWithStatement(n)
case O.braceL:return this.parseBlock()
case O.semi:return this.parseEmptyStatement(n)
case O._export:case O._import:return this.options.allowImportExportEverywhere||(e||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),r===O._import?this.parseImport(n):this.parseExport(n,s)
default:if(this.isAsyncFunction())return t||this.unexpected(),this.next(),this.parseFunctionStatement(n,!0)
var a=this.value,o=this.parseExpression()
return r===O.name&&"Identifier"===o.type&&this.eat(O.colon)?this.parseLabeledStatement(n,a,o):this.parseExpressionStatement(n,o)}},Z.parseBreakContinueStatement=function(t,e){var s=this,i="break"==e
this.next(),this.eat(O.semi)||this.insertSemicolon()?t.label=null:this.type!==O.name?this.unexpected():(t.label=this.parseIdent(),this.semicolon())
for(var r=0;r<this.labels.length;++r){var n=s.labels[r]
if(null==t.label||n.name===t.label.name){if(null!=n.kind&&(i||"loop"===n.kind))break
if(t.label&&i)break}}return r===this.labels.length&&this.raise(t.start,"Unsyntactic "+e),this.finishNode(t,i?"BreakStatement":"ContinueStatement")},Z.parseDebuggerStatement=function(t){return this.next(),this.semicolon(),this.finishNode(t,"DebuggerStatement")},Z.parseDoStatement=function(t){return this.next(),this.labels.push(K),t.body=this.parseStatement(!1),this.labels.pop(),this.expect(O._while),t.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(O.semi):this.semicolon(),this.finishNode(t,"DoWhileStatement")},Z.parseForStatement=function(t){if(this.next(),this.labels.push(K),this.enterLexicalScope(),this.expect(O.parenL),this.type===O.semi)return this.parseFor(t,null)
var e=this.isLet()
if(this.type===O._var||this.type===O._const||e){var s=this.startNode(),i=e?"let":this.value
return this.next(),this.parseVar(s,!0,i),this.finishNode(s,"VariableDeclaration"),!(this.type===O._in||this.options.ecmaVersion>=6&&this.isContextual("of"))||1!==s.declarations.length||"var"!==i&&s.declarations[0].init?this.parseFor(t,s):this.parseForIn(t,s)}var r=new f,n=this.parseExpression(!0,r)
return this.type===O._in||this.options.ecmaVersion>=6&&this.isContextual("of")?(this.toAssignable(n,!1,r),this.checkLVal(n),this.parseForIn(t,n)):(this.checkExpressionErrors(r,!0),this.parseFor(t,n))},Z.parseFunctionStatement=function(t,e){return this.next(),this.parseFunction(t,!0,!1,e)},Z.parseIfStatement=function(t){return this.next(),t.test=this.parseParenExpression(),t.consequent=this.parseStatement(!this.strict&&this.type==O._function),t.alternate=this.eat(O._else)?this.parseStatement(!this.strict&&this.type==O._function):null,this.finishNode(t,"IfStatement")},Z.parseReturnStatement=function(t){return this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(O.semi)||this.insertSemicolon()?t.argument=null:(t.argument=this.parseExpression(),this.semicolon()),this.finishNode(t,"ReturnStatement")},Z.parseSwitchStatement=function(t){var e=this
this.next(),t.discriminant=this.parseParenExpression(),t.cases=[],this.expect(O.braceL),this.labels.push(tt),this.enterLexicalScope()
for(var s,i=!1;this.type!=O.braceR;)if(e.type===O._case||e.type===O._default){var r=e.type===O._case
s&&e.finishNode(s,"SwitchCase"),t.cases.push(s=e.startNode()),s.consequent=[],e.next(),r?s.test=e.parseExpression():(i&&e.raiseRecoverable(e.lastTokStart,"Multiple default clauses"),i=!0,s.test=null),e.expect(O.colon)}else s||e.unexpected(),s.consequent.push(e.parseStatement(!0))
return this.exitLexicalScope(),s&&this.finishNode(s,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(t,"SwitchStatement")},Z.parseThrowStatement=function(t){return this.next(),F.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),t.argument=this.parseExpression(),this.semicolon(),this.finishNode(t,"ThrowStatement")}
var et=[]
Z.parseTryStatement=function(t){if(this.next(),t.block=this.parseBlock(),t.handler=null,this.type===O._catch){var e=this.startNode()
this.next(),this.expect(O.parenL),e.param=this.parseBindingAtom(),this.enterLexicalScope(),this.checkLVal(e.param,"let"),this.expect(O.parenR),e.body=this.parseBlock(!1),this.exitLexicalScope(),t.handler=this.finishNode(e,"CatchClause")}return t.finalizer=this.eat(O._finally)?this.parseBlock():null,t.handler||t.finalizer||this.raise(t.start,"Missing catch or finally clause"),this.finishNode(t,"TryStatement")},Z.parseVarStatement=function(t,e){return this.next(),this.parseVar(t,!1,e),this.semicolon(),this.finishNode(t,"VariableDeclaration")},Z.parseWhileStatement=function(t){return this.next(),t.test=this.parseParenExpression(),this.labels.push(K),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,"WhileStatement")},Z.parseWithStatement=function(t){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),t.object=this.parseParenExpression(),t.body=this.parseStatement(!1),this.finishNode(t,"WithStatement")},Z.parseEmptyStatement=function(t){return this.next(),this.finishNode(t,"EmptyStatement")},Z.parseLabeledStatement=function(t,e,s){for(var i=this,r=0,n=i.labels;r<n.length;r+=1){n[r].name===e&&i.raise(s.start,"Label '"+e+"' is already declared")}for(var a=this.type.isLoop?"loop":this.type===O._switch?"switch":null,o=this.labels.length-1;o>=0;o--){var h=i.labels[o]
if(h.statementStart!=t.start)break
h.statementStart=i.start,h.kind=a}return this.labels.push({name:e,kind:a,statementStart:this.start}),t.body=this.parseStatement(!0),("ClassDeclaration"==t.body.type||"VariableDeclaration"==t.body.type&&"var"!=t.body.kind||"FunctionDeclaration"==t.body.type&&(this.strict||t.body.generator))&&this.raiseRecoverable(t.body.start,"Invalid labeled declaration"),this.labels.pop(),t.label=s,this.finishNode(t,"LabeledStatement")},Z.parseExpressionStatement=function(t,e){return t.expression=e,this.semicolon(),this.finishNode(t,"ExpressionStatement")},Z.parseBlock=function(t){var e=this
void 0===t&&(t=!0)
var s=this.startNode()
for(s.body=[],this.expect(O.braceL),t&&this.enterLexicalScope();!this.eat(O.braceR);){var i=e.parseStatement(!0)
s.body.push(i)}return t&&this.exitLexicalScope(),this.finishNode(s,"BlockStatement")},Z.parseFor=function(t,e){return t.init=e,this.expect(O.semi),t.test=this.type===O.semi?null:this.parseExpression(),this.expect(O.semi),t.update=this.type===O.parenR?null:this.parseExpression(),this.expect(O.parenR),this.exitLexicalScope(),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,"ForStatement")},Z.parseForIn=function(t,e){var s=this.type===O._in?"ForInStatement":"ForOfStatement"
return this.next(),"ForInStatement"==s&&("AssignmentPattern"===e.type||"VariableDeclaration"===e.type&&null!=e.declarations[0].init&&(this.strict||"Identifier"!==e.declarations[0].id.type))&&this.raise(e.start,"Invalid assignment in for-in loop head"),t.left=e,t.right="ForInStatement"==s?this.parseExpression():this.parseMaybeAssign(),this.expect(O.parenR),this.exitLexicalScope(),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,s)},Z.parseVar=function(t,e,s){var i=this
for(t.declarations=[],t.kind=s;;){var r=i.startNode()
if(i.parseVarId(r,s),i.eat(O.eq)?r.init=i.parseMaybeAssign(e):"const"!==s||i.type===O._in||i.options.ecmaVersion>=6&&i.isContextual("of")?"Identifier"==r.id.type||e&&(i.type===O._in||i.isContextual("of"))?r.init=null:i.raise(i.lastTokEnd,"Complex binding patterns require an initialization value"):i.unexpected(),t.declarations.push(i.finishNode(r,"VariableDeclarator")),!i.eat(O.comma))break}return t},Z.parseVarId=function(t,e){t.id=this.parseBindingAtom(e),this.checkLVal(t.id,e,!1)},Z.parseFunction=function(t,e,s,i){this.initFunction(t),this.options.ecmaVersion>=6&&!i&&(t.generator=this.eat(O.star)),this.options.ecmaVersion>=8&&(t.async=!!i),e&&(t.id="nullableID"===e&&this.type!=O.name?null:this.parseIdent(),t.id&&this.checkLVal(t.id,"var"))
var r=this.inGenerator,n=this.inAsync,a=this.yieldPos,o=this.awaitPos,h=this.inFunction
return this.inGenerator=t.generator,this.inAsync=t.async,this.yieldPos=0,this.awaitPos=0,this.inFunction=!0,this.enterFunctionScope(),e||(t.id=this.type==O.name?this.parseIdent():null),this.parseFunctionParams(t),this.parseFunctionBody(t,s),this.inGenerator=r,this.inAsync=n,this.yieldPos=a,this.awaitPos=o,this.inFunction=h,this.finishNode(t,e?"FunctionDeclaration":"FunctionExpression")},Z.parseFunctionParams=function(t){this.expect(O.parenL),t.params=this.parseBindingList(O.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()},Z.parseClass=function(t,e){var s=this
this.next(),this.parseClassId(t,e),this.parseClassSuper(t)
var i=this.startNode(),r=!1
for(i.body=[],this.expect(O.braceL);!this.eat(O.braceR);){var n=s.parseClassMember(i)
n&&"MethodDefinition"===n.type&&"constructor"===n.kind&&(r&&s.raise(n.start,"Duplicate constructor in the same class"),r=!0)}return t.body=this.finishNode(i,"ClassBody"),this.finishNode(t,e?"ClassDeclaration":"ClassExpression")},Z.parseClassMember=function(t){var e=this
if(this.eat(O.semi))return null
var s=this.startNode(),i=function(t,i){void 0===i&&(i=!1)
var r=e.start,n=e.startLoc
return!!e.eatContextual(t)&&(!(e.type===O.parenL||i&&e.canInsertSemicolon())||(s.key&&e.unexpected(),s.computed=!1,s.key=e.startNodeAt(r,n),s.key.name=t,e.finishNode(s.key,"Identifier"),!1))}
s.kind="method",s.static=i("static")
var r=this.eat(O.star),n=!1
r||(this.options.ecmaVersion>=8&&i("async",!0)?n=!0:i("get")?s.kind="get":i("set")&&(s.kind="set")),s.key||this.parsePropertyName(s)
var a=s.key
return s.computed||s.static||!("Identifier"===a.type&&"constructor"===a.name||"Literal"===a.type&&"constructor"===a.value)?s.static&&"Identifier"===a.type&&"prototype"===a.name&&this.raise(a.start,"Classes may not have a static property named prototype"):("method"!==s.kind&&this.raise(a.start,"Constructor can't have get/set modifier"),r&&this.raise(a.start,"Constructor can't be a generator"),n&&this.raise(a.start,"Constructor can't be an async method"),s.kind="constructor"),this.parseClassMethod(t,s,r,n),"get"===s.kind&&0!==s.value.params.length&&this.raiseRecoverable(s.value.start,"getter should have no params"),"set"===s.kind&&1!==s.value.params.length&&this.raiseRecoverable(s.value.start,"setter should have exactly one param"),"set"===s.kind&&"RestElement"===s.value.params[0].type&&this.raiseRecoverable(s.value.params[0].start,"Setter cannot use rest params"),s},Z.parseClassMethod=function(t,e,s,i){e.value=this.parseMethod(s,i),t.body.push(this.finishNode(e,"MethodDefinition"))},Z.parseClassId=function(t,e){t.id=this.type===O.name?this.parseIdent():!0===e?this.unexpected():null},Z.parseClassSuper=function(t){t.superClass=this.eat(O._extends)?this.parseExprSubscripts():null},Z.parseExport=function(t,e){var s=this
if(this.next(),this.eat(O.star))return this.expectContextual("from"),this.type!==O.string&&this.unexpected(),t.source=this.parseExprAtom(),this.semicolon(),this.finishNode(t,"ExportAllDeclaration")
if(this.eat(O._default)){this.checkExport(e,"default",this.lastTokStart)
var i
if(this.type===O._function||(i=this.isAsyncFunction())){var r=this.startNode()
this.next(),i&&this.next(),t.declaration=this.parseFunction(r,"nullableID",!1,i)}else if(this.type===O._class){var n=this.startNode()
t.declaration=this.parseClass(n,"nullableID")}else t.declaration=this.parseMaybeAssign(),this.semicolon()
return this.finishNode(t,"ExportDefaultDeclaration")}if(this.shouldParseExportStatement())t.declaration=this.parseStatement(!0),"VariableDeclaration"===t.declaration.type?this.checkVariableExport(e,t.declaration.declarations):this.checkExport(e,t.declaration.id.name,t.declaration.id.start),t.specifiers=[],t.source=null
else{if(t.declaration=null,t.specifiers=this.parseExportSpecifiers(e),this.eatContextual("from"))this.type!==O.string&&this.unexpected(),t.source=this.parseExprAtom()
else{for(var a=0,o=t.specifiers;a<o.length;a+=1){var h=o[a]
s.checkUnreserved(h.local)}t.source=null}this.semicolon()}return this.finishNode(t,"ExportNamedDeclaration")},Z.checkExport=function(t,e,s){t&&(p(t,e)&&this.raiseRecoverable(s,"Duplicate export '"+e+"'"),t[e]=!0)},Z.checkPatternExport=function(t,e){var s=this,i=e.type
if("Identifier"==i)this.checkExport(t,e.name,e.start)
else if("ObjectPattern"==i)for(var r=0,n=e.properties;r<n.length;r+=1){var a=n[r]
s.checkPatternExport(t,a.value)}else if("ArrayPattern"==i)for(var o=0,h=e.elements;o<h.length;o+=1){var p=h[o]
p&&s.checkPatternExport(t,p)}else"AssignmentPattern"==i?this.checkPatternExport(t,e.left):"ParenthesizedExpression"==i&&this.checkPatternExport(t,e.expression)},Z.checkVariableExport=function(t,e){var s=this
if(t)for(var i=0,r=e;i<r.length;i+=1){var n=r[i]
s.checkPatternExport(t,n.id)}},Z.shouldParseExportStatement=function(){return"var"===this.type.keyword||"const"===this.type.keyword||"class"===this.type.keyword||"function"===this.type.keyword||this.isLet()||this.isAsyncFunction()},Z.parseExportSpecifiers=function(t){var e=this,s=[],i=!0
for(this.expect(O.braceL);!this.eat(O.braceR);){if(i)i=!1
else if(e.expect(O.comma),e.afterTrailingComma(O.braceR))break
var r=e.startNode()
r.local=e.parseIdent(!0),r.exported=e.eatContextual("as")?e.parseIdent(!0):r.local,e.checkExport(t,r.exported.name,r.exported.start),s.push(e.finishNode(r,"ExportSpecifier"))}return s},Z.parseImport=function(t){return this.next(),this.type===O.string?(t.specifiers=et,t.source=this.parseExprAtom()):(t.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),t.source=this.type===O.string?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(t,"ImportDeclaration")},Z.parseImportSpecifiers=function(){var t=this,e=[],s=!0
if(this.type===O.name){var i=this.startNode()
if(i.local=this.parseIdent(),this.checkLVal(i.local,"let"),e.push(this.finishNode(i,"ImportDefaultSpecifier")),!this.eat(O.comma))return e}if(this.type===O.star){var r=this.startNode()
return this.next(),this.expectContextual("as"),r.local=this.parseIdent(),this.checkLVal(r.local,"let"),e.push(this.finishNode(r,"ImportNamespaceSpecifier")),e}for(this.expect(O.braceL);!this.eat(O.braceR);){if(s)s=!1
else if(t.expect(O.comma),t.afterTrailingComma(O.braceR))break
var n=t.startNode()
n.imported=t.parseIdent(!0),t.eatContextual("as")?n.local=t.parseIdent():(t.checkUnreserved(n.imported),n.local=n.imported),t.checkLVal(n.local,"let"),e.push(t.finishNode(n,"ImportSpecifier"))}return e},Z.adaptDirectivePrologue=function(t){for(var e=0;e<t.length&&this.isDirectiveCandidate(t[e]);++e)t[e].directive=t[e].expression.raw.slice(1,-1)},Z.isDirectiveCandidate=function(t){return"ExpressionStatement"===t.type&&"Literal"===t.expression.type&&"string"==typeof t.expression.value&&('"'===this.input[t.start]||"'"===this.input[t.start])}
var st=H.prototype
st.toAssignable=function(t,e,s){var i=this
if(this.options.ecmaVersion>=6&&t)switch(t.type){case"Identifier":this.inAsync&&"await"===t.name&&this.raise(t.start,"Can not use 'await' as identifier inside an async function")
break
case"ObjectPattern":case"ArrayPattern":case"RestElement":break
case"ObjectExpression":t.type="ObjectPattern",s&&this.checkPatternErrors(s,!0)
for(var r=0,n=t.properties;r<n.length;r+=1){var a=n[r]
i.toAssignable(a,e)}break
case"Property":"init"!==t.kind&&this.raise(t.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(t.value,e)
break
case"ArrayExpression":t.type="ArrayPattern",s&&this.checkPatternErrors(s,!0),this.toAssignableList(t.elements,e)
break
case"SpreadElement":t.type="RestElement",this.toAssignable(t.argument,e),"AssignmentPattern"===t.argument.type&&this.raise(t.argument.start,"Rest elements cannot have a default value")
break
case"AssignmentExpression":"="!==t.operator&&this.raise(t.left.end,"Only '=' operator can be used for specifying default value."),t.type="AssignmentPattern",delete t.operator,this.toAssignable(t.left,e)
case"AssignmentPattern":break
case"ParenthesizedExpression":this.toAssignable(t.expression,e)
break
case"MemberExpression":if(!e)break
default:this.raise(t.start,"Assigning to rvalue")}else s&&this.checkPatternErrors(s,!0)
return t},st.toAssignableList=function(t,e){for(var s=this,i=t.length,r=0;r<i;r++){var n=t[r]
n&&s.toAssignable(n,e)}if(i){var a=t[i-1]
6===this.options.ecmaVersion&&e&&a&&"RestElement"===a.type&&"Identifier"!==a.argument.type&&this.unexpected(a.argument.start)}return t},st.parseSpread=function(t){var e=this.startNode()
return this.next(),e.argument=this.parseMaybeAssign(!1,t),this.finishNode(e,"SpreadElement")},st.parseRestBinding=function(){var t=this.startNode()
return this.next(),6===this.options.ecmaVersion&&this.type!==O.name&&this.unexpected(),t.argument=this.parseBindingAtom(),this.finishNode(t,"RestElement")},st.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case O.bracketL:var t=this.startNode()
return this.next(),t.elements=this.parseBindingList(O.bracketR,!0,!0),this.finishNode(t,"ArrayPattern")
case O.braceL:return this.parseObj(!0)}return this.parseIdent()},st.parseBindingList=function(t,e,s){for(var i=this,r=[],n=!0;!this.eat(t);)if(n?n=!1:i.expect(O.comma),e&&i.type===O.comma)r.push(null)
else{if(s&&i.afterTrailingComma(t))break
if(i.type===O.ellipsis){var a=i.parseRestBinding()
i.parseBindingListItem(a),r.push(a),i.type===O.comma&&i.raise(i.start,"Comma is not permitted after the rest element"),i.expect(t)
break}var o=i.parseMaybeDefault(i.start,i.startLoc)
i.parseBindingListItem(o),r.push(o)}return r},st.parseBindingListItem=function(t){return t},st.parseMaybeDefault=function(t,e,s){if(s=s||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(O.eq))return s
var i=this.startNodeAt(t,e)
return i.left=s,i.right=this.parseMaybeAssign(),this.finishNode(i,"AssignmentPattern")},st.checkLVal=function(t,e,s){var i=this
switch(t.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(t.name)&&this.raiseRecoverable(t.start,(e?"Binding ":"Assigning to ")+t.name+" in strict mode"),s&&(p(s,t.name)&&this.raiseRecoverable(t.start,"Argument name clash"),s[t.name]=!0),e&&"none"!==e&&(("var"===e&&!this.canDeclareVarName(t.name)||"var"!==e&&!this.canDeclareLexicalName(t.name))&&this.raiseRecoverable(t.start,"Identifier '"+t.name+"' has already been declared"),"var"===e?this.declareVarName(t.name):this.declareLexicalName(t.name))
break
case"MemberExpression":e&&this.raiseRecoverable(t.start,"Binding member expression")
break
case"ObjectPattern":for(var r=0,n=t.properties;r<n.length;r+=1){var a=n[r]
i.checkLVal(a,e,s)}break
case"Property":this.checkLVal(t.value,e,s)
break
case"ArrayPattern":for(var o=0,h=t.elements;o<h.length;o+=1){var c=h[o]
c&&i.checkLVal(c,e,s)}break
case"AssignmentPattern":this.checkLVal(t.left,e,s)
break
case"RestElement":this.checkLVal(t.argument,e,s)
break
case"ParenthesizedExpression":this.checkLVal(t.expression,e,s)
break
default:this.raise(t.start,(e?"Binding":"Assigning to")+" rvalue")}}
var it=H.prototype
it.checkPropClash=function(t,e,s){if(!(this.options.ecmaVersion>=6&&(t.computed||t.method||t.shorthand))){var i,r=t.key
switch(r.type){case"Identifier":i=r.name
break
case"Literal":i=String(r.value)
break
default:return}var n=t.kind
if(this.options.ecmaVersion>=6)return void("__proto__"===i&&"init"===n&&(e.proto&&(s&&s.doubleProto<0?s.doubleProto=r.start:this.raiseRecoverable(r.start,"Redefinition of __proto__ property")),e.proto=!0))
i="$"+i
var a=e[i]
if(a){var o
o="init"===n?this.strict&&a.init||a.get||a.set:a.init||a[n],o&&this.raiseRecoverable(r.start,"Redefinition of property")}else a=e[i]={init:!1,get:!1,set:!1}
a[n]=!0}},it.parseExpression=function(t,e){var s=this,i=this.start,r=this.startLoc,n=this.parseMaybeAssign(t,e)
if(this.type===O.comma){var a=this.startNodeAt(i,r)
for(a.expressions=[n];this.eat(O.comma);)a.expressions.push(s.parseMaybeAssign(t,e))
return this.finishNode(a,"SequenceExpression")}return n},it.parseMaybeAssign=function(t,e,s){if(this.inGenerator&&this.isContextual("yield"))return this.parseYield()
var i=!1,r=-1,n=-1
e?(r=e.parenthesizedAssign,n=e.trailingComma,e.parenthesizedAssign=e.trailingComma=-1):(e=new f,i=!0)
var a=this.start,o=this.startLoc
this.type!=O.parenL&&this.type!=O.name||(this.potentialArrowAt=this.start)
var h=this.parseMaybeConditional(t,e)
if(s&&(h=s.call(this,h,a,o)),this.type.isAssign){var p=this.startNodeAt(a,o)
return p.operator=this.value,p.left=this.type===O.eq?this.toAssignable(h,!1,e):h,i||f.call(e),e.shorthandAssign=-1,this.checkLVal(h),this.next(),p.right=this.parseMaybeAssign(t),this.finishNode(p,"AssignmentExpression")}return i&&this.checkExpressionErrors(e,!0),r>-1&&(e.parenthesizedAssign=r),n>-1&&(e.trailingComma=n),h},it.parseMaybeConditional=function(t,e){var s=this.start,i=this.startLoc,r=this.parseExprOps(t,e)
if(this.checkExpressionErrors(e))return r
if(this.eat(O.question)){var n=this.startNodeAt(s,i)
return n.test=r,n.consequent=this.parseMaybeAssign(),this.expect(O.colon),n.alternate=this.parseMaybeAssign(t),this.finishNode(n,"ConditionalExpression")}return r},it.parseExprOps=function(t,e){var s=this.start,i=this.startLoc,r=this.parseMaybeUnary(e,!1)
return this.checkExpressionErrors(e)?r:r.start==s&&"ArrowFunctionExpression"===r.type?r:this.parseExprOp(r,s,i,-1,t)},it.parseExprOp=function(t,e,s,i,r){var n=this.type.binop
if(null!=n&&(!r||this.type!==O._in)&&n>i){var a=this.type===O.logicalOR||this.type===O.logicalAND,o=this.value
this.next()
var h=this.start,p=this.startLoc,c=this.parseExprOp(this.parseMaybeUnary(null,!1),h,p,n,r),u=this.buildBinary(e,s,t,c,o,a)
return this.parseExprOp(u,e,s,i,r)}return t},it.buildBinary=function(t,e,s,i,r,n){var a=this.startNodeAt(t,e)
return a.left=s,a.operator=r,a.right=i,this.finishNode(a,n?"LogicalExpression":"BinaryExpression")},it.parseMaybeUnary=function(t,e){var s,i=this,r=this.start,n=this.startLoc
if(this.inAsync&&this.isContextual("await"))s=this.parseAwait(),e=!0
else if(this.type.prefix){var a=this.startNode(),o=this.type===O.incDec
a.operator=this.value,a.prefix=!0,this.next(),a.argument=this.parseMaybeUnary(null,!0),this.checkExpressionErrors(t,!0),o?this.checkLVal(a.argument):this.strict&&"delete"===a.operator&&"Identifier"===a.argument.type?this.raiseRecoverable(a.start,"Deleting local variable in strict mode"):e=!0,s=this.finishNode(a,o?"UpdateExpression":"UnaryExpression")}else{if(s=this.parseExprSubscripts(t),this.checkExpressionErrors(t))return s
for(;this.type.postfix&&!this.canInsertSemicolon();){var h=i.startNodeAt(r,n)
h.operator=i.value,h.prefix=!1,h.argument=s,i.checkLVal(s),i.next(),s=i.finishNode(h,"UpdateExpression")}}return!e&&this.eat(O.starstar)?this.buildBinary(r,n,s,this.parseMaybeUnary(null,!1),"**",!1):s},it.parseExprSubscripts=function(t){var e=this.start,s=this.startLoc,i=this.parseExprAtom(t),r="ArrowFunctionExpression"===i.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd)
if(this.checkExpressionErrors(t)||r)return i
var n=this.parseSubscripts(i,e,s)
return t&&"MemberExpression"===n.type&&(t.parenthesizedAssign>=n.start&&(t.parenthesizedAssign=-1),t.parenthesizedBind>=n.start&&(t.parenthesizedBind=-1)),n},it.parseSubscripts=function(t,e,s,i){for(var r=this,n=this.options.ecmaVersion>=8&&"Identifier"===t.type&&"async"===t.name&&this.lastTokEnd==t.end&&!this.canInsertSemicolon()&&"async"===this.input.slice(t.start,t.end),a=void 0;;)if((a=r.eat(O.bracketL))||r.eat(O.dot)){var o=r.startNodeAt(e,s)
o.object=t,o.property=a?r.parseExpression():r.parseIdent(!0),o.computed=!!a,a&&r.expect(O.bracketR),t=r.finishNode(o,"MemberExpression")}else if(!i&&r.eat(O.parenL)){var h=new f,p=r.yieldPos,c=r.awaitPos
r.yieldPos=0,r.awaitPos=0
var u=r.parseExprList(O.parenR,r.options.ecmaVersion>=8,!1,h)
if(n&&!r.canInsertSemicolon()&&r.eat(O.arrow))return r.checkPatternErrors(h,!1),r.checkYieldAwaitInDefaultParams(),r.yieldPos=p,r.awaitPos=c,r.parseArrowExpression(r.startNodeAt(e,s),u,!0)
r.checkExpressionErrors(h,!0),r.yieldPos=p||r.yieldPos,r.awaitPos=c||r.awaitPos
var l=r.startNodeAt(e,s)
l.callee=t,l.arguments=u,t=r.finishNode(l,"CallExpression")}else{if(r.type!==O.backQuote)return t
var d=r.startNodeAt(e,s)
d.tag=t,d.quasi=r.parseTemplate({isTagged:!0}),t=r.finishNode(d,"TaggedTemplateExpression")}},it.parseExprAtom=function(t){var e,s=this.potentialArrowAt==this.start
switch(this.type){case O._super:return this.inFunction||this.raise(this.start,"'super' outside of function or class"),e=this.startNode(),this.next(),this.type!==O.dot&&this.type!==O.bracketL&&this.type!==O.parenL&&this.unexpected(),this.finishNode(e,"Super")
case O._this:return e=this.startNode(),this.next(),this.finishNode(e,"ThisExpression")
case O.name:var i=this.start,r=this.startLoc,n=this.containsEsc,a=this.parseIdent(this.type!==O.name)
if(this.options.ecmaVersion>=8&&!n&&"async"===a.name&&!this.canInsertSemicolon()&&this.eat(O._function))return this.parseFunction(this.startNodeAt(i,r),!1,!1,!0)
if(s&&!this.canInsertSemicolon()){if(this.eat(O.arrow))return this.parseArrowExpression(this.startNodeAt(i,r),[a],!1)
if(this.options.ecmaVersion>=8&&"async"===a.name&&this.type===O.name&&!n)return a=this.parseIdent(),!this.canInsertSemicolon()&&this.eat(O.arrow)||this.unexpected(),this.parseArrowExpression(this.startNodeAt(i,r),[a],!0)}return a
case O.regexp:var o=this.value
return e=this.parseLiteral(o.value),e.regex={pattern:o.pattern,flags:o.flags},e
case O.num:case O.string:return this.parseLiteral(this.value)
case O._null:case O._true:case O._false:return e=this.startNode(),e.value=this.type===O._null?null:this.type===O._true,e.raw=this.type.keyword,this.next(),this.finishNode(e,"Literal")
case O.parenL:var h=this.start,p=this.parseParenAndDistinguishExpression(s)
return t&&(t.parenthesizedAssign<0&&!this.isSimpleAssignTarget(p)&&(t.parenthesizedAssign=h),t.parenthesizedBind<0&&(t.parenthesizedBind=h)),p
case O.bracketL:return e=this.startNode(),this.next(),e.elements=this.parseExprList(O.bracketR,!0,!0,t),this.finishNode(e,"ArrayExpression")
case O.braceL:return this.parseObj(!1,t)
case O._function:return e=this.startNode(),this.next(),this.parseFunction(e,!1)
case O._class:return this.parseClass(this.startNode(),!1)
case O._new:return this.parseNew()
case O.backQuote:return this.parseTemplate()
default:this.unexpected()}},it.parseLiteral=function(t){var e=this.startNode()
return e.value=t,e.raw=this.input.slice(this.start,this.end),this.next(),this.finishNode(e,"Literal")},it.parseParenExpression=function(){this.expect(O.parenL)
var t=this.parseExpression()
return this.expect(O.parenR),t},it.parseParenAndDistinguishExpression=function(t){var e,s=this,i=this.start,r=this.startLoc,n=this.options.ecmaVersion>=8
if(this.options.ecmaVersion>=6){this.next()
var a,o=this.start,h=this.startLoc,p=[],c=!0,u=!1,l=new f,d=this.yieldPos,m=this.awaitPos
for(this.yieldPos=0,this.awaitPos=0;this.type!==O.parenR;){if(c?c=!1:s.expect(O.comma),n&&s.afterTrailingComma(O.parenR,!0)){u=!0
break}if(s.type===O.ellipsis){a=s.start,p.push(s.parseParenItem(s.parseRestBinding())),s.type===O.comma&&s.raise(s.start,"Comma is not permitted after the rest element")
break}p.push(s.parseMaybeAssign(!1,l,s.parseParenItem))}var x=this.start,y=this.startLoc
if(this.expect(O.parenR),t&&!this.canInsertSemicolon()&&this.eat(O.arrow))return this.checkPatternErrors(l,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=d,this.awaitPos=m,this.parseParenArrowList(i,r,p)
p.length&&!u||this.unexpected(this.lastTokStart),a&&this.unexpected(a),this.checkExpressionErrors(l,!0),this.yieldPos=d||this.yieldPos,this.awaitPos=m||this.awaitPos,p.length>1?(e=this.startNodeAt(o,h),e.expressions=p,this.finishNodeAt(e,"SequenceExpression",x,y)):e=p[0]}else e=this.parseParenExpression()
if(this.options.preserveParens){var v=this.startNodeAt(i,r)
return v.expression=e,this.finishNode(v,"ParenthesizedExpression")}return e},it.parseParenItem=function(t){return t},it.parseParenArrowList=function(t,e,s){return this.parseArrowExpression(this.startNodeAt(t,e),s)}
var rt=[]
it.parseNew=function(){var t=this.startNode(),e=this.parseIdent(!0)
if(this.options.ecmaVersion>=6&&this.eat(O.dot)){t.meta=e
var s=this.containsEsc
return t.property=this.parseIdent(!0),("target"!==t.property.name||s)&&this.raiseRecoverable(t.property.start,"The only valid meta property for new is new.target"),this.inFunction||this.raiseRecoverable(t.start,"new.target can only be used in functions"),this.finishNode(t,"MetaProperty")}var i=this.start,r=this.startLoc
return t.callee=this.parseSubscripts(this.parseExprAtom(),i,r,!0),this.eat(O.parenL)?t.arguments=this.parseExprList(O.parenR,this.options.ecmaVersion>=8,!1):t.arguments=rt,this.finishNode(t,"NewExpression")},it.parseTemplateElement=function(t){var e=t.isTagged,s=this.startNode()
return this.type===O.invalidTemplate?(e||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),s.value={raw:this.value,cooked:null}):s.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value},this.next(),s.tail=this.type===O.backQuote,this.finishNode(s,"TemplateElement")},it.parseTemplate=function(t){var e=this
void 0===t&&(t={})
var s=t.isTagged
void 0===s&&(s=!1)
var i=this.startNode()
this.next(),i.expressions=[]
var r=this.parseTemplateElement({isTagged:s})
for(i.quasis=[r];!r.tail;)e.expect(O.dollarBraceL),i.expressions.push(e.parseExpression()),e.expect(O.braceR),i.quasis.push(r=e.parseTemplateElement({isTagged:s}))
return this.next(),this.finishNode(i,"TemplateLiteral")},it.isAsyncProp=function(t){return!t.computed&&"Identifier"===t.key.type&&"async"===t.key.name&&(this.type===O.name||this.type===O.num||this.type===O.string||this.type===O.bracketL||this.type.keyword)&&!F.test(this.input.slice(this.lastTokEnd,this.start))},it.parseObj=function(t,e){var s=this,i=this.startNode(),r=!0,n={}
for(i.properties=[],this.next();!this.eat(O.braceR);){if(r)r=!1
else if(s.expect(O.comma),s.afterTrailingComma(O.braceR))break
var a=s.parseProperty(t,e)
t||s.checkPropClash(a,n,e),i.properties.push(a)}return this.finishNode(i,t?"ObjectPattern":"ObjectExpression")},it.parseProperty=function(t,e){var s,i,r,n,a=this.startNode()
this.options.ecmaVersion>=6&&(a.method=!1,a.shorthand=!1,(t||e)&&(r=this.start,n=this.startLoc),t||(s=this.eat(O.star)))
var o=this.containsEsc
return this.parsePropertyName(a),!t&&!o&&this.options.ecmaVersion>=8&&!s&&this.isAsyncProp(a)?(i=!0,this.parsePropertyName(a,e)):i=!1,this.parsePropertyValue(a,t,s,i,r,n,e,o),this.finishNode(a,"Property")},it.parsePropertyValue=function(t,e,s,i,r,n,a,o){if((s||i)&&this.type===O.colon&&this.unexpected(),this.eat(O.colon))t.value=e?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,a),t.kind="init"
else if(this.options.ecmaVersion>=6&&this.type===O.parenL)e&&this.unexpected(),t.kind="init",t.method=!0,t.value=this.parseMethod(s,i)
else if(e||o||!(this.options.ecmaVersion>=5)||t.computed||"Identifier"!==t.key.type||"get"!==t.key.name&&"set"!==t.key.name||this.type==O.comma||this.type==O.braceR)this.options.ecmaVersion>=6&&!t.computed&&"Identifier"===t.key.type?(this.checkUnreserved(t.key),t.kind="init",e?t.value=this.parseMaybeDefault(r,n,t.key):this.type===O.eq&&a?(a.shorthandAssign<0&&(a.shorthandAssign=this.start),t.value=this.parseMaybeDefault(r,n,t.key)):t.value=t.key,t.shorthand=!0):this.unexpected()
else{(s||i)&&this.unexpected(),t.kind=t.key.name,this.parsePropertyName(t),t.value=this.parseMethod(!1)
var h="get"===t.kind?0:1
if(t.value.params.length!==h){var p=t.value.start
"get"===t.kind?this.raiseRecoverable(p,"getter should have no params"):this.raiseRecoverable(p,"setter should have exactly one param")}else"set"===t.kind&&"RestElement"===t.value.params[0].type&&this.raiseRecoverable(t.value.params[0].start,"Setter cannot use rest params")}},it.parsePropertyName=function(t){if(this.options.ecmaVersion>=6){if(this.eat(O.bracketL))return t.computed=!0,t.key=this.parseMaybeAssign(),this.expect(O.bracketR),t.key
t.computed=!1}return t.key=this.type===O.num||this.type===O.string?this.parseExprAtom():this.parseIdent(!0)},it.initFunction=function(t){t.id=null,this.options.ecmaVersion>=6&&(t.generator=!1,t.expression=!1),this.options.ecmaVersion>=8&&(t.async=!1)},it.parseMethod=function(t,e){var s=this.startNode(),i=this.inGenerator,r=this.inAsync,n=this.yieldPos,a=this.awaitPos,o=this.inFunction
return this.initFunction(s),this.options.ecmaVersion>=6&&(s.generator=t),this.options.ecmaVersion>=8&&(s.async=!!e),this.inGenerator=s.generator,this.inAsync=s.async,this.yieldPos=0,this.awaitPos=0,this.inFunction=!0,this.enterFunctionScope(),this.expect(O.parenL),s.params=this.parseBindingList(O.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(s,!1),this.inGenerator=i,this.inAsync=r,this.yieldPos=n,this.awaitPos=a,this.inFunction=o,this.finishNode(s,"FunctionExpression")},it.parseArrowExpression=function(t,e,s){var i=this.inGenerator,r=this.inAsync,n=this.yieldPos,a=this.awaitPos,o=this.inFunction
return this.enterFunctionScope(),this.initFunction(t),this.options.ecmaVersion>=8&&(t.async=!!s),this.inGenerator=!1,this.inAsync=t.async,this.yieldPos=0,this.awaitPos=0,this.inFunction=!0,t.params=this.toAssignableList(e,!0),this.parseFunctionBody(t,!0),this.inGenerator=i,this.inAsync=r,this.yieldPos=n,this.awaitPos=a,this.inFunction=o,this.finishNode(t,"ArrowFunctionExpression")},it.parseFunctionBody=function(t,e){var s=e&&this.type!==O.braceL,i=this.strict,r=!1
if(s)t.body=this.parseMaybeAssign(),t.expression=!0,this.checkParams(t,!1)
else{var n=this.options.ecmaVersion>=7&&!this.isSimpleParamList(t.params)
i&&!n||(r=this.strictDirective(this.end))&&n&&this.raiseRecoverable(t.start,"Illegal 'use strict' directive in function with non-simple parameter list")
var a=this.labels
this.labels=[],r&&(this.strict=!0),this.checkParams(t,!i&&!r&&!e&&this.isSimpleParamList(t.params)),t.body=this.parseBlock(!1),t.expression=!1,this.adaptDirectivePrologue(t.body.body),this.labels=a}this.exitFunctionScope(),this.strict&&t.id&&this.checkLVal(t.id,"none"),this.strict=i},it.isSimpleParamList=function(t){for(var e=0,s=t;e<s.length;e+=1){if("Identifier"!==s[e].type)return!1}return!0},it.checkParams=function(t,e){for(var s=this,i={},r=0,n=t.params;r<n.length;r+=1){var a=n[r]
s.checkLVal(a,"var",e?null:i)}},it.parseExprList=function(t,e,s,i){for(var r=this,n=[],a=!0;!this.eat(t);){if(a)a=!1
else if(r.expect(O.comma),e&&r.afterTrailingComma(t))break
var o=void 0
s&&r.type===O.comma?o=null:r.type===O.ellipsis?(o=r.parseSpread(i),i&&r.type===O.comma&&i.trailingComma<0&&(i.trailingComma=r.start)):o=r.parseMaybeAssign(!1,i),n.push(o)}return n},it.checkUnreserved=function(t){var e=t.start,s=t.end,i=t.name
if(this.inGenerator&&"yield"===i&&this.raiseRecoverable(e,"Can not use 'yield' as identifier inside a generator"),this.inAsync&&"await"===i&&this.raiseRecoverable(e,"Can not use 'await' as identifier inside an async function"),this.isKeyword(i)&&this.raise(e,"Unexpected keyword '"+i+"'"),!(this.options.ecmaVersion<6&&-1!=this.input.slice(e,s).indexOf("\\"))){(this.strict?this.reservedWordsStrict:this.reservedWords).test(i)&&(this.inAsync||"await"!==i||this.raiseRecoverable(e,"Can not use keyword 'await' outside an async function"),this.raiseRecoverable(e,"The keyword '"+i+"' is reserved"))}},it.parseIdent=function(t,e){var s=this.startNode()
return t&&"never"==this.options.allowReserved&&(t=!1),this.type===O.name?s.name=this.value:this.type.keyword?(s.name=this.type.keyword,"class"!==s.name&&"function"!==s.name||this.lastTokEnd===this.lastTokStart+1&&46===this.input.charCodeAt(this.lastTokStart)||this.context.pop()):this.unexpected(),this.next(),this.finishNode(s,"Identifier"),t||this.checkUnreserved(s),s},it.parseYield=function(){this.yieldPos||(this.yieldPos=this.start)
var t=this.startNode()
return this.next(),this.type==O.semi||this.canInsertSemicolon()||this.type!=O.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(O.star),t.argument=this.parseMaybeAssign()),this.finishNode(t,"YieldExpression")},it.parseAwait=function(){this.awaitPos||(this.awaitPos=this.start)
var t=this.startNode()
return this.next(),t.argument=this.parseMaybeUnary(null,!0),this.finishNode(t,"AwaitExpression")}
var nt=H.prototype
nt.raise=function(t,e){var s=c(this.input,t)
e+=" ("+s.line+":"+s.column+")"
var i=new SyntaxError(e)
throw i.pos=t,i.loc=s,i.raisedAt=this.pos,i},nt.raiseRecoverable=nt.raise,nt.curPosition=function(){if(this.options.locations)return new J(this.curLine,this.pos-this.lineStart)}
var at=H.prototype,ot=Object.assign||function(t){for(var e=[],s=arguments.length-1;s-- >0;)e[s]=arguments[s+1]
for(var i=0,r=e;i<r.length;i+=1){var n=r[i]
for(var a in n)p(n,a)&&(t[a]=n[a])}return t}
at.enterFunctionScope=function(){this.scopeStack.push({var:{},lexical:{},childVar:{},parentLexical:{}})},at.exitFunctionScope=function(){this.scopeStack.pop()},at.enterLexicalScope=function(){var t=this.scopeStack[this.scopeStack.length-1],e={var:{},lexical:{},childVar:{},parentLexical:{}}
this.scopeStack.push(e),ot(e.parentLexical,t.lexical,t.parentLexical)},at.exitLexicalScope=function(){var t=this.scopeStack.pop(),e=this.scopeStack[this.scopeStack.length-1]
ot(e.childVar,t.var,t.childVar)},at.canDeclareVarName=function(t){var e=this.scopeStack[this.scopeStack.length-1]
return!p(e.lexical,t)&&!p(e.parentLexical,t)},at.canDeclareLexicalName=function(t){var e=this.scopeStack[this.scopeStack.length-1]
return!p(e.lexical,t)&&!p(e.var,t)&&!p(e.childVar,t)},at.declareVarName=function(t){this.scopeStack[this.scopeStack.length-1].var[t]=!0},at.declareLexicalName=function(t){this.scopeStack[this.scopeStack.length-1].lexical[t]=!0}
var ht=function(t,e,s){this.type="",this.start=e,this.end=0,t.options.locations&&(this.loc=new W(t,s)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[e,0])},pt=H.prototype
pt.startNode=function(){return new ht(this,this.start,this.startLoc)},pt.startNodeAt=function(t,e){return new ht(this,t,e)},pt.finishNode=function(t,e){return m.call(this,t,e,this.lastTokEnd,this.lastTokEndLoc)},pt.finishNodeAt=function(t,e,s,i){return m.call(this,t,e,s,i)}
var ct=function(t,e,s,i,r){this.token=t,this.isExpr=!!e,this.preserveSpace=!!s,this.override=i,this.generator=!!r},ut={b_stat:new ct("{",!1),b_expr:new ct("{",!0),b_tmpl:new ct("${",!1),p_stat:new ct("(",!1),p_expr:new ct("(",!0),q_tmpl:new ct("`",!0,!0,function(t){return t.tryReadTemplateToken()}),f_stat:new ct("function",!1),f_expr:new ct("function",!0),f_expr_gen:new ct("function",!0,!1,null,!0),f_gen:new ct("function",!1,!1,null,!0)},lt=H.prototype
lt.initialContext=function(){return[ut.b_stat]},lt.braceIsBlock=function(t){var e=this.curContext()
return e===ut.f_expr||e===ut.f_stat||(t!==O.colon||e!==ut.b_stat&&e!==ut.b_expr?t===O._return||t==O.name&&this.exprAllowed?F.test(this.input.slice(this.lastTokEnd,this.start)):t===O._else||t===O.semi||t===O.eof||t===O.parenR||t==O.arrow||(t==O.braceL?e===ut.b_stat:t!=O._var&&t!=O.name&&!this.exprAllowed):!e.isExpr)},lt.inGeneratorContext=function(){for(var t=this,e=this.context.length-1;e>=1;e--){var s=t.context[e]
if("function"===s.token)return s.generator}return!1},lt.updateContext=function(t){var e,s=this.type
s.keyword&&t==O.dot?this.exprAllowed=!1:(e=s.updateContext)?e.call(this,t):this.exprAllowed=s.beforeExpr},O.parenR.updateContext=O.braceR.updateContext=function(){if(1==this.context.length)return void(this.exprAllowed=!0)
var t=this.context.pop()
t===ut.b_stat&&"function"===this.curContext().token&&(t=this.context.pop()),this.exprAllowed=!t.isExpr},O.braceL.updateContext=function(t){this.context.push(this.braceIsBlock(t)?ut.b_stat:ut.b_expr),this.exprAllowed=!0},O.dollarBraceL.updateContext=function(){this.context.push(ut.b_tmpl),this.exprAllowed=!0},O.parenL.updateContext=function(t){var e=t===O._if||t===O._for||t===O._with||t===O._while
this.context.push(e?ut.p_stat:ut.p_expr),this.exprAllowed=!0},O.incDec.updateContext=function(){},O._function.updateContext=O._class.updateContext=function(t){t.beforeExpr&&t!==O.semi&&t!==O._else&&(t!==O.colon&&t!==O.braceL||this.curContext()!==ut.b_stat)?this.context.push(ut.f_expr):this.context.push(ut.f_stat),this.exprAllowed=!1},O.backQuote.updateContext=function(){this.curContext()===ut.q_tmpl?this.context.pop():this.context.push(ut.q_tmpl),this.exprAllowed=!1},O.star.updateContext=function(t){if(t==O._function){var e=this.context.length-1
this.context[e]===ut.f_expr?this.context[e]=ut.f_expr_gen:this.context[e]=ut.f_gen}this.exprAllowed=!0},O.name.updateContext=function(t){var e=!1
this.options.ecmaVersion>=6&&("of"==this.value&&!this.exprAllowed||"yield"==this.value&&this.inGeneratorContext())&&(e=!0),this.exprAllowed=e}
var dt=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new W(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},ft=H.prototype,mt="object"==typeof Packages&&"[object JavaPackage]"==Object.prototype.toString.call(Packages)
ft.next=function(){this.options.onToken&&this.options.onToken(new dt(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},ft.getToken=function(){return this.next(),new dt(this)},"undefined"!=typeof Symbol&&(ft[Symbol.iterator]=function(){var t=this
return{next:function(){var e=t.getToken()
return{done:e.type===O.eof,value:e}}}}),ft.curContext=function(){return this.context[this.context.length-1]},ft.nextToken=function(){var t=this.curContext()
return t&&t.preserveSpace||this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length?this.finishToken(O.eof):t.override?t.override(this):void this.readToken(this.fullCharCodeAtPos())},ft.readToken=function(t){return r(t,this.options.ecmaVersion>=6)||92===t?this.readWord():this.getTokenFromCode(t)},ft.fullCharCodeAtPos=function(){var t=this.input.charCodeAt(this.pos)
return t<=55295||t>=57344?t:(t<<10)+this.input.charCodeAt(this.pos+1)-56613888},ft.skipBlockComment=function(){var t=this,e=this.options.onComment&&this.curPosition(),s=this.pos,i=this.input.indexOf("*/",this.pos+=2)
if(-1===i&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations){M.lastIndex=s
for(var r;(r=M.exec(this.input))&&r.index<this.pos;)++t.curLine,t.lineStart=r.index+r[0].length}this.options.onComment&&this.options.onComment(!0,this.input.slice(s+2,i),s,this.pos,e,this.curPosition())},ft.skipLineComment=function(t){for(var e=this,s=this.pos,i=this.options.onComment&&this.curPosition(),r=this.input.charCodeAt(this.pos+=t);this.pos<this.input.length&&!h(r);)r=e.input.charCodeAt(++e.pos)
this.options.onComment&&this.options.onComment(!1,this.input.slice(s+t,this.pos),s,this.pos,i,this.curPosition())},ft.skipSpace=function(){var t=this
t:for(;this.pos<this.input.length;){var e=t.input.charCodeAt(t.pos)
switch(e){case 32:case 160:++t.pos
break
case 13:10===t.input.charCodeAt(t.pos+1)&&++t.pos
case 10:case 8232:case 8233:++t.pos,t.options.locations&&(++t.curLine,t.lineStart=t.pos)
break
case 47:switch(t.input.charCodeAt(t.pos+1)){case 42:t.skipBlockComment()
break
case 47:t.skipLineComment(2)
break
default:break t}break
default:if(!(e>8&&e<14||e>=5760&&D.test(String.fromCharCode(e))))break t;++t.pos}}},ft.finishToken=function(t,e){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition())
var s=this.type
this.type=t,this.value=e,this.updateContext(s)},ft.readToken_dot=function(){var t=this.input.charCodeAt(this.pos+1)
if(t>=48&&t<=57)return this.readNumber(!0)
var e=this.input.charCodeAt(this.pos+2)
return this.options.ecmaVersion>=6&&46===t&&46===e?(this.pos+=3,this.finishToken(O.ellipsis)):(++this.pos,this.finishToken(O.dot))},ft.readToken_slash=function(){var t=this.input.charCodeAt(this.pos+1)
return this.exprAllowed?(++this.pos,this.readRegexp()):61===t?this.finishOp(O.assign,2):this.finishOp(O.slash,1)},ft.readToken_mult_modulo_exp=function(t){var e=this.input.charCodeAt(this.pos+1),s=1,i=42===t?O.star:O.modulo
return this.options.ecmaVersion>=7&&42==t&&42===e&&(++s,i=O.starstar,e=this.input.charCodeAt(this.pos+2)),61===e?this.finishOp(O.assign,s+1):this.finishOp(i,s)},ft.readToken_pipe_amp=function(t){var e=this.input.charCodeAt(this.pos+1)
return e===t?this.finishOp(124===t?O.logicalOR:O.logicalAND,2):61===e?this.finishOp(O.assign,2):this.finishOp(124===t?O.bitwiseOR:O.bitwiseAND,1)},ft.readToken_caret=function(){return 61===this.input.charCodeAt(this.pos+1)?this.finishOp(O.assign,2):this.finishOp(O.bitwiseXOR,1)},ft.readToken_plus_min=function(t){var e=this.input.charCodeAt(this.pos+1)
return e===t?45!=e||this.inModule||62!=this.input.charCodeAt(this.pos+2)||0!==this.lastTokEnd&&!F.test(this.input.slice(this.lastTokEnd,this.pos))?this.finishOp(O.incDec,2):(this.skipLineComment(3),this.skipSpace(),this.nextToken()):61===e?this.finishOp(O.assign,2):this.finishOp(O.plusMin,1)},ft.readToken_lt_gt=function(t){var e=this.input.charCodeAt(this.pos+1),s=1
return e===t?(s=62===t&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+s)?this.finishOp(O.assign,s+1):this.finishOp(O.bitShift,s)):33!=e||60!=t||this.inModule||45!=this.input.charCodeAt(this.pos+2)||45!=this.input.charCodeAt(this.pos+3)?(61===e&&(s=2),this.finishOp(O.relational,s)):(this.skipLineComment(4),this.skipSpace(),this.nextToken())},ft.readToken_eq_excl=function(t){var e=this.input.charCodeAt(this.pos+1)
return 61===e?this.finishOp(O.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===t&&62===e&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(O.arrow)):this.finishOp(61===t?O.eq:O.prefix,1)},ft.getTokenFromCode=function(t){switch(t){case 46:return this.readToken_dot()
case 40:return++this.pos,this.finishToken(O.parenL)
case 41:return++this.pos,this.finishToken(O.parenR)
case 59:return++this.pos,this.finishToken(O.semi)
case 44:return++this.pos,this.finishToken(O.comma)
case 91:return++this.pos,this.finishToken(O.bracketL)
case 93:return++this.pos,this.finishToken(O.bracketR)
case 123:return++this.pos,this.finishToken(O.braceL)
case 125:return++this.pos,this.finishToken(O.braceR)
case 58:return++this.pos,this.finishToken(O.colon)
case 63:return++this.pos,this.finishToken(O.question)
case 96:if(this.options.ecmaVersion<6)break
return++this.pos,this.finishToken(O.backQuote)
case 48:var e=this.input.charCodeAt(this.pos+1)
if(120===e||88===e)return this.readRadixNumber(16)
if(this.options.ecmaVersion>=6){if(111===e||79===e)return this.readRadixNumber(8)
if(98===e||66===e)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1)
case 34:case 39:return this.readString(t)
case 47:return this.readToken_slash()
case 37:case 42:return this.readToken_mult_modulo_exp(t)
case 124:case 38:return this.readToken_pipe_amp(t)
case 94:return this.readToken_caret()
case 43:case 45:return this.readToken_plus_min(t)
case 60:case 62:return this.readToken_lt_gt(t)
case 61:case 33:return this.readToken_eq_excl(t)
case 126:return this.finishOp(O.prefix,1)}this.raise(this.pos,"Unexpected character '"+y(t)+"'")},ft.finishOp=function(t,e){var s=this.input.slice(this.pos,this.pos+e)
return this.pos+=e,this.finishToken(t,s)}
var xt=!!x("￿","u")
ft.readRegexp=function(){for(var t,e,s=this,i=this.pos;;){s.pos>=s.input.length&&s.raise(i,"Unterminated regular expression")
var r=s.input.charAt(s.pos)
if(F.test(r)&&s.raise(i,"Unterminated regular expression"),t)t=!1
else{if("["===r)e=!0
else if("]"===r&&e)e=!1
else if("/"===r&&!e)break
t="\\"===r}++s.pos}var n=this.input.slice(i,this.pos);++this.pos
var a=this.readWord1(),o=n,h=""
if(a){var p=/^[gim]*$/
this.options.ecmaVersion>=6&&(p=/^[gimuy]*$/),this.options.ecmaVersion>=9&&(p=/^[gimsuy]*$/),p.test(a)||this.raise(i,"Invalid regular expression flag"),a.indexOf("u")>=0&&(xt?h="u":(o=o.replace(/\\u\{([0-9a-fA-F]+)\}/g,function(t,e,r){return e=Number("0x"+e),e>1114111&&s.raise(i+r+3,"Code point out of bounds"),"x"}),o=o.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"),h=h.replace("u","")))}var c=null
return mt||(x(o,h,i,this),c=x(n,a)),this.finishToken(O.regexp,{pattern:n,flags:a,value:c})},ft.readInt=function(t,e){for(var s=this,i=this.pos,r=0,n=0,a=null==e?1/0:e;n<a;++n){var o=s.input.charCodeAt(s.pos),h=void 0
if((h=o>=97?o-97+10:o>=65?o-65+10:o>=48&&o<=57?o-48:1/0)>=t)break;++s.pos,r=r*t+h}return this.pos===i||null!=e&&this.pos-i!==e?null:r},ft.readRadixNumber=function(t){this.pos+=2
var e=this.readInt(t)
return null==e&&this.raise(this.start+2,"Expected number in radix "+t),r(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(O.num,e)},ft.readNumber=function(t){var e=this.pos
t||null!==this.readInt(10)||this.raise(e,"Invalid number")
var s=this.pos-e>=2&&48===this.input.charCodeAt(e)
s&&this.strict&&this.raise(e,"Invalid number"),s&&/[89]/.test(this.input.slice(e,this.pos))&&(s=!1)
var i=this.input.charCodeAt(this.pos)
46!==i||s||(++this.pos,this.readInt(10),i=this.input.charCodeAt(this.pos)),69!==i&&101!==i||s||(i=this.input.charCodeAt(++this.pos),43!==i&&45!==i||++this.pos,null===this.readInt(10)&&this.raise(e,"Invalid number")),r(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number")
var n=this.input.slice(e,this.pos),a=s?parseInt(n,8):parseFloat(n)
return this.finishToken(O.num,a)},ft.readCodePoint=function(){var t,e=this.input.charCodeAt(this.pos)
if(123===e){this.options.ecmaVersion<6&&this.unexpected()
var s=++this.pos
t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(s,"Code point out of bounds")}else t=this.readHexChar(4)
return t},ft.readString=function(t){for(var e=this,s="",i=++this.pos;;){e.pos>=e.input.length&&e.raise(e.start,"Unterminated string constant")
var r=e.input.charCodeAt(e.pos)
if(r===t)break
92===r?(s+=e.input.slice(i,e.pos),s+=e.readEscapedChar(!1),i=e.pos):(h(r)&&e.raise(e.start,"Unterminated string constant"),++e.pos)}return s+=this.input.slice(i,this.pos++),this.finishToken(O.string,s)}
var yt={}
ft.tryReadTemplateToken=function(){this.inTemplateElement=!0
try{this.readTmplToken()}catch(t){if(t!==yt)throw t
this.readInvalidTemplateToken()}this.inTemplateElement=!1},ft.invalidStringToken=function(t,e){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw yt
this.raise(t,e)},ft.readTmplToken=function(){for(var t=this,e="",s=this.pos;;){t.pos>=t.input.length&&t.raise(t.start,"Unterminated template")
var i=t.input.charCodeAt(t.pos)
if(96===i||36===i&&123===t.input.charCodeAt(t.pos+1))return t.pos!==t.start||t.type!==O.template&&t.type!==O.invalidTemplate?(e+=t.input.slice(s,t.pos),t.finishToken(O.template,e)):36===i?(t.pos+=2,t.finishToken(O.dollarBraceL)):(++t.pos,t.finishToken(O.backQuote))
if(92===i)e+=t.input.slice(s,t.pos),e+=t.readEscapedChar(!0),s=t.pos
else if(h(i)){switch(e+=t.input.slice(s,t.pos),++t.pos,i){case 13:10===t.input.charCodeAt(t.pos)&&++t.pos
case 10:e+="\n"
break
default:e+=String.fromCharCode(i)}t.options.locations&&(++t.curLine,t.lineStart=t.pos),s=t.pos}else++t.pos}},ft.readInvalidTemplateToken=function(){for(var t=this;this.pos<this.input.length;this.pos++)switch(t.input[t.pos]){case"\\":++t.pos
break
case"$":if("{"!==t.input[t.pos+1])break
case"`":return t.finishToken(O.invalidTemplate,t.input.slice(t.start,t.pos))}this.raise(this.start,"Unterminated template")},ft.readEscapedChar=function(t){var e=this.input.charCodeAt(++this.pos)
switch(++this.pos,e){case 110:return"\n"
case 114:return"\r"
case 120:return String.fromCharCode(this.readHexChar(2))
case 117:return y(this.readCodePoint())
case 116:return"\t"
case 98:return"\b"
case 118:return"\v"
case 102:return"\f"
case 13:10===this.input.charCodeAt(this.pos)&&++this.pos
case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),""
default:if(e>=48&&e<=55){var s=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],i=parseInt(s,8)
return i>255&&(s=s.slice(0,-1),i=parseInt(s,8)),"0"!==s&&(this.strict||t)&&this.invalidStringToken(this.pos-2,"Octal literal in strict mode"),this.pos+=s.length-1,String.fromCharCode(i)}return String.fromCharCode(e)}},ft.readHexChar=function(t){var e=this.pos,s=this.readInt(16,t)
return null===s&&this.invalidStringToken(e,"Bad character escape sequence"),s},ft.readWord1=function(){var t=this
this.containsEsc=!1
for(var e="",s=!0,i=this.pos,a=this.options.ecmaVersion>=6;this.pos<this.input.length;){var o=t.fullCharCodeAtPos()
if(n(o,a))t.pos+=o<=65535?1:2
else{if(92!==o)break
t.containsEsc=!0,e+=t.input.slice(i,t.pos)
var h=t.pos
117!=t.input.charCodeAt(++t.pos)&&t.invalidStringToken(t.pos,"Expecting Unicode escape sequence \\uXXXX"),++t.pos
var p=t.readCodePoint();(s?r:n)(p,a)||t.invalidStringToken(h,"Invalid Unicode escape"),e+=y(p),i=t.pos}s=!1}return e+this.input.slice(i,this.pos)},ft.readWord=function(){var t=this.readWord1(),e=O.name
return this.keywords.test(t)&&(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+t),e=V[t]),this.finishToken(e,t)}
var vt,gt,bt,kt="5.3.0"},function(e,s){e.exports=t},function(t,e,s){"use strict"
function i(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function r(t){switch(void 0===t?"undefined":a(t)){case"string":return t.split(";").filter(function(t){return t}).reduce(function(t,e){var s=e.slice(0,e.indexOf(":")).trim(),r=e.slice(e.indexOf(":")+1).trim()
return n({},t,i({},(0,h.default)(s),r))},{})
case"object":return t
default:return}}Object.defineProperty(e,"__esModule",{value:!0})
var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]
for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])}return t},a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t}
e.default=r
var o=s(7),h=function(t){return t&&t.__esModule?t:{default:t}}(o)},function(t,e,s){"use strict"
function i(t){return t.replace(/([A-Z])([A-Z])/g,"$1 $2").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[^a-zA-Z\u00C0-\u00ff]/g," ").toLowerCase().split(" ").filter(function(t){return t}).map(function(t,e){return e>0?t[0].toUpperCase()+t.slice(1):t}).join("")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},function(t,e,s){"use strict"
function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,s=String(t),i=0
return s.split("").forEach(function(t){i=(i<<5)-i+t.charCodeAt(0),i&=i}),Math.abs(i).toString(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i
e.randomHash=function(){return i(Math.random().toString())}},function(t,e,s){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default={class:"className",for:"htmlFor",maxlength:"maxLength",colspan:"colSpan",rowspan:"rowSpan"}},function(t,e,s){"use strict"
function i(t){return-1===n.indexOf(t.toLowerCase())}function r(t){return-1!==a.indexOf(t.toLowerCase())}Object.defineProperty(e,"__esModule",{value:!0}),e.canHaveChildren=i,e.canHaveWhitespace=r
var n=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"],a=["table","tbody","tfoot","thead","tr"]
e.default=n}])})


/***/ }),

/***/ "qcZZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _isNan = __webpack_require__("MICi");

var _isNan2 = _interopRequireDefault(_isNan);

var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _bound = __webpack_require__("zHJr");

var _bound2 = _interopRequireDefault(_bound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

var TYPES = [
// Strings
'text', 'multiline',
// Checkboxes
'boolean',
// Numbers
'number', 'slider'];

var Editable = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(Editable, _React$Component);

  function Editable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Editable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Editable.__proto__ || (0, _getPrototypeOf2.default)(Editable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      editing: false,
      resetValue: _this.props.value
    }, _this.getEditorType = function () {
      var value = _this.props.value;
      var type = _this.props.type;


      if (type !== undefined && TYPES.includes(type)) return type;

      type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
      if (type === 'string') return value.includes('\n') ? 'multiline' : 'text';
      if (['boolean', 'number'].includes(type)) return type;

      return 'text';
    }, _this.resetChanges = function () {
      _this.props.onChange(_this.state.resetValue, _this.props.value);
      _this.handleToggleEditing();
    }, _this.createRefWithAutoFocus = function (editor) {
      _this.editor = editor;
      if (!editor) return;

      if (typeof editor.focus === 'function') editor.focus();
      if (_this.props.forceEditMode && typeof editor.setSelectionRange === 'function') {
        editor.setSelectionRange(editor.value.length, editor.value.length);
      }
    }, _this.handleChange = function (_ref2) {
      var target = _ref2.target;
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max;
      var value = target.value;

      // eslint-disable-next-line default-case

      switch (_this.getEditorType()) {
        case 'slider':
        case 'number':
          value = parseInt(value || 0, 10);
          // eslint-disable-next-line prefer-destructuring
          if ((0, _isNan2.default)(value)) value = _this.props.value;
          value = (0, _bound2.default)(value, { min: min, max: max });
      }
      _this.props.onChange(value, _this.state.resetValue);
    }, _this.handleKeys = function (event) {
      var target = event.target,
          key = event.key,
          ctrlKey = event.ctrlKey,
          metaKey = event.metaKey;


      if (key === 'Escape') _this.resetChanges();
      if (key === 'Enter') {
        if (target.nodeName !== 'TEXTAREA' || ctrlKey || metaKey) {
          _this.handleToggleEditing();
        }
      }
    }, _this.handleReceivingFocus = function () {
      if (_this.props.readonly) return;
      if (!_this.state.editing) _this.handleToggleEditing();
    }, _this.handleToggleEditing = function () {
      if (_this.props.readonly) return;

      var editing = !_this.editing;

      _this.setState({ editing: editing, resetValue: _this.props.value }, function () {
        if (_this.state.editing) {
          _this.props.onEditStart();
        } else {
          _this.props.onEditEnd();
        }
      });
    }, _this.selectOnFocus = function (event) {
      return event.target.select();
    }, _this.toggleBoolean = function () {
      _this.props.onEditStart();
      _this.props.onChange(!_this.props.value, _this.props.value);
      _this.props.onEditEnd();
    }, _this.renderBoolean = function () {
      return _react2.default.createElement('input', {
        type: 'checkbox',
        checked: Boolean(_this.props.value),
        disabled: _this.props.readonly,
        onChange: _this.toggleBoolean
      });
    }, _this.renderMultiline = function () {
      if (!_this.editing) {
        var lines = (_this.props.value || _this.props.placeholder).split('\n');
        var paragraphs = lines.map(function (line, index) {
          return _react2.default.createElement(
            'p',
            { key: index },
            line
          );
        });
        var className = ['multiline', _this.props.value ? '' : 'placeholder'].join(' ').trim();
        return _react2.default.createElement(
          'div',
          { className: className, onClick: _this.handleToggleEditing },
          paragraphs
        );
      }

      return _react2.default.createElement('textarea', {
        disabled: _this.props.readonly,
        onBlur: _this.handleToggleEditing,
        onChange: _this.handleChange,
        onFocus: _this.selectOnFocus,
        onKeyDown: _this.handleKeys,
        placeholder: _this.props.placeholder,
        ref: _this.createRefWithAutoFocus,
        rows: _this.props.value.split('\n').length,
        value: _this.props.value
      });
    }, _this.renderNumber = function () {
      if (!_this.editing) return _this.renderStatic();

      return _react2.default.createElement('input', {
        type: 'number',
        disabled: _this.props.readonly,
        max: _this.props.max,
        min: _this.props.min,
        onBlur: _this.handleToggleEditing,
        onChange: _this.handleChange,
        onFocus: _this.selectOnFocus,
        onKeyDown: _this.handleKeys,
        placeholder: _this.props.placeholder,
        ref: _this.createRefWithAutoFocus,
        step: _this.props.step,
        value: _this.props.value
      });
    }, _this.renderSlider = function () {
      return _react2.default.createElement('input', {
        type: 'range',
        disabled: _this.props.readonly,
        max: _this.props.max,
        min: _this.props.min,
        onBlur: _this.handleToggleEditing,
        onChange: _this.handleChange,
        ref: _this.createRefWithAutoFocus,
        step: _this.props.step,
        value: _this.props.value
      });
    }, _this.renderText = function () {
      if (!_this.editing) return _this.renderStatic();

      return _react2.default.createElement('input', {
        type: 'text',
        disabled: _this.props.readonly,
        onBlur: _this.handleToggleEditing,
        onChange: _this.handleChange,
        onFocus: _this.selectOnFocus,
        onKeyDown: _this.handleKeys,
        placeholder: _this.props.placeholder,
        ref: _this.createRefWithAutoFocus,
        value: _this.props.value
      });
    }, _this.renderStatic = function () {
      var showPlaceholder = _this.props.placeholder && !_this.props.value;
      var className = showPlaceholder ? 'placeholder' : '';
      return _react2.default.createElement(
        'span',
        { className: className, onClick: _this.handleToggleEditing },
        showPlaceholder ? _this.props.placeholder : _this.props.value
      );
    }, _this.renderEditor = function () {
      switch (_this.getEditorType()) {
        case 'boolean':
          return _this.renderBoolean();
        case 'slider':
          return _this.renderSlider();
        case 'multiline':
          return _this.renderMultiline();
        case 'number':
          return _this.renderNumber();
        default:
          return _this.renderText();
      }
    }, _this.render = function () {
      var _this$props2 = _this.props,
          className = _this$props2.className,
          readonly = _this$props2.readonly;


      var classes = ['editable', _this.editing ? 'editing' : '', className || '', readonly ? 'readonly' : ''].filter(Boolean);

      var props = {};
      if (!readonly && !_this.editing) {
        props = { tabIndex: '0', onFocus: _this.handleReceivingFocus };
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: classes.join(' ') }, props),
        _this.renderEditor()
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Editable, [{
    key: 'editing',
    get: function get() {
      return this.props.forceEditMode || this.state.editing;
    }
  }]);
  return Editable;
}(_react2.default.Component), _class.displayName = 'Editable', _class.defaultProps = {
  className: '',
  forceEditMode: false,
  max: undefined,
  min: undefined,
  onChange: noop,
  onEditStart: noop,
  onEditEnd: noop,
  placeholder: '',
  readonly: false,
  step: 1,
  type: undefined,
  value: ''
}, _temp2);
exports.default = Editable;

/***/ }),

/***/ "qio6":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("evD5");
var anObject = __webpack_require__("77Pl");
var getKeys = __webpack_require__("lktj");

module.exports = __webpack_require__("+E39") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "qkKv":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("FeBl");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "qrdl":
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "qwTf":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("TQ3y");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "qyJz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("+ZMJ");
var $export = __webpack_require__("kM2E");
var toObject = __webpack_require__("sB3e");
var call = __webpack_require__("msXi");
var isArrayIter = __webpack_require__("Mhyx");
var toLength = __webpack_require__("QRG4");
var createProperty = __webpack_require__("fBQ2");
var getIterFn = __webpack_require__("3fs2");

$export($export.S + $export.F * !__webpack_require__("dY0y")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "s67h":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _class2, _temp2;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("KC3J");

var _mobxReact = __webpack_require__("uva0");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = (0, _mobxReact.observer)(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3.default)(Navigation, _Component);

  function Navigation() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Navigation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Navigation.__proto__ || (0, _getPrototypeOf2.default)(Navigation)).call.apply(_ref, [this].concat(args))), _this), _this.renderMenuItem = function (_ref2) {
      var children = _ref2.children,
          text = _ref2.text,
          url = _ref2.url;

      var active = _this.props.current.pathname === url;

      return _react2.default.createElement(
        'li',
        { key: text, className: active ? 'is-current' : '' },
        !url || active ? _react2.default.createElement(
          'b',
          null,
          text
        ) : _react2.default.createElement(
          _reactRouterDom.Link,
          { to: url, tabIndex: '-1' },
          text
        ),
        children.length ? _react2.default.createElement(
          'ul',
          null,
          children.map(_this.renderMenuItem)
        ) : ''
      );
    }, _this.render = function () {
      return _react2.default.createElement(
        'ul',
        { className: 'navigation' },
        _this.props.menuItems.map(_this.renderMenuItem)
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return Navigation;
}(_react.Component), _class2.defaultProps = {
  menuItems: [],
  current: {}
}, _temp2)) || _class;

exports.default = Navigation;

/***/ }),

/***/ "s96k":
/***/ (function(module, exports) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ "sB3e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("52gC");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "sBat":
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__("kxzG");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),

/***/ "sF+V":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("kM2E");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__("Yobk") });


/***/ }),

/***/ "sJvV":
/***/ (function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),

/***/ "sTP2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__("Gu7T");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__("Zx67");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = __webpack_require__("Jmof");

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__("uva0");

var _unique = __webpack_require__("lMsm");

var _unique2 = _interopRequireDefault(_unique);

var _ArticleChildren = __webpack_require__("Mzvm");

var _ArticleChildren2 = _interopRequireDefault(_ArticleChildren);

var _ChildArticle = __webpack_require__("MPPF");

var _ChildArticle2 = _interopRequireDefault(_ChildArticle);

var _Tag = __webpack_require__("eYTX");

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Profile = (0, _mobxReact.observer)(_class = function (_Component) {
  (0, _inherits3.default)(Profile, _Component);

  function Profile() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Profile);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Profile.__proto__ || (0, _getPrototypeOf2.default)(Profile)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var _this$props$page = _this.props.page,
          _this$props$page$arti = _this$props$page.articles,
          articles = _this$props$page$arti === undefined ? [] : _this$props$page$arti,
          _this$props$page$favo = _this$props$page.favorites,
          favorites = _this$props$page$favo === undefined ? [] : _this$props$page$favo,
          id = _this$props$page.id,
          name = _this$props$page.name,
          _this$props$page$priv = _this$props$page.privileges,
          privileges = _this$props$page$priv === undefined ? [] : _this$props$page$priv,
          tags = _this$props$page.tags;


      var ownerOf = (0, _unique2.default)([].concat((0, _toConsumableArray3.default)(articles), (0, _toConsumableArray3.default)(tags))).sort();

      return _react2.default.createElement(
        'div',
        { className: 'profile page' },
        _react2.default.createElement(
          'h1',
          { className: 'user-name' },
          name
        ),
        _react2.default.createElement(
          'div',
          { className: 'profile' },
          _react2.default.createElement(
            'div',
            { className: 'user-picture' },
            _react2.default.createElement('img', { alt: 'Profile Portrait', src: '//graph.facebook.com/' + id + '/picture?type=square&height=200' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'privileges' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'b',
                null,
                'Privileges'
              )
            ),
            privileges.map(function (tag) {
              return _react2.default.createElement(_Tag2.default, { key: tag, tag: tag, className: 'icon-settings' });
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'can-edit' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'b',
                null,
                'Owner Of'
              )
            ),
            ownerOf.map(function (tag) {
              return _react2.default.createElement(_Tag2.default, { key: tag, tag: tag, className: 'icon-tag' });
            })
          )
        ),
        _react2.default.createElement(_ArticleChildren2.default, {
          articles: favorites.map(function (slug) {
            return _ChildArticle2.default.create({ slug: slug });
          }),
          caption: 'Favorites',
          className: 'favorites',
          iconName: 'favorite-on'
        })
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return Profile;
}(_react.Component)) || _class;

exports.default = Profile;

/***/ }),

/***/ "tO4o":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("yCNF");

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),

/***/ "tqq1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__("GvBW");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;

/***/ }),

/***/ "uCi2":
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__("bIjD"),
    toKey = __webpack_require__("Ubhr");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ "uIr7":
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "uLhX":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("NkRn");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "ue/d":
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "uieL":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "uqUo":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("kM2E");
var core = __webpack_require__("FeBl");
var fails = __webpack_require__("S82l");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "us/S":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("Xd32"), __esModule: true };

/***/ }),

/***/ "uva0":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_uva0__;

/***/ }),

/***/ "v/+d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobxStateTree = __webpack_require__("D5HE");

exports.default = _mobxStateTree.types.model('Route', {
  hash: '',
  key: '',
  pathname: '',
  search: ''
}).views(function (self) {
  return {
    get slug() {
      return self.pathname.split('/').pop();
    }
  };
});

/***/ }),

/***/ "v8Dt":
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__("pTUa");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "vFc/":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("TcQ7");
var toLength = __webpack_require__("QRG4");
var toAbsoluteIndex = __webpack_require__("fkB2");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "vIB/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("O4g8");
var $export = __webpack_require__("kM2E");
var redefine = __webpack_require__("880/");
var hide = __webpack_require__("hJx8");
var has = __webpack_require__("D2L2");
var Iterators = __webpack_require__("/bQp");
var $iterCreate = __webpack_require__("94VQ");
var setToStringTag = __webpack_require__("e6n0");
var getPrototypeOf = __webpack_require__("PzxK");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "wF3A":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__("Jmof");
var PropTypes = __webpack_require__("KSGD");

var ALL_INITIALIZERS = [];
var READY_INITIALIZERS = [];

function isWebpackReady(getModuleIds) {
  if (( false ? 'undefined' : _typeof(__webpack_require__.m)) !== 'object') {
    return false;
  }

  return getModuleIds().every(function (moduleId) {
    return typeof moduleId !== 'undefined' && typeof __webpack_require__.m[moduleId] !== 'undefined';
  });
}

function load(loader) {
  var promise = loader();

  var state = {
    loading: true,
    loaded: null,
    error: null
  };

  state.promise = promise.then(function (loaded) {
    state.loading = false;
    state.loaded = loaded;
    return loaded;
  }).catch(function (err) {
    state.loading = false;
    state.error = err;
    throw err;
  });

  return state;
}

function loadMap(obj) {
  var state = {
    loading: false,
    loaded: {},
    error: null
  };

  var promises = [];

  try {
    Object.keys(obj).forEach(function (key) {
      var result = load(obj[key]);

      if (!result.loading) {
        state.loaded[key] = result.loaded;
        state.error = result.error;
      } else {
        state.loading = true;
      }

      promises.push(result.promise);

      result.promise.then(function (res) {
        state.loaded[key] = res;
      }).catch(function (err) {
        state.error = err;
      });
    });
  } catch (err) {
    state.error = err;
  }

  state.promise = Promise.all(promises).then(function (res) {
    state.loading = false;
    return res;
  }).catch(function (err) {
    state.loading = false;
    throw err;
  });

  return state;
}

function resolve(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

function render(loaded, props) {
  return React.createElement(resolve(loaded), props);
}

function createLoadableComponent(loadFn, options) {
  var _class, _temp;

  if (!options.loading) {
    throw new Error('react-loadable requires a `loading` component');
  }

  var opts = Object.assign({
    loader: null,
    loading: null,
    delay: 200,
    timeout: null,
    render: render,
    webpack: null,
    modules: null
  }, options);

  var res = null;

  function init() {
    if (!res) {
      res = loadFn(opts.loader);
    }
    return res.promise;
  }

  ALL_INITIALIZERS.push(init);

  if (typeof opts.webpack === 'function') {
    READY_INITIALIZERS.push(function () {
      if (isWebpackReady(opts.webpack)) {
        return init();
      }
    });
  }

  return _temp = _class = function (_React$Component) {
    _inherits(LoadableComponent, _React$Component);

    function LoadableComponent(props) {
      _classCallCheck(this, LoadableComponent);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      init();

      _this.state = {
        error: res.error,
        pastDelay: false,
        timedOut: false,
        loading: res.loading,
        loaded: res.loaded
      };
      return _this;
    }

    LoadableComponent.preload = function preload() {
      return init();
    };

    LoadableComponent.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      this._mounted = true;

      if (this.context.loadable && Array.isArray(opts.modules)) {
        opts.modules.forEach(function (moduleName) {
          _this2.context.loadable.report(moduleName);
        });
      }

      if (!res.loading) {
        return;
      }

      if (typeof opts.delay === 'number') {
        if (opts.delay === 0) {
          this.setState({ pastDelay: true });
        } else {
          this._delay = setTimeout(function () {
            _this2.setState({ pastDelay: true });
          }, opts.delay);
        }
      }

      if (typeof opts.timeout === 'number') {
        this._timeout = setTimeout(function () {
          _this2.setState({ timedOut: true });
        }, opts.timeout);
      }

      var update = function update() {
        if (!_this2._mounted) {
          return;
        }

        _this2.setState({
          error: res.error,
          loaded: res.loaded,
          loading: res.loading
        });

        _this2._clearTimeouts();
      };

      res.promise.then(function () {
        update();
      }).catch(function (err) {
        update();
        throw err;
      });
    };

    LoadableComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this._mounted = false;
      this._clearTimeouts();
    };

    LoadableComponent.prototype._clearTimeouts = function _clearTimeouts() {
      clearTimeout(this._delay);
      clearTimeout(this._timeout);
    };

    LoadableComponent.prototype.render = function render() {
      if (this.state.loading || this.state.error) {
        return React.createElement(opts.loading, {
          isLoading: this.state.loading,
          pastDelay: this.state.pastDelay,
          timedOut: this.state.timedOut,
          error: this.state.error
        });
      } else if (this.state.loaded) {
        return opts.render(this.state.loaded, this.props);
      } else {
        return null;
      }
    };

    return LoadableComponent;
  }(React.Component), _class.contextTypes = {
    loadable: PropTypes.shape({
      report: PropTypes.func.isRequired
    })
  }, _temp;
}

function Loadable(opts) {
  return createLoadableComponent(load, opts);
}

function LoadableMap(opts) {
  if (typeof opts.render !== 'function') {
    throw new Error('LoadableMap requires a `render(loaded, props)` function');
  }

  return createLoadableComponent(loadMap, opts);
}

Loadable.Map = LoadableMap;

var Capture = function (_React$Component2) {
  _inherits(Capture, _React$Component2);

  function Capture() {
    _classCallCheck(this, Capture);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Capture.prototype.getChildContext = function getChildContext() {
    return {
      loadable: {
        report: this.props.report
      }
    };
  };

  Capture.prototype.render = function render() {
    return React.Children.only(this.props.children);
  };

  return Capture;
}(React.Component);

Capture.propTypes = {
  report: PropTypes.func.isRequired
};
Capture.childContextTypes = {
  loadable: PropTypes.shape({
    report: PropTypes.func.isRequired
  }).isRequired
};


Loadable.Capture = Capture;

function flushInitializers(initializers) {
  var promises = [];

  while (initializers.length) {
    var init = initializers.pop();
    promises.push(init());
  }

  return Promise.all(promises).then(function () {
    if (initializers.length) {
      return flushInitializers(initializers);
    }
  });
}

Loadable.preloadAll = function () {
  return new Promise(function (resolve, reject) {
    flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
  });
};

Loadable.preloadReady = function () {
  return new Promise(function (resolve, reject) {
    // We always will resolve, errors should be handled within loading UIs.
    flushInitializers(READY_INITIALIZERS).then(resolve, resolve);
  });
};

module.exports = Loadable;

/***/ }),

/***/ "wLXD":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_wLXD__;

/***/ }),

/***/ "wSKX":
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "woOf":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("V3tA"), __esModule: true };

/***/ }),

/***/ "wxAW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__("C4MV");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ "xGkn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("4mcu");
var step = __webpack_require__("EGZi");
var Iterators = __webpack_require__("/bQp");
var toIObject = __webpack_require__("TcQ7");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("vIB/")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "xIPz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolvePathname = __webpack_require__("Wpbd");

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__("FKtm");

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__("Izpu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),

/***/ "xiZN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Message = function Message(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title,
      _ref$children = _ref.children,
      children = _ref$children === undefined ? null : _ref$children;
  return React.createElement(
    'div',
    { className: 'message ' + className },
    React.createElement(
      'div',
      { className: 'message-header' },
      title
    ),
    React.createElement(
      'div',
      { className: 'message-body' },
      children
    )
  );
};
exports.default = Message;

/***/ }),

/***/ "xnc9":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "yCNF":
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "yxsw":
/***/ (function(module, exports) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;


/***/ }),

/***/ "z4hc":
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__("aCM0"),
    isLength = __webpack_require__("Rh28"),
    isObjectLike = __webpack_require__("UnEC");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "zFGm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),

/***/ "zGZ6":
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__("YeCl");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ "zHJr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value, _ref) {
  var min = _ref.min,
      max = _ref.max;

  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
};

/***/ }),

/***/ "zQLw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = __webpack_require__("Xxa5");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__("Gu7T");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _mobx = __webpack_require__("dGoz");

var _mobxStateTree = __webpack_require__("D5HE");

var _titleCase = __webpack_require__("f70R");

var _titleCase2 = _interopRequireDefault(_titleCase);

var _ChildArticle = __webpack_require__("MPPF");

var _ChildArticle2 = _interopRequireDefault(_ChildArticle);

var _PageData = __webpack_require__("RN6t");

var _PageData2 = _interopRequireDefault(_PageData);

var _commonModels = __webpack_require__("Cde9");

var _fetch = __webpack_require__("06WZ");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = {
  aliases: [],
  children: [],
  html: '',
  isFavorite: false,
  links: [],
  missing: [],
  privileges: [],
  slug: '',
  tags: [],
  title: '',
  type: 'article'
};

var ArticlePage = _mobxStateTree.types.model('ArticlePage', (0, _extends3.default)({}, DEFAULTS, {
  aliases: _commonModels.optionalArrayOfStrings,
  children: _mobxStateTree.types.optional(_mobxStateTree.types.array(_ChildArticle2.default), DEFAULTS.children),
  data: _mobxStateTree.types.optional(_PageData2.default, {}),
  links: _commonModels.optionalArrayOfStrings,
  missing: _commonModels.optionalArrayOfStrings,
  privileges: _commonModels.optionalArrayOfStrings,
  tags: _commonModels.optionalArrayOfStrings,
  type: _mobxStateTree.types.optional(_mobxStateTree.types.literal('article'), DEFAULTS.type)
})).volatile(function () {
  return {
    loading: false,
    activeTabId: 'sheet'
  };
}).views(function (self) {
  return {
    get displayName() {
      return self.title || (0, _titleCase2.default)(self.slug);
    },
    get keywords() {
      return [].concat((0, _toConsumableArray3.default)(self.aliases), (0, _toConsumableArray3.default)(self.children.map(function (c) {
        return c.displayName;
      })), (0, _toConsumableArray3.default)(self.tags.map(function (t) {
        return t.toLowerCase();
      })), [self.displayName, self.slug, self.type]);
    },
    get user() {
      return (0, _mobxStateTree.getParent)(self).user;
    },
    get readonly() {
      return self.user.anonymous || !self.privileges.includes('edit');
    }
  };
}).actions(function (self) {
  /* eslint-disable no-param-reassign */
  var autorunDisposer = void 0;
  var userId = void 0;

  return {
    afterAttach: function afterAttach() {
      userId = self.user.id; // eslint-disable-line prefer-destructuring
      autorunDisposer = (0, _mobx.autorun)(function () {
        if (self.user.id !== userId) {
          userId = self.user.id; // eslint-disable-line prefer-destructuring
          self.reload();
        }
      });
    },
    beforeDestroy: function beforeDestroy() {
      autorunDisposer();
    },

    delete: (0, _mobxStateTree.flow)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var response;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fetch.DELETE)('/api/page/' + self.slug);

            case 2:
              response = _context.sent;
              _context.t0 = response.status;
              _context.next = _context.t0 === 410 ? 6 : 8;
              break;

            case 6:
              window.routerHistory.push('/');
              return _context.abrupt('break', 8);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })),
    load: (0, _mobxStateTree.flow)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref) {
      var slug = _ref.slug;
      var response;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              self.loading = true;
              _context2.next = 3;
              return (0, _fetch.GET)('/api/page/' + slug);

            case 3:
              response = _context2.sent;
              _context2.t0 = response.status;
              _context2.next = _context2.t0 === 200 ? 7 : 12;
              break;

            case 7:
              _context2.t1 = self;
              _context2.next = 10;
              return response.json();

            case 10:
              _context2.t2 = _context2.sent;

              _context2.t1.update.call(_context2.t1, _context2.t2);

            case 12:
              self.loading = false;

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })),
    reload: function reload() {
      self.load({ slug: self.slug });
    },
    removeTag: function removeTag(tag) {
      self.tags.remove(tag);
    },

    save: (0, _mobxStateTree.flow)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var response;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _fetch.POST)('/api/page/' + self.slug, self.toJSON());

            case 2:
              response = _context3.sent;
              _context3.t0 = response.status;
              _context3.next = _context3.t0 === 200 ? 6 : _context3.t0 === 401 ? 12 : _context3.t0 === 500 ? 12 : 12;
              break;

            case 6:
              _context3.t1 = self;
              _context3.next = 9;
              return response.json();

            case 9:
              _context3.t2 = _context3.sent;

              _context3.t1.update.call(_context3.t1, _context3.t2);

              return _context3.abrupt('break', 12);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })),
    setActiveTabId: function setActiveTabId(tabId) {
      self.activeTabId = tabId;
    },
    setHTML: function setHTML(html) {
      self.html = html;
    },
    setTags: function setTags(tags) {
      self.tags = tags;
    },
    setTitle: function setTitle(title) {
      self.title = title;
    },

    toggleFavorite: (0, _mobxStateTree.flow)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var slug, isFavorite, response;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              slug = self.slug, isFavorite = self.isFavorite;
              _context4.next = 3;
              return (0, _fetch.POST)('/api/my/favorites', { slug: slug, value: !isFavorite });

            case 3:
              response = _context4.sent;

              if (response.status === 200) {
                self.isFavorite = !isFavorite;
              }

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })),
    update: function update(values) {
      (0, _assign2.default)(self, (0, _extends3.default)({}, DEFAULTS, values));
    }
  };
}
/* eslint-enable no-param-reassign */
);

exports.default = ArticlePage;

/***/ }),

/***/ "zQR9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("h65t")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("vIB/")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "zpVT":
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__("duB3"),
    Map = __webpack_require__("POb3"),
    MapCache = __webpack_require__("YeCl");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "zwoO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ })

},["CzH9"]);
});
//# sourceMappingURL=application.js.map
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseDocument = require('./base-document');

var EmbeddedDocument = function (_BaseDocument) {
    (0, _inherits3.default)(EmbeddedDocument, _BaseDocument);

    function EmbeddedDocument() {
        (0, _classCallCheck3.default)(this, EmbeddedDocument);

        // TODO: Move _id logic out of BaseDocument.
        // A better fix to this issue is to remove
        // _schema._id and _id from BaseDocument. But
        // since quite a bit of _id logic is still
        // in BD, we'll have to use this fix until
        // it is removed
        var _this = (0, _possibleConstructorReturn3.default)(this, (EmbeddedDocument.__proto__ || (0, _getPrototypeOf2.default)(EmbeddedDocument)).call(this));

        delete _this._schema._id;
        delete _this._id;
        return _this;
    }

    // TODO: Is there a way to tell if a class is
    // a subclass of something? Until I find out
    // how, we'll be lazy use this.


    (0, _createClass3.default)(EmbeddedDocument, [{
        key: 'documentClass',
        value: function documentClass() {
            return 'embedded';
        }
    }], [{
        key: 'documentClass',
        value: function documentClass() {
            return 'embedded';
        }
    }]);
    return EmbeddedDocument;
}(BaseDocument);

module.exports = EmbeddedDocument;
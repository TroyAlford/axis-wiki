'use strict';

/*
 * Base Camo error.
 * 
 * Adapted from es6-error package.
 */

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CamoError = function (_Error) {
    (0, _inherits3.default)(CamoError, _Error);

    function CamoError(message) {
        (0, _classCallCheck3.default)(this, CamoError);

        // Extending Error is weird and does not propagate `message`
        var _this = (0, _possibleConstructorReturn3.default)(this, (CamoError.__proto__ || (0, _getPrototypeOf2.default)(CamoError)).call(this, message));

        Object.defineProperty(_this, 'message', {
            enumerable: false,
            value: message
        });

        Object.defineProperty(_this, 'name', {
            enumerable: false,
            value: _this.constructor.name
        });

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(_this, _this.constructor);
            return (0, _possibleConstructorReturn3.default)(_this);
        }

        Object.defineProperty(_this, 'stack', {
            enumerable: false,
            value: new Error(message).stack
        });
        return _this;
    }

    return CamoError;
}(Error);

/*
 * Error indicating document didn't pass validation.
 */


var ValidationError = function (_CamoError) {
    (0, _inherits3.default)(ValidationError, _CamoError);

    function ValidationError(message) {
        (0, _classCallCheck3.default)(this, ValidationError);
        return (0, _possibleConstructorReturn3.default)(this, (ValidationError.__proto__ || (0, _getPrototypeOf2.default)(ValidationError)).call(this, message));
    }

    return ValidationError;
}(CamoError);

exports.CamoError = CamoError;
exports.ValidationError = ValidationError;
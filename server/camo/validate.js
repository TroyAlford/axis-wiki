'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var DB = require('./clients').getClient;

var isString = function isString(s) {
    return _.isString(s);
};

var isNumber = function isNumber(n) {
    return _.isNumber(n) && _.isFinite(n) && !isString(n);
};

var isBoolean = function isBoolean(b) {
    return _.isBoolean(b);
};

var isDate = function isDate(d) {
    return isNumber(d) || _.isDate(d) || isNumber(Date.parse(d));
};

var isBuffer = function isBuffer(b) {
    return (typeof b === 'undefined' ? 'undefined' : (0, _typeof3.default)(b)) === 'object' || b instanceof Buffer;
};

var isObject = function isObject(o) {
    return _.isObject(o);
};

var isArray = function isArray(a) {
    return _.isArray(a);
};

var isDocument = function isDocument(m) {
    return m && m.documentClass && m.documentClass() === 'document';
};

var isEmbeddedDocument = function isEmbeddedDocument(e) {
    return e && e.documentClass && e.documentClass() === 'embedded';
};

var isReferenceable = function isReferenceable(r) {
    return isDocument(r) || isNativeId(r);
};

var isNativeId = function isNativeId(n) {
    return DB().isNativeId(n);
};

var isSupportedType = function isSupportedType(t) {
    return t === String || t === Number || t === Boolean || t === Buffer || t === Date || t === Array || isArray(t) || t === Object || t instanceof Object || typeof t.documentClass === 'function';
};

var isType = function isType(value, type) {
    if (type === String) {
        return isString(value);
    } else if (type === Number) {
        return isNumber(value);
    } else if (type === Boolean) {
        return isBoolean(value);
    } else if (type === Buffer) {
        return isBuffer(value);
    } else if (type === Date) {
        return isDate(value);
    } else if (type === Array || isArray(type)) {
        return isArray(value);
    } else if (type === Object) {
        return isObject(value);
    } else if (type.documentClass && type.documentClass() === 'document') {
        return isDocument(value) || DB().isNativeId(value);
    } else if (type.documentClass && type.documentClass() === 'embedded') {
        return isEmbeddedDocument(value);
    } else if (type === DB().nativeIdType()) {
        return isNativeId(value);
    } else {
        throw new Error('Unsupported type: ' + type.name);
    }
};

var isValidType = function isValidType(value, type) {
    // NOTE
    // Maybe look at this: 
    // https://github.com/Automattic/mongoose/tree/master/lib/types

    // TODO: For now, null is okay for all types. May
    // want to specify in schema using 'nullable'?
    if (value === null) return true;

    // Issue #9: To avoid all model members being stored
    // in DB, allow undefined to be assigned. If you want
    // unassigned members in DB, use null.
    if (value === undefined) return true;

    // Arrays take a bit more work
    if (type === Array || isArray(type)) {
        // Validation for types of the form [String], [Number], etc
        if (isArray(type) && type.length > 1) {
            throw new Error('Unsupported type. Only one type can be specified in arrays, but multiple found:', +type);
        }

        if (isArray(type) && type.length === 1 && isArray(value)) {
            var arrayType = type[0];
            for (var i = 0; i < value.length; i++) {
                var v = value[i];
                if (!isType(v, arrayType)) {
                    return false;
                }
            }
        } else if (isArray(type) && type.length === 0 && !isArray(value)) {
            return false;
        } else if (type === Array && !isArray(value)) {
            return false;
        }

        return true;
    }

    return isType(value, type);
};

var isInChoices = function isInChoices(choices, choice) {
    if (!choices) {
        return true;
    }
    return choices.indexOf(choice) > -1;
};

var isEmptyValue = function isEmptyValue(value) {
    return typeof value === 'undefined' || !(typeof value === 'number' || value instanceof Date || typeof value === 'boolean') && 0 === (0, _keys2.default)(value).length;
};

exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isBuffer = isBuffer;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isDocument = isDocument;
exports.isEmbeddedDocument = isEmbeddedDocument;
exports.isReferenceable = isReferenceable;
exports.isNativeId = isNativeId;
exports.isSupportedType = isSupportedType;
exports.isType = isType;
exports.isValidType = isValidType;
exports.isInChoices = isInChoices;
exports.isEmptyValue = isEmptyValue;
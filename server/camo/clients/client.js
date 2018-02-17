'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatabaseClient = function () {
    function DatabaseClient(url) {
        (0, _classCallCheck3.default)(this, DatabaseClient);

        this._url = url;
    }

    (0, _createClass3.default)(DatabaseClient, [{
        key: 'save',
        value: function save(collection, query, values) {
            throw new TypeError('You must override save.');
        }
    }, {
        key: 'delete',
        value: function _delete(collection) {
            throw new TypeError('You must override delete.');
        }
    }, {
        key: 'deleteOne',
        value: function deleteOne(collection, query) {
            throw new TypeError('You must override deleteOne.');
        }
    }, {
        key: 'deleteMany',
        value: function deleteMany(collection, query) {
            throw new TypeError('You must override deleteMany.');
        }
    }, {
        key: 'findOne',
        value: function findOne(collection, query) {
            throw new TypeError('You must override findOne.');
        }
    }, {
        key: 'findOneAndUpdate',
        value: function findOneAndUpdate(collection, query, values, options) {
            throw new TypeError('You must override findOneAndUpdate.');
        }
    }, {
        key: 'findOneAndDelete',
        value: function findOneAndDelete(collection, query, options) {
            throw new TypeError('You must override findOneAndDelete.');
        }
    }, {
        key: 'find',
        value: function find(collection, query, options) {
            throw new TypeError('You must override findMany.');
        }
    }, {
        key: 'count',
        value: function count(collection, query) {
            throw new TypeError('You must override count.');
        }
    }, {
        key: 'createIndex',
        value: function createIndex(collection, field, options) {
            throw new TypeError('You must override createIndex.');
        }
    }, {
        key: 'close',
        value: function close() {
            throw new TypeError('You must override close.');
        }
    }, {
        key: 'clearCollection',
        value: function clearCollection(collection) {
            throw new TypeError('You must override clearCollection.');
        }
    }, {
        key: 'dropDatabase',
        value: function dropDatabase() {
            throw new TypeError('You must override dropDatabase.');
        }
    }, {
        key: 'toCanonicalId',
        value: function toCanonicalId(id) {
            throw new TypeError('You must override toCanonicalId.');
        }
    }, {
        key: 'isNativeId',
        value: function isNativeId(value) {
            throw new TypeError('You must override isNativeId.');
        }
    }, {
        key: 'toNativeId',
        value: function toNativeId(id) {
            return this.nativeIdType()(id);
        }
    }, {
        key: 'nativeIdType',
        value: function nativeIdType() {
            throw new TypeError('You must override nativeIdType.');
        }
    }, {
        key: 'driver',
        value: function driver() {
            throw new TypeError('You must override driver.');
        }
    }], [{
        key: 'connect',
        value: function connect(url, options) {
            throw new TypeError('You must override connect (static).');
        }
    }]);
    return DatabaseClient;
}();

module.exports = DatabaseClient;
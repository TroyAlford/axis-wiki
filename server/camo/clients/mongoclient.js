'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var MDBClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var DatabaseClient = require('./client');
var isObject = require('../validate').isObject;
var deepTraverse = require('../util').deepTraverse;

var MongoClient = function (_DatabaseClient) {
    (0, _inherits3.default)(MongoClient, _DatabaseClient);

    function MongoClient(url, mongo) {
        (0, _classCallCheck3.default)(this, MongoClient);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MongoClient.__proto__ || (0, _getPrototypeOf2.default)(MongoClient)).call(this, url));

        _this._mongo = mongo;
        return _this;
    }

    /**
     * Save (upsert) document
     *
     * @param {String} collection Collection's name
     * @param {ObjectId?} id Document's id
     * @param {Object} values Data for save
     * @returns {Promise} Promise with result insert or update query
     */


    (0, _createClass3.default)(MongoClient, [{
        key: 'save',
        value: function save(collection, id, values) {
            var that = this;
            return new _promise2.default(function (resolve, reject) {
                var db = that._mongo.collection(collection);

                // TODO: I'd like to just use update with upsert:true, but I'm
                // note sure how the query will work if id == null. Seemed to
                // have some problems before with passing null ids.
                if (id === null) {
                    db.insertOne(values, function (error, result) {
                        if (error) return reject(error);
                        if (!result.hasOwnProperty('insertedId') || result.insertedId === null) {
                            return reject(new Error('Save failed to generate ID for object.'));
                        }

                        return resolve(result.insertedId);
                    });
                } else {
                    db.updateOne({ _id: id }, { $set: values }, { upsert: true }, function (error, result) {
                        if (error) return reject(error);
                        return resolve();
                    });
                }
            });
        }

        /**
         * Delete document
         *
         * @param {String} collection Collection's name
         * @param {ObjectId} id Document's id
         * @returns {Promise}
         */

    }, {
        key: 'delete',
        value: function _delete(collection, id) {
            var that = this;
            return new _promise2.default(function (resolve, reject) {
                if (id === null) resolve(0);

                var db = that._mongo.collection(collection);
                db.deleteOne({ _id: id }, { w: 1 }, function (error, result) {
                    if (error) return reject(error);
                    return resolve(result.deletedCount);
                });
            });
        }

        /**
         * Delete one document by query
         *
         * @param {String} collection Collection's name
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'deleteOne',
        value: function deleteOne(collection, query) {
            var that = this;
            query = castQueryIds(query);
            return new _promise2.default(function (resolve, reject) {
                var db = that._mongo.collection(collection);
                db.deleteOne(query, { w: 1 }, function (error, result) {
                    if (error) return reject(error);
                    return resolve(result.deletedCount);
                });
            });
        }

        /**
         * Delete many documents by query
         *
         * @param {String} collection Collection's name
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'deleteMany',
        value: function deleteMany(collection, query) {
            var that = this;
            query = castQueryIds(query);
            return new _promise2.default(function (resolve, reject) {
                var db = that._mongo.collection(collection);
                db.deleteMany(query, { w: 1 }, function (error, result) {
                    if (error) return reject(error);
                    return resolve(result.deletedCount);
                });
            });
        }

        /**
         * Find one document
         *
         * @param {String} collection Collection's name
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'findOne',
        value: function findOne(collection, query) {
            var that = this;
            query = castQueryIds(query);
            return new _promise2.default(function (resolve, reject) {
                var db = that._mongo.collection(collection);
                db.findOne(query, function (error, doc) {
                    if (error) return reject(error);
                    return resolve(doc);
                });
            });
        }

        /**
         * Find one document and update it
         *
         * @param {String} collection Collection's name
         * @param {Object} query Query
         * @param {Object} values
         * @param {Object} options
         * @returns {Promise}
         */

    }, {
        key: 'findOneAndUpdate',
        value: function findOneAndUpdate(collection, query, values, options) {
            var that = this;
            query = castQueryIds(query);
            if (!options) {
                options = {};
            }

            // Always return the updated object
            options.returnOriginal = false;

            return new _promise2.default(function (resolve, reject) {
                var db = that._mongo.collection(collection);

                var update = values;
                if (options.upsert) {
                    update = { $setOnInsert: update };
                } else {
                    update = { $set: update };
                }

                db.findOneAndUpdate(query, update, options, function (error, result) {
                    if (error) return reject(error);
                    resolve(result.value);
                });
            });
        }

        /**
         * Find one document and delete it
         *
         * @param {String} collection Collection's name
         * @param {Object} query Query
         * @param {Object} options
         * @returns {Promise}
         */

    }, {
        key: 'findOneAndDelete',
        value: function findOneAndDelete(collection, query, options) {
            var that = this;
            query = castQueryIds(query);
            if (!options) {
                options = {};
            }

            return new _promise2.default(function (resolve, reject) {
                var db = that._mongo.collection(collection);

                db.findOneAndDelete(query, options, function (error, result) {
                    if (error) return reject(error);
                    return resolve(result.value === null ? 0 : 1);
                });
            });
        }

        /**
         * Find documents
         *
         * @param {String} collection Collection's name
         * @param {Object} query Query
         * @param {Object} options
         * @returns {Promise}
         */

    }, {
        key: 'find',
        value: function find(collection, query, options) {
            var that = this;
            query = castQueryIds(query);
            return new _promise2.default(function (resolve, reject) {
                var db = that._mongo.collection(collection);
                var cursor = db.find(query);
                if (options.sort && (_.isArray(options.sort) || _.isString(options.sort))) {
                    var sortOptions = {};
                    if (!_.isArray(options.sort)) {
                        options.sort = [options.sort];
                    }

                    options.sort.forEach(function (s) {
                        if (!_.isString(s)) return;

                        var sortOrder = 1;
                        if (s[0] === '-') {
                            sortOrder = -1;
                            s = s.substring(1);
                        }
                        sortOptions[s] = sortOrder;
                    });

                    cursor = cursor.sort(sortOptions);
                }
                if (typeof options.skip === 'number') {
                    cursor = cursor.skip(options.skip);
                }
                if (typeof options.limit === 'number') {
                    cursor = cursor.limit(options.limit);
                }
                cursor.toArray(function (error, docs) {
                    if (error) return reject(error);
                    return resolve(docs);
                });
            });
        }

        /**
         * Count number of matching documents in the db to a query.
         *
         * @param {String} collection Collection's name
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'count',
        value: function count(collection, query) {
            var that = this;
            query = castQueryIds(query);
            return new _promise2.default(function (resolve, reject) {
                var db = that._mongo.collection(collection);
                db.count(query, function (error, count) {
                    if (error) return reject(error);
                    return resolve(count);
                });
            });
        }

        /**
         * Create index
         *
         * @param {String} collection Collection's name
         * @param {String} field Field name
         * @param {Object} options Options
         * @returns {Promise}
         */

    }, {
        key: 'createIndex',
        value: function createIndex(collection, field, options) {
            options = options || {};
            options.unique = options.unique || false;
            options.sparse = options.sparse || false;

            var db = this._mongo.collection(collection);

            var keys = {};
            keys[field] = 1;
            db.createIndex(keys, { unique: options.unique, sparse: options.sparse });
        }

        /**
         * Connect to database
         *
         * @param {String} url
         * @param {Object} options
         * @returns {Promise}
         */

    }, {
        key: 'close',


        /**
         * Close current connection
         *
         * @returns {Promise}
         */
        value: function close() {
            var that = this;
            return new _promise2.default(function (resolve, reject) {
                that._mongo.close(function (error) {
                    if (error) return reject(error);
                    return resolve();
                });
            });
        }

        /**
         * Drop collection
         *
         * @param {String} collection
         * @returns {Promise}
         */

    }, {
        key: 'clearCollection',
        value: function clearCollection(collection) {
            var that = this;
            return new _promise2.default(function (resolve, reject) {
                that._mongo.dropCollection(collection, function (error, result) {
                    if (error) return reject(error);
                    return resolve();
                });
            });
        }

        /**
         * Drop current database
         *
         * @returns {Promise}
         */

    }, {
        key: 'dropDatabase',
        value: function dropDatabase() {
            var that = this;
            return new _promise2.default(function (resolve, reject) {
                that._mongo.dropDatabase(function (error, result) {
                    if (error) return reject(error);
                    return resolve();
                });
            });
        }

        /**
         * Convert ObjectId to canonical form
         *
         * @param {ObjectId} id
         * @returns {*|string|String}
         */

    }, {
        key: 'toCanonicalId',
        value: function toCanonicalId(id) {
            return id.toString();
        }

        /**
         * Is Native ID
         *
         * @param {*} value
         * @returns {boolean}
         */

    }, {
        key: 'isNativeId',
        value: function isNativeId(value) {
            return value instanceof ObjectId || String(value).match(/^[a-fA-F0-9]{24}$/) !== null;
        }
    }, {
        key: 'nativeIdType',
        value: function nativeIdType() {
            return ObjectId;
        }
    }, {
        key: 'driver',
        value: function driver() {
            return this._mongo;
        }
    }], [{
        key: 'connect',
        value: function connect(url, options) {
            if (typeof options === 'undefined') {
                options = {};
            }
            return new _promise2.default(function (resolve, reject) {
                MDBClient.connect(url, options, function (error, client) {
                    if (error) return reject(error);
                    return resolve(new MongoClient(url, client));
                });
            });
        }
    }]);
    return MongoClient;
}(DatabaseClient);

var castId = function castId(val) {
    return new ObjectId(val);
};

var castIdArray = function castIdArray(vals) {
    return vals.map(function (v) {
        return castId(v);
    });
};

/**
 * Traverses query and converts all IDs to MongoID
 *
 * TODO: Should we check for $not operator?
 *
 * @param {Object} query
 * @returns {Object}
 */
var castQueryIds = function castQueryIds(query) {
    deepTraverse(query, function (key, val, parent) {
        if (key === '_id') {
            if (String(parent[key]).match(/^[a-fA-F0-9]{24}$/)) {
                parent[key] = castId(parent[key]);
            } else if (isObject(parent[key]) && _.has(parent[key], '$in')) {
                // { _id: { '$in': [ 'K1cbMk7T8A0OU83IAT4dFa91', 'Y1cbak7T8A1OU83IBT6aPq11' ] } }
                parent[key].$in = castIdArray(parent[key].$in);
            } else if (isObject(parent[key]) && _.has(parent[key], '$nin')) {
                // { _id: { '$nin': [ 'K1cbMk7T8A0OU83IAT4dFa91', 'Y1cbak7T8A1OU83IBT6aPq11' ] } }
                parent[key].$nin = castIdArray(parent[key].$nin);
            }
        }
    });

    return query;
};

module.exports = MongoClient;
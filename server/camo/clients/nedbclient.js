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
var Datastore = require('nedb');
var DatabaseClient = require('./client');

var urlToPath = function urlToPath(url) {
    if (url.indexOf('nedb://') > -1) {
        return url.slice(7, url.length);
    }
    return url;
};

var getCollectionPath = function getCollectionPath(dbLocation, collection) {
    if (dbLocation === 'memory') {
        return dbLocation;
    }
    return path.join(dbLocation, collection) + '.db';
};

var createCollection = function createCollection(collectionName, url) {
    if (url === 'memory') {
        return new Datastore({ inMemoryOnly: true });
    }
    var collectionPath = getCollectionPath(url, collectionName);
    return new Datastore({ filename: collectionPath, autoload: true });
};

var getCollection = function getCollection(name, collections, path) {
    if (!(name in collections)) {
        var collection = createCollection(name, path);
        collections[name] = collection;
        return collection;
    }

    return collections[name];
};

var NeDbClient = function (_DatabaseClient) {
    (0, _inherits3.default)(NeDbClient, _DatabaseClient);

    function NeDbClient(url, collections) {
        (0, _classCallCheck3.default)(this, NeDbClient);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NeDbClient.__proto__ || (0, _getPrototypeOf2.default)(NeDbClient)).call(this, url));

        _this._path = urlToPath(url);

        if (collections) {
            _this._collections = collections;
        } else {
            _this._collections = {};
        }
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


    (0, _createClass3.default)(NeDbClient, [{
        key: 'save',
        value: function save(collection, id, values) {
            var that = this;
            return new _promise2.default(function (resolve, reject) {
                var db = getCollection(collection, that._collections, that._path);

                // TODO: I'd like to just use update with upsert:true, but I'm
                // note sure how the query will work if id == null. Seemed to
                // have some problems before with passing null ids.
                if (id === null) {
                    db.insert(values, function (error, result) {
                        if (error) return reject(error);
                        return resolve(result._id);
                    });
                } else {
                    db.update({ _id: id }, { $set: values }, { upsert: true }, function (error, result) {
                        if (error) return reject(error);
                        return resolve(result);
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

                var db = getCollection(collection, that._collections, that._path);
                db.remove({ _id: id }, function (error, numRemoved) {
                    if (error) return reject(error);
                    return resolve(numRemoved);
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
            return new _promise2.default(function (resolve, reject) {
                var db = getCollection(collection, that._collections, that._path);
                db.remove(query, function (error, numRemoved) {
                    if (error) return reject(error);
                    return resolve(numRemoved);
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
            return new _promise2.default(function (resolve, reject) {
                var db = getCollection(collection, that._collections, that._path);
                db.remove(query, { multi: true }, function (error, numRemoved) {
                    if (error) return reject(error);
                    return resolve(numRemoved);
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
            return new _promise2.default(function (resolve, reject) {
                var db = getCollection(collection, that._collections, that._path);
                db.findOne(query, function (error, result) {
                    if (error) return reject(error);
                    return resolve(result);
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

            if (!options) {
                options = {};
            }

            // Since this is 'findOne...' we'll only allow user to update
            // one document at a time
            options.multi = false;

            return new _promise2.default(function (resolve, reject) {
                var db = getCollection(collection, that._collections, that._path);

                // TODO: Would like to just use 'Collection.update' here, but
                // it doesn't return objects on update (but will on insert)...
                /*db.update(query, values, options, function(error, numReplaced, newDoc) {
                    if (error) return reject(error);
                    resolve(newDoc);
                });*/

                that.findOne(collection, query).then(function (data) {
                    if (!data) {
                        if (options.upsert) {
                            return db.insert(values, function (error, result) {
                                if (error) return reject(error);
                                return resolve(result);
                            });
                        } else {
                            return resolve(null);
                        }
                    } else {
                        return db.update(query, { $set: values }, function (error, result) {
                            if (error) return reject(error);

                            // Fixes issue #55. Remove when NeDB is updated to v1.8+
                            db.findOne({ _id: data._id }, function (error, doc) {
                                if (error) return reject(error);
                                resolve(doc);
                            });
                        });
                    }
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

            if (!options) {
                options = {};
            }

            // Since this is 'findOne...' we'll only allow user to update
            // one document at a time
            options.multi = false;

            return new _promise2.default(function (resolve, reject) {
                var db = getCollection(collection, that._collections, that._path);
                db.remove(query, options, function (error, numRemoved) {
                    if (error) return reject(error);
                    return resolve(numRemoved);
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
            return new _promise2.default(function (resolve, reject) {
                var db = getCollection(collection, that._collections, that._path);
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
                cursor.exec(function (error, result) {
                    if (error) return reject(error);
                    return resolve(result);
                });
            });
        }

        /**
         * Get count of collection by query
         *
         * @param {String} collection Collection's name
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'count',
        value: function count(collection, query) {
            var that = this;
            return new _promise2.default(function (resolve, reject) {
                var db = getCollection(collection, that._collections, that._path);
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

            var db = getCollection(collection, this._collections, this._path);
            db.ensureIndex({ fieldName: field, unique: options.unique, sparse: options.sparse });
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
        value: function close() {}
        // Nothing to do for NeDB


        /**
         * Drop collection
         *
         * @param {String} collection
         * @returns {Promise}
         */

    }, {
        key: 'clearCollection',
        value: function clearCollection(collection) {
            return this.deleteMany(collection, {});
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

            var clearPromises = [];
            _.keys(this._collections).forEach(function (key) {
                var p = new _promise2.default(function (resolve, reject) {
                    var dbLocation = getCollectionPath(that._path, key);

                    if (dbLocation === 'memory') {
                        // Only exists in memory, so just delete the 'Datastore'
                        delete that._collections[key];
                        resolve();
                    } else {
                        // Delete the file, but only if it exists
                        fs.stat(dbLocation, function (err, stat) {
                            if (err === null) {
                                fs.unlink(dbLocation, function (err) {
                                    if (err) reject(err);
                                    delete that._collections[key];
                                    resolve();
                                });
                            } else {
                                resolve();
                            }
                        });
                    }
                });
                clearPromises.push(p);
            });

            return _promise2.default.all(clearPromises);
        }
    }, {
        key: 'toCanonicalId',
        value: function toCanonicalId(id) {
            return id;
        }

        // Native ids are the same as NeDB ids

    }, {
        key: 'isNativeId',
        value: function isNativeId(value) {
            return String(value).match(/^[a-zA-Z0-9]{16}$/) !== null;
        }
    }, {
        key: 'nativeIdType',
        value: function nativeIdType() {
            return String;
        }
    }, {
        key: 'driver',
        value: function driver() {
            return this._collections;
        }
    }], [{
        key: 'connect',
        value: function connect(url, options) {
            // Could be directory path or 'memory'
            var dbLocation = urlToPath(url);

            return new _promise2.default(function (resolve, reject) {
                var collections = {};

                // TODO: Load all data upfront or on-demand?
                // Maybe give user the option to load upfront.
                // But which should we do by default?
                /*fs.readdir(dbLocation, function(error, files) {
                    files.forEach(function(file) {
                        let extname = path.extname(file);
                        let filename = file.split('.')[0];
                        if (extname === '.db' && filename.length > 0) {
                            let collectionName = filename;
                            collections[collectionName] = createCollection(collectionName, dbLocation);
                        }
                    });
                    global.CLIENT = new NeDbClient(dbLocation, collections);
                    resolve(global.CLIENT);
                });*/
                //global.CLIENT = new NeDbClient(dbLocation, collections);
                resolve(new NeDbClient(dbLocation, collections));
            });
        }
    }]);
    return NeDbClient;
}(DatabaseClient);

module.exports = NeDbClient;
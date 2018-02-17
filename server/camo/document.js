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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var deprecate = require('depd')('camo');
var DB = require('./clients').getClient;
var BaseDocument = require('./base-document');
var isSupportedType = require('./validate').isSupportedType;
var isArray = require('./validate').isArray;
var isReferenceable = require('./validate').isReferenceable;
var isEmbeddedDocument = require('./validate').isEmbeddedDocument;
var isString = require('./validate').isString;

var Document = function (_BaseDocument) {
    (0, _inherits3.default)(Document, _BaseDocument);

    function Document(name) {
        (0, _classCallCheck3.default)(this, Document);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).call(this));

        if (name !== undefined && name !== null) {
            deprecate('Document.constructor(name) - override Document.collectionName() instead');
            _this._meta = {
                collection: name
            };
        }
        return _this;
    }

    // TODO: Is there a way to tell if a class is
    // a subclass of something? Until I find out
    // how, we'll be lazy use this.


    (0, _createClass3.default)(Document, [{
        key: 'documentClass',
        value: function documentClass() {
            return 'document';
        }
    }, {
        key: 'save',


        /**
         * Save (upsert) current document
         *
         * TODO: The method is too long and complex, it is necessary to divide...
         * @returns {Promise}
         */
        value: function save() {
            var that = this;

            var preValidatePromises = this._getHookPromises('preValidate');

            return _promise2.default.all(preValidatePromises).then(function () {

                // Ensure we at least have defaults set

                // TODO: We already do this on .create(), so
                // should it really be done again?
                _.keys(that._schema).forEach(function (key) {
                    if (!(key in that._schema)) {
                        that[key] = that.getDefault(key);
                    }
                });

                // Validate the assigned type, choices, and min/max
                that.validate();

                // Ensure all data types are saved in the same encodings
                that.canonicalize();

                return _promise2.default.all(that._getHookPromises('postValidate'));
            }).then(function () {
                return _promise2.default.all(that._getHookPromises('preSave'));
            }).then(function () {

                // TODO: We should instead track what has changed and
                // only update those values. Maybe make that._changed
                // object to do this.
                // Also, this might be really slow for objects with
                // lots of references. Figure out a better way.
                var toUpdate = that._toData({ _id: false });

                // Reference our objects
                _.keys(that._schema).forEach(function (key) {
                    // Never care about _id
                    if (key === '_id') return;

                    if (isReferenceable(that[key]) || // isReferenceable OR
                    isArray(that[key]) && // isArray AND contains value AND value isReferenceable
                    that[key].length > 0 && isReferenceable(that[key][0])) {

                        // Handle array of references (ex: { type: [MyObject] })
                        if (isArray(that[key])) {
                            toUpdate[key] = [];
                            that[key].forEach(function (v) {
                                if (DB().isNativeId(v)) {
                                    toUpdate[key].push(v);
                                } else {
                                    toUpdate[key].push(v._id);
                                }
                            });
                        } else {
                            if (DB().isNativeId(that[key])) {
                                toUpdate[key] = that[key];
                            } else {
                                toUpdate[key] = that[key]._id;
                            }
                        }
                    }
                });

                // Replace EmbeddedDocument references with just their data
                _.keys(that._schema).forEach(function (key) {
                    if (isEmbeddedDocument(that[key]) || // isEmbeddedDocument OR
                    isArray(that[key]) && // isArray AND contains value AND value isEmbeddedDocument
                    that[key].length > 0 && isEmbeddedDocument(that[key][0])) {

                        // Handle array of references (ex: { type: [MyObject] })
                        if (isArray(that[key])) {
                            toUpdate[key] = [];
                            that[key].forEach(function (v) {
                                toUpdate[key].push(v._toData());
                            });
                        } else {
                            toUpdate[key] = that[key]._toData();
                        }
                    }
                });

                return DB().save(that.collectionName(), that._id, toUpdate);
            }).then(function (id) {
                if (that._id === null) {
                    that._id = id;
                }
            }).then(function () {
                // TODO: hack?
                var postSavePromises = that._getHookPromises('postSave');
                return _promise2.default.all(postSavePromises);
            }).then(function () {
                return that;
            }).catch(function (error) {
                return _promise2.default.reject(error);
            });
        }

        /**
         * Delete current document
         *
         * @returns {Promise}
         */

    }, {
        key: 'delete',
        value: function _delete() {
            var that = this;

            var preDeletePromises = that._getHookPromises('preDelete');

            return _promise2.default.all(preDeletePromises).then(function () {
                return DB().delete(that.collectionName(), that._id);
            }).then(function (deleteReturn) {
                // TODO: hack?
                var postDeletePromises = [deleteReturn].concat(that._getHookPromises('postDelete'));
                return _promise2.default.all(postDeletePromises);
            }).then(function (prevData) {
                var deleteReturn = prevData[0];
                return deleteReturn;
            });
        }

        /**
         * Delete one document in current collection
         *
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'meta',
        get: function get() {
            return this._meta;
        },
        set: function set(meta) {
            this._meta = meta;
        }
    }], [{
        key: 'documentClass',
        value: function documentClass() {
            return 'document';
        }
    }, {
        key: 'deleteOne',
        value: function deleteOne(query) {
            return DB().deleteOne(this.collectionName(), query);
        }

        /**
         * Delete many documents in current collection
         *
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'deleteMany',
        value: function deleteMany(query) {
            if (query === undefined || query === null) {
                query = {};
            }

            return DB().deleteMany(this.collectionName(), query);
        }

        /**
         * @deprecated Use `findOne`
         */

    }, {
        key: 'loadOne',
        value: function loadOne(query, options) {
            deprecate('loadOne - use findOne instead');
            return this.findOne(query, options);
        }

        /**
         * Find one document in current collection
         *
         * TODO: Need options to specify whether references should be loaded
         *
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'findOne',
        value: function findOne(query, options) {
            var that = this;

            var populate = true;
            if (options && options.hasOwnProperty('populate')) {
                populate = options.populate;
            }

            return DB().findOne(this.collectionName(), query).then(function (data) {
                if (!data) {
                    return null;
                }

                var doc = that._fromData(data);
                if (populate === true || isArray(populate) && populate.length > 0) {
                    return that.populate(doc, populate);
                }

                return doc;
            }).then(function (docs) {
                if (docs) {
                    return docs;
                }
                return null;
            });
        }

        /**
         * @deprecated Use `findOneAndUpdate`
         */

    }, {
        key: 'loadOneAndUpdate',
        value: function loadOneAndUpdate(query, values, options) {
            deprecate('loadOneAndUpdate - use findOneAndUpdate instead');
            return this.findOneAndUpdate(query, values, options);
        }

        /**
         * Find one document and update it in current collection
         *
         * @param {Object} query Query
         * @param {Object} values
         * @param {Object} options
         * @returns {Promise}
         */

    }, {
        key: 'findOneAndUpdate',
        value: function findOneAndUpdate(query, values, options) {
            var that = this;

            if (arguments.length < 2) {
                throw new Error('findOneAndUpdate requires at least 2 arguments. Got ' + arguments.length + '.');
            }

            if (!options) {
                options = {};
            }

            var populate = true;
            if (options.hasOwnProperty('populate')) {
                populate = options.populate;
            }

            return DB().findOneAndUpdate(this.collectionName(), query, values, options).then(function (data) {
                if (!data) {
                    return null;
                }

                var doc = that._fromData(data);
                if (populate) {
                    return that.populate(doc);
                }

                return doc;
            }).then(function (doc) {
                if (doc) {
                    return doc;
                }
                return null;
            });
        }

        /**
         * @deprecated Use `findOneAndDelete`
         */

    }, {
        key: 'loadOneAndDelete',
        value: function loadOneAndDelete(query, options) {
            deprecate('loadOneAndDelete - use findOneAndDelete instead');
            return this.findOneAndDelete(query, options);
        }

        /**
         * Find one document and delete it in current collection
         *
         * @param {Object} query Query
         * @param {Object} options
         * @returns {Promise}
         */

    }, {
        key: 'findOneAndDelete',
        value: function findOneAndDelete(query, options) {
            var that = this;

            if (arguments.length < 1) {
                throw new Error('findOneAndDelete requires at least 1 argument. Got ' + arguments.length + '.');
            }

            if (!options) {
                options = {};
            }

            return DB().findOneAndDelete(this.collectionName(), query, options);
        }

        /**
         * @deprecated Use `find`
         */

    }, {
        key: 'loadMany',
        value: function loadMany(query, options) {
            deprecate('loadMany - use find instead');
            return this.find(query, options);
        }

        /**
         * Find documents
         *
         * TODO: Need options to specify whether references should be loaded
         *
         * @param {Object} query Query
         * @param {Object} options
         * @returns {Promise}
         */

    }, {
        key: 'find',
        value: function find(query, options) {
            var that = this;

            if (query === undefined || query === null) {
                query = {};
            }

            if (options === undefined || options === null) {
                // Populate by default
                options = { populate: true };
            }

            return DB().find(this.collectionName(), query, options).then(function (datas) {
                var docs = that._fromData(datas);

                if (options.populate === true || isArray(options.populate) && options.populate.length > 0) {
                    return that.populate(docs, options.populate);
                }

                return docs;
            }).then(function (docs) {
                // Ensure we always return an array
                return [].concat(docs);
            });
        }

        /**
         * Get count documents in current collection by query
         *
         * @param {Object} query Query
         * @returns {Promise}
         */

    }, {
        key: 'count',
        value: function count(query) {
            var that = this;
            return DB().count(this.collectionName(), query);
        }

        /**
         * Create indexes
         *
         * @returns {Promise}
         */

    }, {
        key: 'createIndexes',
        value: function createIndexes() {
            if (this._indexesCreated) {
                return;
            }

            var that = this;
            var instance = this._instantiate();

            _.keys(instance._schema).forEach(function (k) {
                if (instance._schema[k].unique) {
                    DB().createIndex(that.collectionName(), k, { unique: true });
                }
            });

            this._indexesCreated = true;
        }
    }, {
        key: '_fromData',
        value: function _fromData(datas) {
            var instances = (0, _get3.default)(Document.__proto__ || (0, _getPrototypeOf2.default)(Document), '_fromData', this).call(this, datas);
            // This way we preserve the original structure of the data. Data
            // that was passed as an array is returned as an array, and data
            // passes as a single object is returned as single object
            var datasArray = [].concat(datas);
            var instancesArray = [].concat(instances);

            /*for (let i = 0; i < instancesArray.length; i++) {
                if (datasArray[i].hasOwnProperty('_id')) {
                    instancesArray[i]._id = datasArray[i]._id;
                } else {
                    instancesArray[i]._id = null;
                }
            }*/

            return instances;
        }

        /**
         * Clear current collection
         *
         * @returns {Promise}
         */

    }, {
        key: 'clearCollection',
        value: function clearCollection() {
            return DB().clearCollection(this.collectionName());
        }
    }]);
    return Document;
}(BaseDocument);

module.exports = Document;
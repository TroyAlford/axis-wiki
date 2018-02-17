'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deepTraverse = function deepTraverse(obj, func) {
    for (var i in obj) {
        func.apply(this, [i, obj[i], obj]);
        if (obj[i] !== null && (0, _typeof3.default)(obj[i]) == 'object') {
            deepTraverse(obj[i], func);
        }
    }
};

exports.deepTraverse = deepTraverse;
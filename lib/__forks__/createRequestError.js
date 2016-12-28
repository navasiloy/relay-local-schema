'use strict';

exports.__esModule = true;
exports.default = createRequestError;

var _formatRequestErrors = require('./formatRequestErrors');

var _formatRequestErrors2 = _interopRequireDefault(_formatRequestErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRequestError(request, requestType, payload) {
  var error = new Error('Failed to execute ' + requestType + ' `' + request.getDebugName() + '` for ' + ('the following reasons:\n\n' + (0, _formatRequestErrors2.default)(request, payload.errors)));
  error.source = payload;
  return error;
} /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

/**
 * Formats an error response from GraphQL server request.
 */
module.exports = exports['default'];
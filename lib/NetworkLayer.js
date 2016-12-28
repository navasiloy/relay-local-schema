'use strict';

exports.__esModule = true;

var _graphql = require('graphql');

var _createRequestError = require('./__forks__/createRequestError');

var _createRequestError2 = _interopRequireDefault(_createRequestError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkLayer = function () {
  function NetworkLayer(_ref) {
    var schema = _ref.schema,
        rootValue = _ref.rootValue,
        contextValue = _ref.contextValue,
        onError = _ref.onError;

    _classCallCheck(this, NetworkLayer);

    this.schema = schema;
    this.rootValue = rootValue;
    this.context = contextValue;
    this.onError = onError;
  }

  NetworkLayer.prototype.sendMutation = function sendMutation(mutationRequest) {
    if (mutationRequest.getFiles()) {
      throw new Error('uploading files not supported');
    }

    return this.executeRequest('mutation', mutationRequest);
  };

  NetworkLayer.prototype.sendQueries = function sendQueries(queryRequests) {
    var _this = this;

    return Promise.all(queryRequests.map(function (queryRequest) {
      return _this.executeRequest('query', queryRequest);
    }));
  };

  NetworkLayer.prototype.executeRequest = function executeRequest(requestType, request) {
    var _this2 = this;

    (0, _graphql.graphql)(this.schema, request.getQueryString(), this.rootValue, this.context, request.getVariables()).then(function (payload) {
      if (payload.errors) {
        //request.reject(createRequestError(request, requestType, payload));
        if (_this2.onError) {
          _this2.onError(payload.errors, request);
        }

        return;
      }

      request.resolve({ response: payload.data });
    });
  };

  NetworkLayer.prototype.supports = function supports() {
    return false;
  };

  return NetworkLayer;
}();

exports.default = NetworkLayer;
module.exports = exports['default'];
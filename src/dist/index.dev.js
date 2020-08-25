"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./env");

require("./config/db");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _json = _interopRequireDefault(require("./middlewares/json"));

var errorHandler = _interopRequireWildcard(require("./middlewares/errorHandler"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Parse incoming data

app.use(_express["default"].urlencoded({
  extended: true
}));
var APP_PORT = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '8000';
var APP_HOST = process.env.APP_HOST || '0.0.0.0';
app.set('port', APP_PORT);
app.set('host', APP_HOST);
app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION; // app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('tiny'));
app.use(_bodyParser["default"].json());
app.use(errorHandler.bodyParser);
app.use(_json["default"]); // API Routes

app.use('/api', _routes["default"]); // Error Middleware

app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed); // app.use((err, req, res, next) => {
//   res.status(err.status || 400).json({
//     error: true,
//     message: err.msg || err.message || err.detail || err,
//     status: err.status || 400,
//     errors: err
//   });
// });

app.listen(app.get('port'), app.get('host'), function () {
  console.log("Server started at http://".concat(app.get('host'), ":").concat(app.get('port'), "/api"));
}); // Catch unhandled rejections

process.on('unhandledRejection', function (err) {
  console.error('Unhandled rejection', err);
  process.exit(1);
}); // Catch uncaught exceptions

process.on('uncaughtException', function (err) {
  console.error('Uncaught exception', err);
  process.exit(1);
});
var _default = app;
exports["default"] = _default;
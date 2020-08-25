"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireWildcard(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config(); // import routes from './routes';
// import json from './middlewares/json';
// import * as errorHandler from './middlewares/errorHandler';


var app = (0, _express["default"])(); // Parse incoming data

app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _express.json)());
var APP_PORT = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '8000';
var APP_HOST = process.env.APP_HOST || '0.0.0.0';
app.set('port', APP_PORT);
app.set('host', APP_HOST);
app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION; // app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('tiny'));
app.use(_bodyParser["default"].json()); // app.use(errorHandler.bodyParser);
// app.use(json);
// API Routes
// app.use('/api', routes);
// Error Middleware
// app.use(errorHandler.genericErrorHandler);
// app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), function () {
  console.log("Server started at http://".concat(app.get('host'), ":").concat(app.get('port'), "/api"));
}); // Catch unhandled rejections

process.on('unhandledRejection', function (err) {
  console.error('Unhandled rejection', err);

  try {
    console.error(err);
  } catch (err) {
    console.error('Sentry error', err);
  } finally {
    process.exit(1);
  }
}); // Catch uncaught exceptions

process.on('uncaughtException', function (err) {
  console.error('Uncaught exception', err);

  try {
    console.error('Sentry error', err);
  } catch (err) {
    console.error('Sentry error', err);
  } finally {
    process.exit(1);
  }
});
var _default = app;
exports["default"] = _default;
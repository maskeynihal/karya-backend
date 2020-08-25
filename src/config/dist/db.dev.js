"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _bookshelf = _interopRequireDefault(require("bookshelf"));

var _kenxfile = _interopRequireDefault(require("./kenxfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Database connection.
 */
var knex = knexJs(_kenxfile["default"]);
var bookshelf = (0, _bookshelf["default"])(knex);
bookshelf.plugin(['bookshelf-virtuals-plugin']);
var _default = bookshelf;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require('dotenv').config({
  path: '../../.env'
});

var _default = {
  db_port: process.env.DB_PORT
};
exports["default"] = _default;
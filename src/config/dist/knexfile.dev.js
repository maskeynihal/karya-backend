"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seeds = exports.migrations = exports.client = exports.connection = void 0;

require('dotenv').config({
  path: '../../.env'
}); // Default configuration for database connection


var connection = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8',
  timezone: 'UTC'
};
exports.connection = connection;
console.log(process.env.DB_PORT);
var client = process.env.DB_CLIENT;
exports.client = client;
var migrations = {
  tableName: 'migrations',
  directory: '../database/migrations',
  stub: '../stubs/migration.stub'
};
exports.migrations = migrations;
var seeds = {
  directory: '../database/seeds',
  stub: '../stubs/seed.stub'
};
exports.seeds = seeds;
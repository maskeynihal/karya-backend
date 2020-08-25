"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

/**
 * Create table `roles`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
function up(knex) {
  return knex.schema.createTable('roles', function (table) {
    table.increments().primary();
    table.string('name').unique().notNullable();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}
/**
 * Drop `roles`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */


function down(knex) {
  return knex.schema.dropTable('roles');
}
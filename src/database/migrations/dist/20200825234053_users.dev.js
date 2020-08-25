"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

/**
 * Create table `users`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
function up(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.uuid('user_id').unique().notNullable();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}
/**
 * Drop `users`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */


function down(knex) {
  return knex.schema.dropTable('users');
}
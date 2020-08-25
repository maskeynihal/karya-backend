"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.up = up;
exports.down = down;

/**
 * Create table `role_user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
function up(knex) {
  return knex.schema.createTable('role_user', function (table) {
    table.integer('user_id').notNullable();
    table.integer('role_id').notNullable();
    table.foreign('user_id').references('users.id');
    table.foreign('role_id').references('roles.id');
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}
/**
 * Drop `role_user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */


function down(knex) {
  return knex.schema.dropTable('role_user');
}
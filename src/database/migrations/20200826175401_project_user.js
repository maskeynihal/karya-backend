/**
 * Create table `project_user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('project_user', (table) => {
    table.increments().primary();
    table.integer('user_id').references('users.id').unsigned().notNull();
    table.integer('project_id').references('projects.id').unsigned().notNull();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop `project_user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('project_user');
}

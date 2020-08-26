/**
 * Create table `projects`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments().primary();
    table.string('name').notNullable().unique();
    table.text('description');
    table.integer('project_manager_id').unsigned();
    table.foreign('project_manager_id').references('id').on('users');
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop `projects`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('projects');
}

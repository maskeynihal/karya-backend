/**
 * Create table `tasks`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments().primary();
    table.string('title').notNullable();
    table.text('description');
    table.timestamp('deadline').defaultTo(knex.raw('now()'));
    table.integer('project_id').references('projects.id').unsigned().notNull();
    table.integer('assignee_id').references('users.id').unsigned().notNull();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop `tasks`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tasks');
}

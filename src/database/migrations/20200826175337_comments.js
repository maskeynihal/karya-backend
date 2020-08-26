/**
 * Create table `comments`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments().primary();
    table.text('text').notNullable();
    table.integer('task_id').references('tasks.id').unsigned().notNullable();
    table.integer('commenter_id').references('users.id').unsigned().notNullable();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop `comments`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('comments');
}

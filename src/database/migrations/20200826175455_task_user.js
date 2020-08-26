/**
 * Create table `task_user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('task_user', (table) => {
    table.increments().primary();
    table.integer('task_id').references('tasks.id').unsigned().notNull();
    table.integer('user_id').references('users.id').unsigned().notNull();
    table.integer('assign_type_id').references('task_assign_types.id').unsigned().notNull();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop `task_user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('task_user');
}

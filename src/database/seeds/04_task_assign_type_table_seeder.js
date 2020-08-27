/**
 * Delete existing entries and seed values for `task_assign_types`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('task_assign_types')
    .del()
    .then(() => {
      return knex('task_assign_types').insert([
        {
          name: 'tagged'
        },
        {
          name: 'previous_assign'
        },
        {
          name: 'current_assign'
        }
      ]);
    });
}

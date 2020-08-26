/**
 * Delete existing entries and seed values for `roles`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('roles')
    .del()
    .then(() => {
      return knex('roles').insert([
        {
          name: 'admin'
        },
        {
          name: 'project_manager'
        },
        {
          name: 'team_lead'
        },
        {
          name: 'engineer'
        }
      ]);
    });
}

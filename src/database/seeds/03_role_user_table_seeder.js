/**
 * Delete existing entries and seed values for `role_user`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('role_user')
    .del()
    .then(() => {
      return knex('role_user').insert([
        {
          user_id: 1,
          role_id: 1
        },
        {
          user_id: 2,
          role_id: 2
        },
        {
          user_id: 3,
          role_id: 3
        },
        {
          user_id: 4,
          role_id: 4
        }
      ]);
    });
}

import { uniqueId } from 'lodash';
import hash from '../utils/hashPassword';

/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('table_name')
    .del()
    .then(() => {
      return knex('table_name').insert([
        {
          name: 'admin',
          email: 'admin@karya.com',
          user_id: uniqueId(),
          password: hash(password)
        }
      ]);
    });
}

import hashPassword from '../../utils/hashPassword';
import { v4 as uuid } from 'uuid';

/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          name: 'admin',
          email: 'admin@karya.com',
          password: hashPassword('password'),
          user_id: uuid()
        }
      ]);
    });
}

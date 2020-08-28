import Boom from '@hapi/boom';

import User from '@/models/user';
import { uniqueId } from 'lodash';
import { v4 as uuid } from 'uuid';
import hashPassword from '@/utils/hashPassword';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return User.fetchAll({
    withRelated: ['role', 'projects', 'tasksAssigns', 'tasksTags', 'comments']
  });
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return new User({ id })
    .fetch({
      withRelated: ['role', 'projects', 'tasksAssigns', 'tasksTags', 'comments']
    })
    .then((user) => user.serialize())
    .catch(User.NotFoundError, () => {
      throw Boom.notFound('User not found');
    });
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUserByEmail(email) {
  return new User({ email })
    .fetch({ withRelated: ['role'] })
    .then((user) => user)
    .catch(User.NotFoundError, () => {
      throw Boom.notFound('User not found');
    });
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createUser(user) {
  return new User({
    name: user.name,
    email: user.email,
    password: hashPassword(user.password),
    user_id: uuid()
  }).save();
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name, email: user.email, password: user.password });
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then((user) => user.destroy());
}

/**
 * Get a users by their roles.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchByRole(roleId) {
  if (!roleId) return getAllUsers();
  const users = await getAllUsers();
  return users.serialize().filter((user) => {
    return user.role.length && user.role[0].id === roleId;
  });
}

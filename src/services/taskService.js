import Boom from '@hapi/boom';

import Task from '@/models/task';
import { uniqueId } from 'lodash';
import { v4 as uuid } from 'uuid';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllTasks() {
  return Task.fetchAll({
    withRelated: ['assignedUser', 'project', 'taggedUsers']
  });
}

/**
 * Get a task.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getTask(id) {
  return new Task({ id })
    .fetch()
    .then((task) => task)
    .catch(Task.NotFoundError, () => {
      throw Boom.notFound('Task not found');
    });
}

/**
 * Create new task.
 *
 * @param   {Object}  task
 * @returns {Promise}
 */
export function createTask(task) {
  return new Task({
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    project_id: task.project_id,
    assignee_id: task.assignee_id
  }).save();
}

/**
 * Update a task.
 *
 * @param   {Number|String}  id
 * @param   {Object}         task
 * @returns {Promise}
 */
export function updateTask(id, task) {
  return new Task({ id }).save({ ...task });
}

/**
 * Delete a task.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteTask(id) {
  return new Task({ id }).fetch().then((task) => task.destroy());
}

import Boom from '@hapi/boom';

import Task from '@/models/task';
import { uniqueId } from 'lodash';
import { v4 as uuid } from 'uuid';

const ASSIGN_TYPE_TAG = 1;
/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllTasks() {
  return Task.fetchAll({
    withRelated: ['assignedUser', 'project', 'taggedUsers', 'comments.commenter']
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
    .fetch({ withRelated: ['assignedUser', 'taggedUsers', 'comments.commenter'] })
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
export async function updateTask(id, task) {
  const fetchedTask = await new Task({ id }).fetch();
  return fetchedTask.save(
    { ...task },
    {
      patch: true,
      method: 'update'
    }
  );
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

/**
 * Tag User on task.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export async function addTaggedUsers(id, { users }) {
  const usersInsert = users.map((user) => {
    return { ...user, assign_type_id: ASSIGN_TYPE_TAG };
  });
  const taskTaggedUsers = await new Task({ id }).taggedUsers();
  await taskTaggedUsers.detach(usersInsert);
  return taskTaggedUsers.attach(usersInsert);
}

/**
 * Remove tagged users from task
 */
export function removeTaggedUsers(id, { users }) {
  return new Task({ id }).taggedUsers().detach(users);
}

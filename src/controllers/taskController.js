import HttpStatus from 'http-status-codes';

import * as taskService from '@/services/taskService';

/**
 * Get all tasks.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  taskService
    .getAllTasks()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a task by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  taskService
    .getTask(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Create a new task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  taskService
    .createTask(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Update a task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function update(req, res, next) {
  const task = taskService
    .updateTask(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteTask(req, res, next) {
  taskService
    .deleteTask(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}

/**
 * Add Project User
 */

export function addTaggedUsers(req, res, next) {
  taskService
    .addTaggedUsers(req.params.id, req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data, success: true, message: 'Tag added for users' }))
    .catch((err) => next(err));
}

/**
 * Delete Project User
 */

export function removeTaggedUsers(req, res, next) {
  taskService
    .removeTaggedUsers(req.params.id, req.body)
    .then((data) => res.status(HttpStatus.OK).json({ data, success: true, message: 'Tag removed for users' }))
    .catch((err) => next(err));
}

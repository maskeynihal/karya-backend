import HttpStatus from 'http-status-codes';

import * as projectService from '@/services/projectService';

/**
 * Get all projects.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  projectService
    .getAllProjects()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a project by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  projectService
    .getProject(req.params.id)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Create a new project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  projectService
    .createProject(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Update a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  projectService
    .updateProject(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteProject(req, res, next) {
  projectService
    .deleteProject(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}

/**
 * Add Project User
 */

export function addUsers(req, res, next) {
  projectService
    .addUsers(req.params.id, req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data, success: true, message: 'Users added to projects' }))
    .catch((err) => next(err));
}

/**
 * Delete Project User
 */

export function removeUsers(req, res, next) {
  projectService
    .removeUsers(req.params.id, req.body)
    .then((data) => res.status(HttpStatus.OK).json({ data, success: true, message: 'User deleted from project' }))
    .catch((err) => next(err));
}

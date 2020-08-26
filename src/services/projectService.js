import Boom from '@hapi/boom';

import Project from '@/models/project';
import { uniqueId } from 'lodash';
import { v4 as uuid } from 'uuid';
import hashPassword from '@/utils/hashPassword';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllProjects() {
  return Project.fetchAll();
}

/**
 * Get a project.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getProject(id) {
  return new Project({ id })
    .fetch()
    .then((project) => project)
    .catch(Project.NotFoundError, () => {
      throw Boom.notFound('Project not found');
    });
}

/**
 * Get a project.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getProjectByEmail(email) {
  return new Project({ email })
    .fetch()
    .then((project) => project)
    .catch(Project.NotFoundError, () => {
      throw Boom.notFound('Project not found');
    });
}

/**
 * Create new project.
 *
 * @param   {Object}  project
 * @returns {Promise}
 */
export function createProject(project) {
  return new Project({
    name: project.name,
    email: project.email,
    password: hashPassword(project.password),
    user_id: uuid()
  }).save();
}

/**
 * Update a project.
 *
 * @param   {Number|String}  id
 * @param   {Object}         project
 * @returns {Promise}
 */
export function updateProject(id, project) {
  return new Project({ id }).save({ name: project.name });
}

/**
 * Delete a project.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteProject(id) {
  return new Project({ id }).fetch().then((project) => project.destroy());
}

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
  return Project.fetchAll({
    withRelated: ['tasks', 'projectManager', 'users'],
    debug: true
  });
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
 * Create new project.
 *
 * @param   {Object}  project
 * @returns {Promise}
 */
export function createProject(project) {
  return new Project({
    name: project.name,
    description: project.description,
    project_manager_id: project.project_manager_id
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
  return new Project({ id }).save({ ...project });
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

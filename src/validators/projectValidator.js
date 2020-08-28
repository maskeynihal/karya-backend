import Joi from '@hapi/joi';

import validate from '@/utils/validate';
import * as projectService from '@/services/projectService';
import { columnUniqueCheck, columnUniqueCheckWithIgnore } from '@/utils/columnUniqueCheck';
import Project from 'models/project';
import shouldBeProjectManger from './rules/shouldBeProjectManager';

// Validation schema
const schema = Joi.object({
  name: Joi.string().max(140).required(),
  description: Joi.string(),
  project_manager_id: Joi.alternatives(Joi.number(), Joi.string())
});

/**
 * Validate create/update project request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function projectValidator(req, res, next) {
  try {
    const validation = await validate(req.body, schema);
    const uniqueColumn = await columnUniqueCheck(new Project(), 'name', req.body.name);
    const isProjectManger = await shouldBeProjectManger(req.body.project_manager_id);
    next();
    return validation;
  } catch (error) {
    next(error);
  }
}

/**
 * Validate update project request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function projectUpdateValidator(req, res, next) {
  try {
    const validation = await validate(req.body, schema);
    const uniqueColumn = await columnUniqueCheckWithIgnore(new Project(), 'name', req.body.name, req.params.id);
    const isProjectManger = await shouldBeProjectManger(req.body.project_manager_id);
    next();
    return validation;
  } catch (error) {
    next(error);
  }
}

/**
 * Validate projects existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findProject(req, res, next) {
  return projectService
    .getProject(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

export { findProject, projectValidator, projectUpdateValidator };

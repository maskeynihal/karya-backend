import Joi from '@hapi/joi';

import validate from '@/utils/validate';
import * as projectService from '@/services/projectService';
import columnUniqueCheck from '@/utils/columnUniqueCheck';
import Project from 'models/project';

// Validation schema
const schema = Joi.object({
  name: Joi.string().label('Project Name').max(140).required(),
  description: Joi.string(),
  project_manager_id: Joi.number()
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

export { findProject, projectValidator };

import Joi from '@hapi/joi';

import validate from '@/utils/validate';
import * as taskService from '@/services/taskService';
import Task from 'models/task';

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(140).required(),
  description: Joi.string(),
  deadline: Joi.date(),
  project_id: Joi.number(),
  assignee_id: Joi.number()
});

/**
 * Validate create/update task request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function taskValidator(req, res, next) {
  try {
    const validation = await validate(req.body, schema);
    next();
    return validation;
  } catch (error) {
    next(error);
  }
}

/**
 * Validate update task request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function taskUpdateValidator(req, res, next) {
  try {
    const validation = await validate(req.body, schema);
    next();
    return validation;
  } catch (error) {
    next(error);
  }
}

/**
 * Validate tasks existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findTask(req, res, next) {
  return taskService
    .getTask(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

export { findTask, taskValidator, taskUpdateValidator };

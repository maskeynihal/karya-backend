import Joi from '@hapi/joi';

import validate from '@/utils/validate';
import * as commentService from '@/services/commentService';
import Comment from '@/models/comment';

// Validation schema
const schema = Joi.object({
  text: Joi.string().max(280).required(),
  task_id: Joi.number(),
  commenter_id: Joi.number()
});

/**
 * Validate create/update comment request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function commentValidator(req, res, next) {
  try {
    const validation = await validate(req.body, schema);
    next();
    return validation;
  } catch (error) {
    next(error);
  }
}

/**
 * Validate update comment request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function commentUpdateValidator(req, res, next) {
  try {
    const validation = await validate(req.body, schema);
    next();
    return validation;
  } catch (error) {
    next(error);
  }
}

/**
 * Validate comments existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findComment(req, res, next) {
  return commentService
    .getComment(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

export { findComment, commentValidator, commentUpdateValidator };

import Joi from '@hapi/joi';

import validate from '@/utils/validate';
import * as userService from '@/services/userService';
import { columnUniqueCheck, columnUniqueCheckWithIgnore } from '@/utils/columnUniqueCheck';
import User from '@/models/user';

// Validation schema
const schema = Joi.object({
  name: Joi.string().label('Name').max(90).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  user_id: Joi.string(),
  role_id: Joi.alternatives(Joi.number(), Joi.string())
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function userValidator(req, res, next) {
  try {
    const validation = await validate(req.body, schema);
    const uniqueColumn = await columnUniqueCheck(new User(), 'email', req.body.email);
    next();
    return validation;
  } catch (error) {
    next(error);
  }
}

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function userUpdateValidator(req, res, next) {
  try {
    const validation = await validate(req.body, schema);
    const uniqueColumn = await columnUniqueCheckWithIgnore(new User(), 'email', req.body.email, req.params.id);
    next();
    return validation;
  } catch (error) {
    next(error);
  }
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

export { findUser, userValidator, userUpdateValidator };

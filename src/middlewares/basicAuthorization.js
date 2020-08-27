import * as userService from '@/services/userService';
import Boom from '@hapi/boom';

// authorization based on roles

export default (allowRoles) => {
  return async function (req, res, next) {
    try {
      const user = await userService.getUser(req.headers.user_id);
      const userRoleId = user.role[0].id;
      if (allowRoles.includes(userRoleId)) {
        next();
      } else {
        throw Boom.unauthorized('You are not authorized to perform this action');
      }
    } catch (error) {
      next(error);
    }
  };
};

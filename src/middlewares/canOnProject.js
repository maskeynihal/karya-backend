import { verify } from 'jsonwebtoken';
import HttpToken from 'http-status-codes';
import * as userService from '@/services/userService';
import * as projectService from '@/services/projectService';
import Boom from '@hapi/boom';
import { UNAUTHORIZED_ACTION_MESSAGE } from '@/utils/constants';
import { ADMIN_ROLE_ID } from 'utils/constants';

// to check if the user can view the given project
export default async (req, res, next) => {
  try {
    const user = await userService.getUser(req.headers.user_id);

    const userRoleId = user.role[0].id;
    // if admin pass
    if (userRoleId === ADMIN_ROLE_ID) {
      return next();
    }

    const project = await projectService.getProject(req.params.id);

    // project doesnt belong to user
    if (project.project_manager_id !== user.id) {
      throw Boom.unauthorized(UNAUTHORIZED_ACTION_MESSAGE);
    }

    // pass the execution
    return next();
  } catch (error) {
    return next(error);
  }
};

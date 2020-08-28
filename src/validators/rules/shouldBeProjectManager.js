import * as userService from '@/services/userService';
import Boom from '@hapi/boom';

const PROJECT_MANAGER_ROLE_ID = 2;

export default async (id) => {
  const user = await userService.getUser(id);
  user.role.map((r) => {
    if (r.id !== PROJECT_MANAGER_ROLE_ID) {
      throw Boom.conflict('The selected user for project manager dont have role of project manager');
    }
    return true;
  });
};

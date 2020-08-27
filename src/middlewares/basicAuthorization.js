import * as userService from '@/services/userService';
// authorization based on roles
export default async (req, res, next) => {
  const user = userService.getUser(req.headers.user_id);
  console.log(user);
  next();
};

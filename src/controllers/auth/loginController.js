import validatePassword from '@/utils/validatePassword';
import generateToken from '@/utils/generateToken';
import * as userService from '@/services/userService';
import Boom from '@hapi/boom';
import { OK } from 'http-status-codes';

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!validatePassword(password, user.attributes.password)) {
      throw Boom.badRequest('No such credentials found');
    }

    const token = generateToken(user.serialize());

    res.status(OK).json({
      message: 'User Login Successful',
      error: false,
      data: {
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

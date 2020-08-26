import { verify } from 'jsonwebtoken';
import HttpToken from 'http-status-codes';
import * as userService from '@/services/userService';
import Boom from '@hapi/boom';

export default async (req, res, next) => {
  try {
    // Gather the access token from the request header
    const token = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token'];
    // if there isn't any token
    if (!token) {
      throw Boom.unauthorized('Unauntenticated');
    }

    // verify token if provided
    const data = verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await userService.getUserByEmail(data.email);

    if (user.attributes.email !== data.email) {
      throw Boom.unauthorized('Unauntenticated');
    }

    req.headers = { ...req.headers, user_id: user.attributes.id, user_uuid: user.attributes.user_id };

    next(); // pass the execution
  } catch (error) {
    console.log(error);
    next(error);
  }
};

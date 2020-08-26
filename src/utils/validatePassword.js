import { compareSync } from 'bcrypt';
import hashPassword from './hashPassword';

export default (password, hashPassword) => {
  return compareSync(password, hashPassword);
};

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default (password) => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
};

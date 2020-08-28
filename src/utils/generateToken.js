import { sign } from 'jsonwebtoken';

export default (data) => {
  console.log(data);
  return sign({ email: data.email, userId: data.id, role: data.role[0]?.id || 1 }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '36400s'
  });
};

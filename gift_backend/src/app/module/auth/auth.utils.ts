import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const createToken = (
  jwtPayload: { userId: string; email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret, function (err) {
    if (err) throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  });
};

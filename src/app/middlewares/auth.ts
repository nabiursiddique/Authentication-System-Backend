import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // checking the token
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // verifying jwt access token
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        // we can access user from any where in req
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;

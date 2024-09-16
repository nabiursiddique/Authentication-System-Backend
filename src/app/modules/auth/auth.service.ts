import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TUserSignIn } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const signInUserIntoDB = async (payload: TUserSignIn) => {
  // checking if the user exists (using statics method of mongoose)
  const user = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // checking if the user is delete or not
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // checking if the password is correct or not
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  // Creating jwt token and sending it to the client
  const jwtPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return { accessToken };
};

export const AuthServices = {
  signInUserIntoDB,
};

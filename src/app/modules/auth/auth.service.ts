import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TUserSignIn } from './auth.interface';
import bcrypt from 'bcrypt';

const signInUserIntoDB = async (payload: TUserSignIn) => {
  // checking if the user exists
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // checking if the user is delete or not
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // checking if the password is correct or not
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }
  console.log(isPasswordMatched);
};

export const AuthServices = {
  signInUserIntoDB,
};

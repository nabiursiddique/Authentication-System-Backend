import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/appError';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import { createToken } from '../auth/auth.utils';

const createUserIntoDB = async (payload: TUser) => {
  // checking if the user exists (using statics method of mongoose)
  const user = await User.isUserExistsByEmail(payload?.email);
  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is already exists!');
  }

  // converting plain password into hash password
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );
  payload.password = hashPassword;
  const newUser = await User.create(payload);

  // Creating jwt token and sending it to the client
  const jwtPayload = {
    userId: newUser?._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };

  // creating access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // creating refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};

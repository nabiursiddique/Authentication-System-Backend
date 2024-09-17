import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  isDeleted: boolean;
}

// function definition for find a user using statics method
export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

import { Model } from 'mongoose';

type UserRole = 'admin' | 'user';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
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

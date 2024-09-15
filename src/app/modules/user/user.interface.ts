type UserRole = 'admin' | 'user';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  isDeleted: boolean;
};

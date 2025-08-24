// src/types/user.ts
export type UserRole = 'admin' | 'customer';

export interface IUser {
  email: string;
  password: string;
  name?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  otp?: string;
  otpExpiry?: Date;
  isVerified?: boolean;
}

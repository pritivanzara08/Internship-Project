// src/types/user.ts
export type UserRole = 'admin' | 'customer';

export interface IUser {
  email?: string;
  password: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  country?: string;
  contactNo?: string;
  referral?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  otp?: string;
  otpExpiry?: Date;
  isVerified?: boolean;
}

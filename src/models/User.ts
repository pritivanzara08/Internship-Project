import { Schema, model, models } from 'mongoose';

export type UserRole = 'admin' | 'customer';
export interface IUser {
email: string;
passwordHash: string;
name?: string;
role: UserRole;
createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
email: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
name: { type: String, required: false },
role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
createdAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>('User', UserSchema);
export default User;


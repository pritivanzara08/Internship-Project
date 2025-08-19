import bcrypt from 'bcryptjs';
import { Schema, model, models } from 'mongoose';

export type UserRole = 'admin' | 'customer';

export interface IUser {
email: string;
passwordHash: string;
name?: string;
role: UserRole;
createdAt?: Date;
updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
    comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
    {
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        name: { type: String, required: false },
        role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    },
    {
        timestamps: true,
    }
);

//compare password function
UserSchema.methods.comparePassword = async function (this: IUserDocument, candidate: string) {
    return bcrypt.compare(candidate, this.passwordHash);
};

const User = (models.User as import("mongoose").Model<IUserDocument>) || model<IUserDocument>('User', UserSchema);

export default User;


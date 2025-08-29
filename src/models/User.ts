import bcrypt from "bcryptjs";
import mongoose, { Schema, model, models, Document } from "mongoose";
import { IUser } from "@/types/User";

export interface IUserDocument extends IUser, Document {
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional until OTP verified
    name: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    landmark: { type: String },
    city: { type: String },
    state: { type: String },
    pinCode: { type: String },
    country: { type: String },
    contactNo: { type: String },
    referral: { type: String },

    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    otp: { type: String },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// compare password
UserSchema.methods.comparePassword = async function (
  this: IUserDocument,
  candidate: string
) {
  return bcrypt.compare(candidate, this.password);
};

const User =
  (models.User as mongoose.Model<IUserDocument>) ||
  model<IUserDocument>("User", UserSchema);

export default User;

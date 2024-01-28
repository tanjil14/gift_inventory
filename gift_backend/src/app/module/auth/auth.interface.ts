import { Model, Types } from 'mongoose';

export type TUser = {
  _id?: Types.ObjectId;
  id?: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  isDeleted?: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

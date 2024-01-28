import { Model } from 'mongoose';

export type TUser = {
  _id: string;
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

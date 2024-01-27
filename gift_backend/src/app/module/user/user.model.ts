import bcrypt from 'bcrypt';
import { Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import { model } from "mongoose";
import config from '../../config';





const userSchema=new Schema<TUser,UserModel>({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        select: 0,
      },
      passwordChangedAt: {
        type: Date,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    
},{
    timestamps: true,
  })

  userSchema.pre('save',async function(next){
    const user=this;
    user.password=await bcrypt.hash(
        user.password,Number(config.bcrypt_salt_rounds)
    );
    next()
  })

  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

  userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
  };

  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };

  userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };

export const User=model<TUser,UserModel>('User',userSchema)
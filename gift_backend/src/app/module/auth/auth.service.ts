
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { User } from "../user/user.model";



const loginUser = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user?.id!,
    email: user.email
  }

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string,
    config.jwt_access_expires_in as string);

  const refreshToken = createToken(jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string)

  return {
    accessToken,
    refreshToken,
  };
}


const refreshToken=async(token:string)=>{
  const decoded=verifyToken(token,config.jwt_refresh_secret as string);
  console.log(decoded)
  const {email,iat}=decoded;

  const user=await User.isUserExistsByEmail(email)

  if(!user){
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id!,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
}



export const AuthServices = {
  loginUser,refreshToken
}
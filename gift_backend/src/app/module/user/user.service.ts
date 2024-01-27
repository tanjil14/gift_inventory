
import AppError from "../../errors/AppError";
import { generateId } from "../../utils/IdGenerator";
import { TUser } from "./user.interface";
import { User } from "./user.model";



const createUserIntoDB=async(payload:TUser)=>{

    const userData={...payload};
     userData.id=generateId('G-',4);
   if(await User.isUserExistsByEmail(payload.email)){
    throw new AppError(403, 'This email is already exist!');
   }

   const result=  await User.create(userData)
   return result
}


export const UserServices={
    createUserIntoDB
}
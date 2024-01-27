import { Model } from "mongoose";



export type TGift = {

    name:string,
    price: number,
    quantity:number,
    occasion?:string,
    recipient?: string,
    category?: string,
    theme?: string,
    brand?: string,

}

// export interface UserModel extends Model<TGift>{

// }

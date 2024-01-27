

class AppError extends Error{
    public statusCode:number;

    constructor(statusCode:number,message:string,stact=''){
        super(message)
        this.statusCode=statusCode;

        if(stact){
            this.stack=stact;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export default AppError;
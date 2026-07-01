import { NextFunction, Request, Response } from "express";
import { cathasync } from "../../utils/catchasynfn";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { authServices } from "./auth.services";

const loginUser = cathasync(async (req: Request, res: Response , next: NextFunction)=>{

    const user = await authServices.loginIntoDb(req.body);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data:{
            user
        }
    })

})

export const authController = { 
    loginUser
}
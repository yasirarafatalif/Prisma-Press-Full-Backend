import { Request, Response } from "express";
import { userServices } from "./user.services";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const createUser = async (req : Request, res : Response) => {
    try {
        const payload = req.body;

        const user = await userServices.createUserIntoDB(payload);

        res.status(StatusCodes.CREATED).json({
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "User registered successfully",
            data: {
                user
            }
        });
    } catch (error) {
        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Failed to register user",
            error: (error as Error).message
        })

    }
};

const getUser = async (req : Request, res : Response) => {


    try {
        const userData = await userServices.getUserIntoDB();
        res.status(StatusCodes.OK).json({ message: "User retrieved successfully" ,
            data: userData
        });
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error occurred while retrieving user" });
    }
}

export const userController = {
    createUser,
    getUser
};
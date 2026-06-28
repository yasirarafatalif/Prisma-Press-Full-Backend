import { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req : Request, res : Response) => {
    const payload = req.body;
    try {
        const userData = await userServices.createUserIntoDB(payload);
        res.status(200).json({ message: "User created successfully", data: userData });
    } catch (error) {
        res.status(500).json({ message: "Error occurred while creating user" });
    }
};

const getUser = async (req : Request, res : Response) => {


    try {
        const userData = await userServices.getUserIntoDB();
        res.status(200).json({ message: "User retrieved successfully" ,
            data: userData
        });
        
    } catch (error) {
        res.status(500).json({ message: "Error occurred while retrieving user" });
    }
}

export const userController = {
    createUser,
    getUser
};
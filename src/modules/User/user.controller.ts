import { NextFunction, Request, response, Response } from "express";
import { userServices } from "./user.services";
import { StatusCodes } from "http-status-codes";
import { cathasync } from "../../utils/catchasynfn";
import { sendResponse } from "../../utils/sendResponse";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";

// const createUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;

//     const user = await userServices.createUserIntoDB(payload);

//     res.status(StatusCodes.CREATED).json({
//       success: true,
//       statusCode: StatusCodes.CREATED,
//       message: "User registered successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
//       message: "Failed to register user",
//       error: (error as Error).message,
//     });
//   }
// };

const createUser = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userServices.createUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User registered successfully",
      data: { user },
    });
  },
);

const getProfile = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const profileData = await userServices.getProfileIntoDB(user.id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Profile retrive successfully",
      data: { profileData },
    });
  },
);

const getUser = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = await userServices.getUserIntoDB();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User retrive successfully",
      data: { userData },
    });
  },
);

export const userController = {
  createUser,
  getUser,
  getProfile
};

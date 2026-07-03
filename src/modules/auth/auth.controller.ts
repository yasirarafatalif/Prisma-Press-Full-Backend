import { NextFunction, Request, Response } from "express";
import { cathasync } from "../../utils/catchasynfn";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { authServices } from "./auth.services";

const loginUser = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = await authServices.loginIntoDb(
      req.body,
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1 *24  * 60 * 60 * 1000, // 1 day
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: { accessToken, refreshToken },
    });
  },
);
const refreshToken = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const { accessToken } = await authServices.refreshToken(refreshToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1 *24  * 60 * 60 * 1000, // 1 day
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Access token refreshed successfully",
      data: { accessToken },
    });
  },
);

export const authController = {
  loginUser,
  refreshToken
};

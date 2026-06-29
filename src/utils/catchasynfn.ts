import { NextFunction, Request ,RequestHandler,Response} from "express";
import { StatusCodes } from "http-status-codes";

export const cathasync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error) {
      console.log(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to register user",
        error: (error as Error).message,
      });
    }
  };
};
import { NextFunction, Request, Response } from "express";
import { cathasync } from "../../utils/catchasynfn";
import { commentsService } from "./commets.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

 const createComment = cathasync(async (req: Request, res: Response , next : NextFunction)=> {

    const userId = req.user?.id;
    const payload = req.body;
    const result = await commentsService.createComment(userId as string, payload);

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.CREATED,
        message : "Comment Created Successfully",
        data : result
    })

 })
 const getCommentByAuthorId = cathasync(async (req: Request, res: Response , next : NextFunction)=> {

 })
 const getCommentByPostId = cathasync(async (req: Request, res: Response , next : NextFunction)=> {

 })
 const updateComment = cathasync(async (req: Request, res: Response , next : NextFunction)=> {

 })
 const deleteComment = cathasync(async (req: Request, res: Response , next : NextFunction)=> {

 })
 const moderateComment = cathasync(async (req: Request, res: Response , next : NextFunction)=> {

 })
 
 export const commentController={
    createComment,
    getCommentByAuthorId,
    getCommentByPostId,
    updateComment,
    deleteComment,
    moderateComment

}
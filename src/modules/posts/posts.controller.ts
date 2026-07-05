import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { cathasync } from "../../utils/catchasynfn";
import { postsServices } from "./posts.services";
import { sendResponse } from '../../utils/sendResponse';

const createPost = cathasync(async (req: Request, res: Response , next:NextFunction) => {
    const userId = req.user?.id;

    const  post = await postsServices.createpost(req.body, userId as string);

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.CREATED,
        message : "Post Created Successfully",
        data : post
    })
});

const getAllPosts = cathasync(async (req : Request, res : Response, next : NextFunction) => {
    const result = await postsServices.getAllPosts();

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Posts Retrieved Successfully",
        data : result
    })
})
const getPostById = cathasync(async (req : Request, res : Response, next : NextFunction) => {
    const postId = req.params.id;

    if(!postId){
        throw new Error("Post Id Required In Params")
    }

    const result = await postsServices.getPostById(postId as string);

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post retrieved successfuly",
        data : result
    })
})

const getMyPots = cathasync(async (req : Request, res : Response, next : NextFunction) => {
    const userId = req.user?.id;
    console.log(userId)
    const result = await postsServices.getMyPots(userId as string);

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "My Posts retrieved successfully",
        data : result
    })
});

const updatePost = cathasync(async (req: Request, res: Response , next:NextFunction) => {

});
const deletePost = cathasync(async (req: Request, res: Response , next:NextFunction) => {

});
export const postController = { createPost, getAllPosts, getPostById, getMyPots, updatePost, deletePost }
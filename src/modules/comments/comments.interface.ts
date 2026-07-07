import { CommentStatus } from "../../../generated/prisma/browser";

export interface ICreateCommentPayload {
    postId: string;
    authorId: string;
    content: string;
}

export interface IUpdateCommentPayload { 
    content ?: string, 
    status ?: CommentStatus 
}

export interface IModerateCommentPayload {
    status: CommentStatus
}
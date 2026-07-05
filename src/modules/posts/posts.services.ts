import { prisma } from "../../lib/prisma";
import { Post } from "./posts.interface";

const createpost = async (payload: Post, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return posts;
};
const getPostById = async (postId: string) => {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return post;
};
const updatePost = async (id: string, payload: any) => {
  // Implementation for updating a post
};
const deletePost = async (id: string) => {
  // Implementation for deleting a post
};

export const postsServices = {
  createpost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

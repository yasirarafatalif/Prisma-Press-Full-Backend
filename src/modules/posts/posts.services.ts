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
    // exact match
    // where:{
    //   title:{
    //     contains: "Getting Started with Prisma",
    //   }
    // },

    // partial match
    // where: {
    //   tags:{
    //     hasSome: ["prisma" , "postgresql", "nodejs"]
    //   }
    // },

    // filtering / exact match with AND Operator
    // where:{
    //   AND:[
    //     {
    //       status:"PUBLISHED"
    //     },
    //     {
    //       tags: {
    //        hasSome:["prisma"]
    //       }
    //     }
    //   ]

    // },

    // searching / partial search with OR operator

    // where: {
    //   OR: [
    //     {
    //       content: {
    //         contains: "prisma",
    //         mode: "insensitive",
    //       },
    //     },
    //     {
    //       title: {
    //         contains: "gett",
    //         mode: "insensitive",
    //       },
    //     },
    //   ],
    // },

    //combining search (OR Operator) and filtering (AND) 

    where:{

      AND:[
        {
          OR:[
            {
              views: 0
            },
            {
              status:"ARCHIVED"
            }
          ]
        },
        {
          tags:{
            hasSome:["nodejs"]
          }
        }
      ]

    },

    orderBy: {
      createdAt: "asc",
    },
    include: {
      comments: true,
    },
  });

  return posts;
};
const getPostById = async (postId: string) => {
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

  return post;
};

const getMyPots = async (userId: string) => {
  const post = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,

      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  if (!post) {
    throw new Error("No Post Found");
  }
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
  getMyPots,
};

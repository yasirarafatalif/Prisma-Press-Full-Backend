import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IPostQuery, Post } from "./posts.interface";

const createpost = async (payload: Post, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getAllPosts = async (query: IPostQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const tags = query.tags ? JSON.parse(query.tags as string) : null;
  const tagsArray = Array.isArray(tags) ? tags : [];

  const andConditions: PostWhereInput[] = [];

  if (query.title) {
    andConditions.push({
      title: query.title,
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }
  if (query.tags) {
    andConditions.push({
      tags: {
        hasSome: tagsArray,
      },
    });
  }
  if (query.authorId) {
    andConditions.push({
      authorId: query.authorId,
    });
  }

  if (query.isFeatured) {
    andConditions.push({
      isFeatured: Boolean(query.isFeatured),
    });
  }

  if (query.searchTerm) {
    andConditions.push({
      AND: [
        {
          OR: [
            {
              title: {
                contains: query.searchTerm,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: query.searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    });
  }

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

    // static mode

    // where: {
    //   AND: [
    //     {
    //       OR: [
    //         {
    //           views: 0,
    //         },
    //         {
    //           status: query.status,
    //         },
    //       ],
    //     },
    //     {
    //       tags: {
    //         hasSome: ["nodejs"],
    //       },
    //     },
    //   ],
    // },

    // dynamic mode
    where: {
      AND: andConditions,
    },

    take: limit,
    skip: skip,

    // static mode
    // orderBy: {
    //   createdAt: "asc",
    // },

    //dynamic mode
    orderBy: {
      [sortBy]: sortOrder,
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

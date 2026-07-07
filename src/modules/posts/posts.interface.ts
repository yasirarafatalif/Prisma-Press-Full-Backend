import { PostStatus } from "../../../generated/prisma/browser";
import { PostWhereInput } from "../../../generated/prisma/models";

export interface Post {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus;
  tags: string[];
}

export interface IPostQuery extends PostWhereInput {
    searchTerm?: string
    page?: string
    limit?: string
    sortOrder?: string
    sortBy?: string
} 
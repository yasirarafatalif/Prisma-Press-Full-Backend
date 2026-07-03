import { PostStatus } from "../../../generated/prisma/browser";

export interface Post {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus;
  tags: string[];
  authorId: string;
}

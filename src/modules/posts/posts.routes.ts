import { Router } from "express";
import { postController } from "./posts.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/browser";


const router = Router();

router.get("/", postController.getAllPosts);
router.post("/", auth(Role.USER, Role.ADMIN), postController.createPost);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export const postsRoutes = router;
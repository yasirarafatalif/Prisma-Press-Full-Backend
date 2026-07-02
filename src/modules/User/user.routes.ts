import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role} from "../../../generated/prisma/enums";

const router = Router();

router.get("/", userController.getUser);
router.post("/register", userController.createUser);
router.get("/profile", auth(Role.USER), userController.getProfile);

export const userRoutes = router;
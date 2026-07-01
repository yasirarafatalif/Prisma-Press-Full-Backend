import cookieParser from "cookie-parser";
import express, { Application, Request ,Response} from "express";
import cors from "cors";
import { userRoutes } from "./modules/User/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app : Application = express();
app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
    res.send("Server is running!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);



export default app;
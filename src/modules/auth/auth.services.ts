import { prisma } from "../../lib/prisma";
import { ILoginPayload } from "./auth.interface";


const loginIntoDb = async (payload: ILoginPayload) => {
    const { email, password } = payload;
    console.log(payload)
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
};

export const authServices = {
    loginIntoDb
};
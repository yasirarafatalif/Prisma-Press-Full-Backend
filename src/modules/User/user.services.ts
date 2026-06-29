import config from "../../config";
import { prisma } from "../../lib/prisma";
import { User } from "./user.interface";
import bcrypt from "bcrypt";



const getUserIntoDB = async () => {
    const userData = await prisma.user.findMany({
        where: {
            role: "USER"
        }
    });

    return userData;
   
}

const createUserIntoDB = async (payload: User) => {
    const { name, email, password, profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (isUserExist) {
        throw new Error("User with this email already exists");
    }
     const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    await prisma.profile.create({
        data: {
            userId: createdUser.id,
            profilePhoto
        }
    })
    return createdUser;
}


export const userServices = {
    getUserIntoDB,
    createUserIntoDB
}

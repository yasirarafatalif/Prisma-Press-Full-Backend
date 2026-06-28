import { prisma } from "../../lib/prisma";
import { User } from "./user.interface";
// import bcrypt from "bcryptjs";



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
    console.log(payload)
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (isUserExist) {
        throw new Error("User with this email already exists");
    }
    // const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const userData = await prisma.user.create({
        data: {
            name,
            email,
            password,
            profilePhoto
        }
    });
    return userData;
}


export const userServices = {
    getUserIntoDB,
    createUserIntoDB
}

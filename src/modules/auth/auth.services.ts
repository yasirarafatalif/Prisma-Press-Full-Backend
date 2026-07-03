
import bcrypt  from 'bcrypt';
import { prisma } from "../../lib/prisma";
import { ILoginPayload } from "./auth.interface";
import config from '../../config';
import jwt ,{ JwtPayload, SignOptions } from 'jsonwebtoken';
import { jwtUtils } from '../../utils/jwt';


const loginIntoDb = async (payload: ILoginPayload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    });
    const matchedPassword = bcrypt.compareSync(password, user.password );
    if(!matchedPassword) {
        throw new Error("Password is incorrect");
    }
    const jwtPayload={
        id: user.id,
        email: user.email,
        role: user.role
    }

    // const accessToken = jwt.sign(jwtPayload,config.jwt_access_secret, { expiresIn: config.jwt_access_expires_in } as SignOptions); 
    
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in as SignOptions);
    return { accessToken, refreshToken };
};


const refreshToken= async (refreshToken: string) => {
    const validToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret);
    if (!validToken) {
        throw new Error("Invalid refresh token");
    }
    if (typeof validToken === "string") {
        throw new Error("Invalid refresh token");
    }
    const { id, email, role } = validToken as JwtPayload;
    const findUser = await prisma.user.findUnique({
        where: {
            id,
            email,
        }
    });
    if (!findUser) {
        throw new Error("User not found");
    }
    const jwtPayload = { 
        id: findUser.id,
        email: findUser.email,
        role: findUser.role
    };
    const newAccessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions);
    return { accessToken: newAccessToken };
};
export const authServices = {
    loginIntoDb,
    refreshToken
};
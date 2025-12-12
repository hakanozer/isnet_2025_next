import { getIronSession } from "iron-session";
import { UserSession } from "./dtos/UserCreateDTO";
import { cookies } from "next/headers";

export const sessionOptions = {
    cookieName: 'session',
    password: process.env.SESSION_SECRET ?? '123key',
}

export const getSession = async () => {
    return await getIronSession<UserSession>(await cookies(), sessionOptions)
}
import { UserCreateDTO, UserLoginDTO } from "@/lib/dtos/UserCreateDTO";
import { globalModel, iGlobal } from "@/lib/globalModel";
import prismaDB from "@/lib/prisma/client";
import bcrypt from 'bcrypt'


export const register = async (user: UserCreateDTO) => {

    const dbUser = await prismaDB.user.findUnique({
        where: { email: user.email }
    })
    if (dbUser) {
        return {
            status: 400,
            result: `Email adresi daha önce kayıt: ${user.email}`
        }
    }
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const saveUser = await prismaDB.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
                role: user.role ?? "PRODUCT",
                status: user.status ?? true
            }
        })
        return {
            status: 200,
            result: saveUser
        }
    } catch (error) {
        console.error(error)
        return {
            status: 500,
            result: "Veritabanı hatası oluştu"
        }
    }
}

export const login = async (user : UserLoginDTO) => {
    const dbUser = await prismaDB.user.findUnique({
        where: { email: user.email }
    })
    
    return globalModel;
}

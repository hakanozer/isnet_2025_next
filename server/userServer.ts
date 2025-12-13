'use server'

import { iGlobal } from "@/lib/globalModel"
import { getForm } from "./util"
import { login, register } from "@/services/userService"
import { redirect } from "next/navigation"
import { UserLoginDTO } from "@/lib/dtos/UserCreateDTO"
import { getSession } from "@/lib/session"

export const userRegisterServer = async (prevState: any, formData: FormData) => {
    const userDto = {
        name: getForm(formData, 'name'),
        email: getForm(formData, 'email'),
        password: getForm(formData, 'password')
    }

    const registerData: iGlobal = await register(userDto)
    if (registerData.status === 200) {
        redirect('/')
    }
    return {
        errorMessage: registerData.result
    }
}

export const userLoginServer = async (prevState: any, formData: FormData) => {
    const userDto: UserLoginDTO = {
        email: getForm(formData, 'email'),
        password: getForm(formData, 'password')
    }
    const userLoginDb = await login(userDto)
    if (userLoginDb.status == 200) {
        const session = await getSession()
        session.id = userLoginDb.result.id
        session.name = userLoginDb.result.name
        session.email = userLoginDb.result.email
        session.role = userLoginDb.result.role
        await session.save()
        redirect('admin/product')
    }
    return {
        errorMessage: userLoginDb.result
    }
}

export const userLogoutServer = async () => {
    const session = await getSession() 
    session.destroy() 
    redirect('/')
}
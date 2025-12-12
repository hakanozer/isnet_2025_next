'use server'

import { iGlobal } from "@/lib/globalModel"
import { getForm } from "./util"
import { register } from "@/services/userService"
import { redirect } from "next/navigation"

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
    
}
import { UserCreateDTO } from "@/lib/dtos/UserCreateDTO";
import { register } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const userCreateDTO: UserCreateDTO = await req.json() 
    const userDB = await register(userCreateDTO)
    return NextResponse.json(
        userDB,
        {status: userDB.status}
    )
}
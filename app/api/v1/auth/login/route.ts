import { UserLoginDTO } from '@/lib/dtos/UserCreateDTO';
import { login } from '@/services/userService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {

    const userLoginDTO: UserLoginDTO = await req.json() 
    const userDB = await login(userLoginDTO)

    return NextResponse.json(
        userDB,
        {status: userDB.status}
    )
}
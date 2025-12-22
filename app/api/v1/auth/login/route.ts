import { UserLoginDTO } from '@/lib/dtos/UserCreateDTO';
import { generateToken, JWTPayload } from '@/lib/jwt';
import { login } from '@/services/userService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {

    const userLoginDTO: UserLoginDTO = await req.json() 
    const userDB = await login(userLoginDTO)

    const roleArr = JSON.parse(userDB.result.role.replace(/'/g, '"'));
  
    const jwtPayload:JWTPayload = {
        id: userDB.result.id,
        name: userDB.result.name,
        email: userDB.result.email,
        role: roleArr,
    }
    const token = generateToken(jwtPayload);

    // http only cookie - add token 1 hour expiration
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/'
    };
    const response = NextResponse.json(
        { token: token },
        { status: userDB.status }
    );
    response.cookies.set('token', token, cookieOptions);
    return response; 

}
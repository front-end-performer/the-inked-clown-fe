import UserService from "@/services/user";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await UserService.getAllUsers();
    if(result.isError) return NextResponse.json(result.message, {status: 500});
    
    return NextResponse.json(result.data)
}
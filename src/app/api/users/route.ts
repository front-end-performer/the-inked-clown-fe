import UserService from "@/services/user";

export async function GET(request: Request) {
    const result = await UserService.getAllUsers();
    if(result.isError) return Response.json(result.message, {status: 500});
    return Response.json(result.data)
}
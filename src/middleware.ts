import { headers } from "next/headers";
import { decryptString, verifyJwtToken } from "./utils/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/api/artist/delete",
    "/api/artist/create",
    "/api/artist/update",
    "/api/photo/delete",
    "/api/photo/create",
    "/api/photo/update",
    "/api/users",
    "/api/users/:path*",
    "/api/photo/:path*",
  ],
};

const publicPostsRegexPattern = /^\/api\/posts\?type=public$/;

export async function middleware(request: any) {
  console.log('middleware', request);
  
  try {
    const nextUrl = request.nextUrl;
    const pathname = nextUrl.pathname;
    const search = nextUrl?.search;
    const path = `${pathname}${search}`;
    const httpMethod = request.method;
    console.log('middleware httpMethod', httpMethod, path);

    // public posts
    if (publicPostsRegexPattern.test(path) && httpMethod === "GET") {
      request.headers.set("user", null);
      return NextResponse.next({ request });
    }

    // authenticate the request

    const headerList = headers();
    const authorization = headerList.get("Authorization");
    if (!authorization)
      return Response.json(
        "You are not authenticated, please login to continue",
        { status: 401 }
      );
    const accessToken = authorization.split("Bearer ")[1];

    if (!accessToken)
      return Response.json(
        "You are not authenticated, please login to continue",
        { status: 401 }
      );

    const result = await verifyJwtToken(accessToken);

    console.log("verifyJwtToken ", result);

    if (result.isError)
      return Response.json(
        "You are not authorised to access this resource, please login to continue",
        { status: 403 }
      );

    const decrypted = decryptString(result?.data?.user);

    if (!decrypted)
      return Response.json(
        "You are not authorised to access this resource, please login to continue",
        { status: 403 }
      );

    request.headers.set("user", JSON.stringify(decrypted));

    return NextResponse.next({ request });
  } catch (error: any) {
    return Response.json(error.message, { status: 500 });
  }
}

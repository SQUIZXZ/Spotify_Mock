import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
 
    const {pathname} = req.nextUrl
    let token = await getToken({req, secret: process.env.JWT_SECRET})

    if (pathname.includes(("api/auth/") || token)) {
        return NextResponse.next()
    }

    if (!token && pathname !== "/Login") {
        return NextResponse.redirect("/Login")
    }
}
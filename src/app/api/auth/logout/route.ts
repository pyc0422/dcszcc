import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { auth } from "../../../../../firebase";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  //Remove the value and expire the cookie
  await signOut(auth)
  cookies().set("session", "", {maxAge: 0});
  return NextResponse.json({}, { status: 200 });
}
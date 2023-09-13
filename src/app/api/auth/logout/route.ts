import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { auth } from "../../../../../firebase";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  //Remove the value and expire the cookie
  await signOut(auth)
  const options = {
    name: "session",
    value: "",
    maxAge: -1,
  };
  cookies().set(options);
  return NextResponse.json({}, { status: 200 });
}
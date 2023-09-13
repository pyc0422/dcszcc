import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../../../firebase';
import { NextRequest, NextResponse } from "next/server";
import { FirebaseError } from "firebase/app";
import { cookies } from "next/headers";

export async function POST (request:Request) {
  const {email, password} = await request.json()
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    if (credential) {
      const user = credential.user;
      const token = await user.getIdTokenResult()
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const options = {
        name: "session",
        value: token.token,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };
      //Add the cookie to the browser
      cookies().set(options);
      return NextResponse.json('success')
    }
  } catch(error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return NextResponse.json(error.code)
    }
    return NextResponse.json(error)

  }

}

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";
  //Validate if the cookie exist in the request
  console.log('s', session)
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  const curUser = await auth.currentUser?.getIdToken();
  if (curUser !== session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  return NextResponse.json({ isLogged: true }, { status: 200 });
}
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../../../firebase';
import { NextResponse } from "next/server";
import { FirebaseError } from "firebase/app";

export async function POST (request: Request) {
  const {email, password} = await request.json()
  // console.log ('sign up:', email, password)
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    if (credential) {
      const user = credential.user;
      return NextResponse.json(user.metadata)
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




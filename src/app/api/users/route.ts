import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import firestore from '../../../../firebase';
import { NextResponse } from "next/server";
export async function GET (request: Request) {
  // return NextResponse.json('hello')
  try {
    const q = await getDocs(collection(firestore, "users"));
    const data = q.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    console.log('data in handler', data)
    return NextResponse.json({data})
  } catch(error) {
    return NextResponse.json(error)
  }
}

export async function POST (request:Request) {
  try {
    const body = await request.json();
    console.log('body in post users:', body)
    const ref = collection(firestore, "users")
    const res = await getDocs(query(ref, where("email","==", body.email)))
    if (res.size == 0) {
      const add = await addDoc(ref, body)
      return NextResponse.json('success')
    } else {
      return NextResponse.json({statusCode:400, message:"user exists"})
    }
  } catch(error){
    console.log('error in post user', error)
    return NextResponse.json({status:400})
  }
}
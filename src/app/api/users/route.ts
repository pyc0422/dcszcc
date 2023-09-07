import { collection, getDocs } from "firebase/firestore";
import firestore from '../../../../firebase';
import { NextResponse } from "next/server";
export async function GET (request: Request) {
  // return NextResponse.json('hello')
  try {
    const q = await getDocs(collection(firestore, "news"));
    const data = q.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    console.log('data in handler', data)
    return NextResponse.json({data})
  } catch(error) {
    return NextResponse.json(error)
  }
}
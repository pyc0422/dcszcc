import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from '../../../../../firebase';
import { NextResponse } from "next/server";
export async function GET (request: Request,  { params }: { params: { news_id: string } }) {
  //return all news data from database
  if (params) {
    const news_id = params.news_id;
  }
  try {
    const q = await getDocs(collection(firestore, "news"));
    const data = q.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    console.log('data in handler', data)
    return NextResponse.json({data})
  } catch(error) {
    return NextResponse.json(error)
  }
}

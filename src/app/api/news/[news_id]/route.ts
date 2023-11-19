import { doc, getDoc, updateDoc, deleteDoc} from "firebase/firestore";
import { firestore } from '../../../../../firebase';
import { NextResponse } from "next/server";
export async function GET (request: Request,  { params }: { params: { news_id: string } }) {
  //return all news data from database
  if (params) {
    const news_id = params.news_id;
    try {
      const docSnap = await getDoc(doc(firestore, "news", news_id));
      if (docSnap) {
        return NextResponse.json(docSnap.data())
      } else {
        return NextResponse.json('no such news')
      }

    } catch(error) {
      return NextResponse.json(error)
    }
  }

}

export async function PUT (request:Request, {params}:{params:{news_id:string}}) {
  if (params) {
    const news_id = params.news_id
    try {
      const body = await request.json();
      console.log('update route put news body:', body)
      delete body.id
      const curRef = doc(firestore, "news", news_id)
      await updateDoc(curRef, {...body})
      return NextResponse.json('updated')
    } catch(error) {
      return NextResponse.json(error)
    }
  }
}

export async function DELETE (request:Request, {params}:{params:{news_id:string}}) {
  try {
    await deleteDoc(doc(firestore, "news", params.news_id));
    return NextResponse.json("deleted")
  } catch(error) {
    return NextResponse.json(error)
  }
}
import { doc, getDoc} from "firebase/firestore";
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

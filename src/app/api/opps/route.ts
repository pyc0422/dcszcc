import {doc,addDoc, collection, getDocs, Timestamp, updateDoc,deleteDoc} from "firebase/firestore"
import { firestore } from "../../../../firebase";
import { NextResponse } from "next/server";

export async function GET (request: Request) {
  //return all opps data from database
  try {
    const q = await getDocs(collection(firestore, "opps"));
    const data = q.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return NextResponse.json({data})
  } catch(error) {
    return NextResponse.json(error)
  }
}

export async function POST (request:Request) {
  // create a new opps to firebase

  try {
    const body = await request.json()
    body.created_time = Timestamp.fromDate(new Date())
    console.log('opps post ', body);
    await addDoc(collection(firestore, "opps"), body)
    return NextResponse.json('added')
  } catch(error) {
    return NextResponse.json(error)
  }
}

export async function PUT (request:Request) {

  try {
    const body = await request.json();
    const curRef = doc(firestore, "opps", body.id)
    delete body.id
    await updateDoc(curRef, {body})
    return NextResponse.json('updated')
  } catch(error) {
    return NextResponse.json(error)
  }

}

export async function DELETE (request:Request) {
  try {
    const body = await request.json();
    await deleteDoc(doc(firestore, "news", body.id))
  } catch(error) {
    return NextResponse.json(error)
  }
}
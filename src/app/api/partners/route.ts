import { firestore } from '../../../../firebase';
import { NextResponse } from "next/server";
import {addDoc, collection, getDocs, updateDoc, doc, deleteDoc} from "firebase/firestore";

export async function GET (request:Request) {
  //return all partners from database
  try {
    const q = await getDocs(collection(firestore, "partners"));
    const data = q.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return NextResponse.json({data})
  } catch(error) {
    return NextResponse.json(error)
  }
}

export async function POST (request:Request) {
  try {
    const body = await request.json()
    delete body.id
    const newPar = await addDoc(collection(firestore, "partners"), body)
    if (newPar.id) {
      return NextResponse.json(newPar.id)
    }

  } catch(error) {
    return NextResponse.json(error)
  }
}

export async function PUT (request: Request) {
  try {
    const body = await request.json();
    const currentRef = doc(firestore, "partners", body.id)
    await updateDoc(currentRef, {intro:body.intro, link:body.link, logo:body.logo, name:body.name})
    return NextResponse.json('updated')
  } catch(error) {
    return NextResponse.json(error)
  }
}

export async function DELETE(request:Request) {
  try {
    const body = await request.json()
    await deleteDoc(doc(firestore, "partners", body.id))
    return NextResponse.json('deleted')
  } catch(error) {
    return NextResponse.json(error);
  }
}
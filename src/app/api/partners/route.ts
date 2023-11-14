import { firestore } from '../../../../firebase';
import { NextResponse } from "next/server";
import {addDoc, collection, getDocs, Timestamp} from "firebase/firestore";

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
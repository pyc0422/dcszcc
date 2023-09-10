import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import firestore from '../../../../../firebase';
import { NextResponse } from "next/server";
export async function GET (request: Request,  { params }: { params: { news_id: string } }) {
  const news_id = params.news_id;
  //get specific data from database
}

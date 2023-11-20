import { Timestamp } from "firebase/firestore"
import { NewsType } from "./types"

export function convertTimestamp(time:Timestamp) {
  const date = new Date(time.seconds * 1000)
  return date.getMonth() +'/'+date.getDate() +'/' + date.getFullYear()
}

export function sortedArray (arr:NewsType[], type:string) {

  if (type ==='time') {
    return arr.sort((a:NewsType,b:NewsType) => (new Date(b.news_date).getTime()- new Date(a.news_date).getTime()))
  }
  if (type === "important") {
    return arr.filter((a:NewsType) => a.important).sort((a:NewsType,b:NewsType) => (new Date(a.news_date).getTime()- new Date(b.news_date).getTime()))
  }
  return arr

}

export const getImg = (str:string) => {
  const a = str.split(">")
  const b= a.filter(e =>  (e.slice(1,4) === 'img'))
  return b.map(p => p.slice(9))
}
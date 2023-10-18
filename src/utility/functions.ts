import { Timestamp } from "firebase/firestore"

export function convertTimestamp(time:Timestamp) {
  const date = new Date(time.seconds * 1000)
  return date.getMonth() +'/'+date.getDate() +'/' + date.getFullYear()
}
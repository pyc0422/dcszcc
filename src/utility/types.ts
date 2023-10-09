import { Timestamp } from "firebase/firestore";

export type AlertType =  {status: boolean; severity: 'error' | 'info' | 'success' | 'warning'; message: string};

export type NewsType = {
  title:string;
  news_date:string;
  important:boolean;
  bref?:string;
  content:string;
  notified:boolean;
  created_time?:Timestamp;
  last_update_time?:Timestamp;
}
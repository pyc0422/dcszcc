import { Timestamp } from "firebase/firestore";

export type AlertType =  {status: boolean; severity: 'error' | 'info' | 'success' | 'warning'; message: string};

export type NewsType = {
  title:string;
  tags?:string | Array<string>;
  news_date:string;
  important:boolean | string;
  bref?:string;
  content:string;
  notified:boolean | string;
  created_time?:Timestamp;
  last_update_time?:Timestamp;
  author?:string
}
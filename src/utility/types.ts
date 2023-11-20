import { Timestamp } from "firebase/firestore";
import { StringMap } from "quill";

export type AlertType =  {status: boolean; severity: 'error' | 'info' | 'success' | 'warning'; message: string};

export type NewsType = {
  id?:string;
  title:string;
  tags?:string | Array<string>;
  news_date:string;
  important?:boolean | string;
  bref?:string;
  content:string;
  notified?:boolean | string;
  created_time?:Timestamp | null;
  last_update_time?:Timestamp;
  author?:string;
  img?:string;
}

export type PartnerType = Record<string, string>

export type OppType = {
  id?:string;
  title:string;
  created_time?:Timestamp;
  content:string;
  notified:boolean;
  img?:string;
}

export type NewsEditPropType = {type:string,values:NewsType | OppType | null}
'use client'
import React, {createContext, useContext, useState} from 'react'
import { AlertType, NewsType, OppType, PartnerType } from '../utility/types';

type StateType = {
  alert: AlertType;
  setAlert(alert: AlertType): void;
  newsList:NewsType[] | null;
  setNewsList(newsList: NewsType[] | null):void;
  partners:PartnerType[] | null;
  setPartners(partners:PartnerType[] | null):void;
  opps:OppType[] | null;
  setOpps(opps:OppType[] | null):void;
};

export const AppContext = createContext<StateType>({
  alert:{ status:false, severity: "error", message:"" },
  setAlert: () => {},
  newsList:[],
  setNewsList:() => {},
  partners:[],
  setPartners:() => {},
  opps:[],
  setOpps:() => {},
});


export function AppWrapper({children}: {
  children: React.ReactNode
}) {
  const [alert, setAlert] = useState<AlertType>({ status:false, severity: "error", message:"" })
  const [newsList, setNewsList] = useState<NewsType[] | null>(null)
  const [partners, setPartners] = useState<PartnerType[] | null>(null)
  const [opps, setOpps] = useState<OppType[] | null>(null)
  return (
    <AppContext.Provider value = {{alert, setAlert, newsList,setNewsList, partners, setPartners, opps,setOpps}}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)
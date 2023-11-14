'use client'
import React, {createContext, useContext, useState} from 'react'
import { AlertType, NewsType, OppType, PartnerType } from '../utility/types';

type StateType = {
  alert: AlertType;
  setAlert(alert: AlertType): void;
  newsList:NewsType[];
  setNewsList(newsList: NewsType[]):void;
  partners:PartnerType[];
  setPartners(partners:PartnerType[]):void;
  opps:OppType[];
  setOpps(opps:OppType[]):void;
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
  const [newsList, setNewsList] = useState<NewsType[]>([])
  const [partners, setPartners] = useState<PartnerType[]>([])
  const [opps, setOpps] = useState<OppType[]>([])
  return (
    <AppContext.Provider value = {{alert, setAlert, newsList,setNewsList, partners, setPartners, opps,setOpps}}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)
'use client'
import React, {createContext, useContext, useState} from 'react'
import { AlertType, NewsType } from '../utility/types';

type StateType = {
  alert: AlertType;
  setAlert(alert: AlertType): void;
  newsList:NewsType[];
  setNewsList(newsList: NewsType[]):void;
};

export const AppContext = createContext<StateType>({
  alert:{ status:false, severity: "error", message:"" },
  setAlert: () => {},
  newsList:[],
  setNewsList:() => {}
});


export function AppWrapper({children}: {
  children: React.ReactNode
}) {
  const [alert, setAlert] = useState<AlertType>({ status:false, severity: "error", message:"" })
  const [newsList, setNewsList] = useState<NewsType[]>([])
  return (
    <AppContext.Provider value = {{alert, setAlert, newsList,setNewsList}}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)
'use client'
import React, {createContext, useContext, useState} from 'react'
import { AlertType } from '../utility/types';

type StateType = {
  alert: AlertType;
  setAlert(alert: AlertType): void;
};

export const AppContext = createContext<StateType>({
  alert:{ status:false, severity: "error", message:"" },
  setAlert: () => {}
});


export function AppWrapper({children}: {
  children: React.ReactNode
}) {
  const [alert, setAlert] = useState<AlertType>({ status:false, severity: "error", message:"" })
  return (
    <AppContext.Provider value = {{alert, setAlert}}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)
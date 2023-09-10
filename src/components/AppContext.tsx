'use client'
import {createContext, useContext, useState} from 'react'

interface AlertType {status: boolean; severity: 'error' | 'info' | 'success' | 'warning'; message: string};

type StateType = {
  alert: AlertType;
  setAlert(alert: AlertType): void;
};
// const initialState = {
//   alert:{ status:false, severity: "error", message:"" },
//   setAlert: () => {}
// }
export const AppContext = createContext<StateType>({
  alert:{ status:false, severity: "error", message:"" },
  setAlert: () => {}
});

// const useApp = () : StateType=> {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("No app context")
//   }
//   return context;
// }
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
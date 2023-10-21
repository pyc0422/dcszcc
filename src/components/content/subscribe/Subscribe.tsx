import Image from "next/image"
import React, { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material"
import { addUser, sendWelcome } from "../../../lib/api";
import { useAppContext } from "../../../components/AppContext";

export default function Subscribe () {
  const { alert, setAlert} = useAppContext()
  const [email, setEmail] = useState<string>("")
  const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleSubscribe = () => {
    console.log('email in handle', email)
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email.length) {
      setAlert({status:true, severity:"error", message:"Please provide your email to subscribe"})
      return
    }
    if(!expression.test(email)) {
      setAlert({status:true, severity:"error", message:'Please provide valid email address'})
      return
    }
    return addUser(email)
     .then((data) => {
      if (typeof data === 'string') {
        setEmail("")
        return sendWelcome(email)
      } else {
        setAlert ({status:true, severity:"warning", message:'Thank you. You already subscribed before'})
        return 'warning'
      }
     })
     .then((res) => {
      if (res === 'warning') {
        return
      }
      setAlert({status:true, severity:"success", message:"Subsribe successfully"})
    })
     .catch(err => console.error(err))
  }
  useEffect(() => {
    if (alert.status) {
      setTimeout(() => {
        setAlert({status:false, severity:"error", message:""})
      }, 2500)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert.status])
  return (
    <section className="w-screen bg-[#676666] bg-opacity-80 px-3 py-1 h-max md:h-[40vh] min-h-max md:min-h-[40vh] flex justify-center items-center">
      <div className="w-screen max-w-[960px] flex flex-col md:flex-row justify-around items-center ">
      <div className="p-2">
        <h1 className="font-medium text-white text-3xl md:text-4xl">大华府地区中国深圳商会</h1>
        <div className="text-white font-light text-xs pt-2"> 欢迎订阅了解最新活动及资讯</div>
        {alert.status ? <Alert severity={alert.severity} onClose={() => setAlert({...alert, status:false})}>{alert.message}</Alert> : null}
        <input
          name="email"
          placeholder="输入您的邮箱进行订阅"
          value={email}
          onChange={handleEmail}
          className="px-4 py-1 font-extralight h-10 w-full bg-transparent border border-slate-50 mt-4"
        />
        <div className="flex flex-row justify-between">
          <Button
            variant="outlined"
            fullWidth
            href="/about"
            sx={{
              color:"white",
              borderColor:"white",
              margin:"1rem",
              "&:hover":{
                color:"black !important",
                borderColor:"#101a30",
              },
            }}>了解更多</Button>
          <Button
           fullWidth
           variant="contained"
           sx={{
            margin:"1rem",
            bgcolor:"#2a2a2b !important",
            "&:hover":{color:'white !important'}
            }}
           onClick={handleSubscribe}
          >订阅资讯</Button>
        </div>
      </div>
      <div className="flex justify-center items-center">
       <Image src="/01create.png" height={300} width={400} alt="create picture" className="shadow-md h-4/5 w-4/5 border-2 border-white"/>
      </div>
      </div>
    </section>
  )
}
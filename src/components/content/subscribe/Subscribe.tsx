import Image from "next/image"
import { useEffect, useState } from "react";
import "./subscribe.css"
import { Alert, Box, Button, Color, TextField, Typography } from "@mui/material"
import { CssTextField } from "./CssTextField";
import { addUser, sendWelcome } from "@/lib/api";

import { useAppContext } from "@/components/AppContext";

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
    <section id="homepage">
      <Box p={2}>
        <Typography variant="h4" color="white" sx={{fontWeight:'800'}} component={"h1"}>大华府地区中国深圳商会</Typography>
        <Typography variant="caption" color="white" py={1} sx={{fontWeight:'500'}} component={"p"}>欢迎订阅了解最新活动及资讯</Typography>
        {alert.status ? <Alert severity={alert.severity} onClose={() => setAlert({...alert, status:false})}>{alert.message}</Alert> : null}
        <CssTextField
         variant="outlined"
         fullWidth
         name="email"
         placeholder="Email"
         size="small"
         required
         margin="normal"
         value={email}
         onChange={handleEmail}
         />
        <Box display={"flex"}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color:"white",
              borderColor:"white",
              margin:"1rem",
              "&:hover":{
                color:"black !important",
                borderColor:"primary.dark",
              },
            }}>了解更多</Button>
          <Button
          fullWidth
           variant="contained"
           sx={{
            bgcolor:"primary.dark",
            margin:"1rem",
            "&:hover":{color:'white !important'}
            }}
           onClick={handleSubscribe}
          >订阅资讯</Button>
        </Box>
      </Box>
      <Box height={300} width={400} textAlign={"center"} p={2}>
       <Image src="/01create.png" height={300} width={400} alt="create picture" />
      </Box>

    </section>
  )
}
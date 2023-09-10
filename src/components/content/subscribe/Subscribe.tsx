import Image from "next/image"
import { useEffect, useState } from "react";
import "./subscribe.css"
import { Alert, Box, Button, Color, TextField, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import { addUser } from "@/lib/api";
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});
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
        setAlert({status:true, severity:"success", message:"Subsribe successfully"})
      } else {
        setAlert ({status:true, severity:"warning", message:'Thank you. You already subscribed before'})
      }
     })
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
import Image from "next/image"
import { useState } from "react";
import "./subscribe.css"
import { Box, Button, ButtonGroup, Input, TextField, Typography } from "@mui/material"
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

export default function Subscribe () {
  const [email, setEmail] = useState<string>("")
  const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleSubscribe = () => {
    console.log('email in handle', email)
    return addUser(email)
     .then((data) => console.log('data in handleSub:', data))
  }
  return (
    <section id="homepage">
      <Box p={2}>
        <Typography variant="h4" color="white" sx={{fontWeight:'800'}} component={"h1"}>大华府地区中国深圳商会</Typography>
        <Typography variant="caption" color="white" py={1} sx={{fontWeight:'500'}} component={"p"}>欢迎订阅了解最新活动及资讯</Typography>
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
            "&:hover":{color:'black !important'}
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
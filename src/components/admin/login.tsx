"use client"
import { Container, Box, Button, FormControl, InputLabel, InputAdornment,IconButton, InputBase, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { logIn } from "@/lib/api";
import { useRouter } from "next/navigation";
export default function Login() {
  const [admin, setAdmin] = useState<Record<string, string>>({email:"", pw:""})
  const [inputError, setError] = useState<Record<string,boolean>>({email:false, pw:false})
  const [showPw, setShow] = useState<boolean>(false)
  const route = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError({email:false, pw:false})
    if (!admin.email.length) {
      setError({...inputError, email:true})
    }
    if (!admin.pw.length) {
      setError({...inputError, pw:true})
    }
    if (admin.email.length && admin.pw.length){

      //send request to login api
      const res = await logIn(admin.email, admin.pw)
      console.log('res login fe:', res)
      if (res === 'success') {
        console.log(admin)
        route.push('/admin/protected/edit')
        setAdmin({email:"", pw:""})
      }
    }

  }
  return (
    <Container sx={{ height:'80vh', textAlign:"center", p:'2rem'}}>
      <Typography variant="h4" >管理员登陆</Typography>
      <div style={{height:'60vh', display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
        <Box
          component={"form"}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch'},
            display: "flex",
            flexDirection:"column",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormControl sx={{ m: 1, width:'25ch' }} variant="outlined">
            <InputLabel shrink htmlFor="outlined-admin-email" sx={{fontSize:20}}>登陆</InputLabel>
            <InputBase sx={{
              "label + &": {marginTop:"1rem"},
              "& .MuiInputBase-input": {position:"relative",  height:"1rem", width:"100%", fontSize:16, padding:"10px 12px"},
              border: "1px #B2BAC2 solid",
              borderRadius:2
              }}
              onChange={(e) => setAdmin({...admin, email: e.target.value})}
              value={admin.email}
              id="outlined-admin-email"
              size="small"
              type="text"
              placeholder="Useremail"
              name="email"
              error={inputError.email}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel shrink htmlFor="outlined-adornment-password" sx={{fontSize:20}}>密码</InputLabel>
            <InputBase sx={{
              "label + &": {marginTop:"1rem"},
              "& .MuiInputBase-input": {position:"relative",  height:"1rem", width:"100%", fontSize:16, padding:"10px 12px"},
              border: "1px #B2BAC2 solid",
              borderRadius:2
              }}
              placeholder="Password"
              id="outlined-adornment-password"
              size="small"
              type={showPw ? 'text' : 'password'}
              onChange={(e) => setAdmin({...admin, pw: e.target.value})}
              value={admin.pw}
              endAdornment={
                <InputAdornment position="end" sx={{pr:"10px"}}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShow(!showPw)}
                    edge="end"
                  >
                    {showPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              name="password"
              error={inputError.pw}
            />
          </FormControl>
          <Button type="submit" variant="outlined" size="small" sx={{border:2, m:"1rem"}}>Submit</Button>
        </Box>
      </div>

    </Container>
  )
}

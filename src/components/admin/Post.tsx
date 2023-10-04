import { Button } from "@mui/material"
import React from "react"
export default function Post () {
  return (
    <div className="flex flex-col justify-center items-center border">
      <form >
        <label>标题：
          <input type="text" placeholder="标题"/>
        </label>
      </form>
          <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'center'}}>
           <Button type="submit" variant="outlined" size="small" sx={{border:2, m:"1rem", px:'8rem'}}>发布</Button>
           <Button type="reset" variant="contained" size="small" sx={{border:2, m:"1rem", px: '8rem'}}>重置</Button>

          </div>

    </div>
  )
}
import Link from 'next/link';
import { Button, List, ListItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { partners, info } from '@/utility/data';


export default function Footer () {
  return (
    <div className="footer-container">
      <div className='footer-main'>
      <Grid xs={6} className="footer-grid" wrap='wrap'>
        <Typography component="a" href="/partner" className="footer-title">合作伙伴</Typography>
        <List sx={{display: {xs:'none', md:'block'}}}>
          {partners.slice(0,5).map((company, i) =>
            <ListItem key={i} sx={{color:"#2a2a2b"}} disablePadding component="a" href={company.link}>
              {company.name}
            </ListItem>
          )}
          {partners.length > 5 ?
          <Button sx={{color:"primary.dark", fontWeight:500}} size="small" href='/partner'>更多...</Button>
           : null}
        </List>
      </Grid>
      <Grid xs={6} className="footer-grid" px={2} >
        <Typography component={"a"} href="/info" className="footer-title">联系信息</Typography>
        <Stack className="info-stack" sx={{display: {xs:'none', md:'block'}}}>
          <Typography style={{fontSize:"small", color:"#2a2a2b"}}>{info[0].name}: {info[0].value}</Typography>
          <Stack direction="row" flexWrap={"wrap"} spacing={2}>
            <Stack direction={"column"}>
            {info.slice(1).map((item, i) =>
              <Typography key={i} style={{fontSize:"small", color:"#2a2a2b"}} component="span">{item.name}: {item.value}</Typography>)}
            </Stack>
            <Image src="/wechat-qr.png" alt="wechat qr code" width={100} height={100} style={{padding:"0.3rem"}}/>
        </Stack>
        </Stack>
      </Grid>
      </div>
      <div style={{textAlign:"center", width:"100%", position:"fixed", bottom:0}}>
        <Typography variant="caption" sx={{color: "#2b2b2ba4", fontWeight: 100}}>
        &copy; 2023 SZCC
        </Typography>
      </div>
    </div>
  )
}
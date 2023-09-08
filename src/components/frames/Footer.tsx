import { Info } from '@mui/icons-material';
import { Button, List, ListItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';

const partners = [
  {name: '中国xx商会1', link:""},
  {name: 'xx品牌', link:""},
  {name: '中国xx商会2', link:""},
  {name: 'xx品牌2', link:""},
  {name: '中国xx商会3', link:""},
  {name: '中国xx商会4', link:""},
]

const info = [
  {name: "商会地址", value: "8100 Boone Blvd, Suite 230, Vienna, VA 22182, USA "},
  {name: "邮箱", value: "dcszcc.org@gmail.com"},
  {name: "微信", value:"690238933"}
]


export default function Footer () {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      className="footer-container"
    >
      <Grid xs={6} className="footer-grid">
        <Typography>合作伙伴</Typography>
        <List>
          {partners.slice(0,5).map((company, i) =>
            <ListItem key={i} className="parnter-li" disablePadding component="a" href={company.link}>
              {company.name}
            </ListItem>
          )}
          {partners.length > 5 ? <Button sx={{color:"primary.dark"}} size="small">更多...</Button> : null}
        </List>
      </Grid>
      <Grid xs={6} className="footer-grid" px={2} >
        <Typography>联系信息</Typography>
        <Stack className='info-stack'>{info[0].name}: {info[0].value}</Stack>
        <Stack direction="row" flexWrap={"wrap"}>
          <Stack direction={"column"}>
           {info.slice(1).map((item, i) =>
            <Stack className='info-stack' key={i}>{item.name}: {item.value}</Stack>)}
          </Stack>
          <Image src="/wechat-qr.png" alt="wechat qr code" style={{padding: "0.3rem"}}width={100} height={100}/>
      </Stack>


      </Grid>
    </Grid>
  )
}
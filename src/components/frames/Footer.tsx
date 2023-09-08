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
  const handleClickPartner = () => {
    //redirect to partner page
    console.log('partner clicked')
  }
  const handleClickInfo = () => {
    //redirect to partner page
    console.log('info clicked')
  }

  return (
    <div
      className="footer-container"
    >
      <Grid
      xs={6}
      className="footer-grid" wrap='wrap'

      >
        <Typography onClick={handleClickPartner}>合作伙伴</Typography>
        <List sx={{display: {xs:'none', md:'block'}}}>
          {partners.slice(0,5).map((company, i) =>
            <ListItem key={i} sx={{color:"primary.dark"}} disablePadding component="a" href={company.link}>
              {company.name}
            </ListItem>
          )}
          {partners.length > 5 ? <Button sx={{color:"primary.dark"}} size="small" onClick={handleClickPartner}>更多...</Button> : null}
        </List>
      </Grid>
      <Grid xs={6} className="footer-grid" px={2} >
        <Typography onClick={ handleClickInfo }>联系信息</Typography>
        <Stack className="info-stack" sx={{display: {xs:'none', md:'block'}}}>
          <Typography style={{fontSize:"small"}}>{info[0].name}: {info[0].value}</Typography>
          <Stack direction="row" flexWrap={"wrap"} spacing={2}>
            <Stack direction={"column"}>
            {info.slice(1).map((item, i) =>
              <Typography key={i} style={{fontSize:"small"}} component="span">{item.name}: {item.value}</Typography>)}
            </Stack>
            <Image src="/wechat-qr.png" alt="wechat qr code" width={100} height={100} style={{padding:"0.3rem"}}/>
        </Stack>
        </Stack>



      </Grid>
    </div>
  )
}
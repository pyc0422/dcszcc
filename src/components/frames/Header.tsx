import { Stack, Link, Box } from "@mui/material";
import Image from "next/image";
import "./Frames.css"
const navItems:Array<Array<string>>= [
  ["首页", ""],
  ["关于我们","about"],
  ["新闻与活动","news"],
  ["联系我们","contact"]
]
const socialItems = [
  ["/WeChat.png", ""],
  ["/FaceBook.png", ""],
  ["/Twitter.png", ""]
]
export default function Header () {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{margin:"1rem 3rem 1rem 1rem"}}>
      <Image src="/logo.png" priority={false} alt="logo" width="300" height="40"/>
      <Stack direction="row">
        {navItems.map((item, i) =>
        <Box key={i} component="span" className="link-box">
          <Link href={`#${item[1]}`} variant="subtitle2" underline="none" className="nav-link">{item[0]}</Link>
        </Box>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        {socialItems.map((item, i) =>
          <Link key={i} href={item[1]}>
            <Image src={item[0]} alt={item[0]+"link"} width="20" height="20" style={{objectFit: "cover"}}/>
          </Link>
        )}
      </Stack>
    </Stack>
  )
}
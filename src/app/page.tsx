import Image from 'next/image'
import styles from './page.module.css'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <Container maxWidth="lg" component="h3">
      <div>
        <Typography  variant="h3" color="red"> 大华府地区中国深证商会首页</Typography>

      <Button variant="contained">Hello world</Button>
      </div>
      </Container>
    </main>
  )
}

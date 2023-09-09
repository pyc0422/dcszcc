"use client"
import Footer from '@/components/frames/Footer';
import Header from '@/components/frames/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import Subscribe from '@/components/subscribe/Subscribe';
const theme = createTheme({
  palette: {
    primary: {
      main:blue[500],
      light: blue[100],
      dark:grey[900]
    },
  },
});

export default function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Header />
      <Subscribe />
      <Footer/>
    </div>
    </ThemeProvider>
  )
}

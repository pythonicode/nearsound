// Styles //
import '@fontsource/inter/variable.css';
import '../styles/globals.css'

import { NearProvider } from '../context/NearProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Application({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return <NearProvider><ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider></NearProvider>
}

export default Application

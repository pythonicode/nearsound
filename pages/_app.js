// Styles //
import '@fontsource/inter/variable.css';
import '../styles/globals.css'

import { NearProvider } from '../context/NearProvider';

function Application({ Component, pageProps }) {
  return <NearProvider><Component {...pageProps} /></NearProvider>
}

export default Application

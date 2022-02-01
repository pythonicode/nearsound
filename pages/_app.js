// Styles //
import "@fontsource/inter/variable.css";
import "../styles/globals.css";

import { NearProvider } from "../context/NearProvider";
import { SoundProvider } from "../context/SoundProvider";
import { FirebaseProvider } from "../context/FirebaseProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Application({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <FirebaseProvider>
      <NearProvider>
        <SoundProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </SoundProvider>
      </NearProvider>
    </FirebaseProvider>
  );
}

export default Application;

// Styles //
import "@fontsource/inter/variable.css";
import "../styles/globals.css";

import { NearProvider } from "../context/NearProvider";
import { SoundProvider } from "../context/SoundProvider";
import { DatabaseProvider } from "../context/DatabaseProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Application({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: "dark",
      neutral: {
        main: "#FFFFFF",
      },
    },
  });

  return (
    <DatabaseProvider>
      <NearProvider>
        <SoundProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </SoundProvider>
      </NearProvider>
    </DatabaseProvider>
  );
}

export default Application;

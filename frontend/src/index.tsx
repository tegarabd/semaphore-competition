/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import { Router } from "@solidjs/router";
import { UserProvider } from "./context/UserContext";
import { CssBaseline, ThemeProvider, createTheme } from "@suid/material";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#586F7C",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#B8DBD9",
      contrastText: "#0f0f0f",
    },
    background: {
      default: "#FaFaFa",
      paper: "#ffffff",
    },
  },
});

render(
  () => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </ThemeProvider>
  ),
  root!
);

// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#3f51b5",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;

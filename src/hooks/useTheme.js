// src/hooks/useTheme.js
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { createTheme } from "@mui/material/styles";

function useTheme() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#9c27b0",
      },
      secondary: {
        main: "#3f51b5",
      },
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1e1e1e" : "#f5f5f5",
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

  return { darkMode, toggleDarkMode, theme };
}

export default useTheme;

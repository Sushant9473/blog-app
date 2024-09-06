// src/components/common/ThemeToggle.js
import React from "react";
import { IconButton, useTheme as useMuiTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const muiTheme = useMuiTheme();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
      {muiTheme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ThemeToggle;

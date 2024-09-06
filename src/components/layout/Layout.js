// src/components/layout/Layout.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  CssBaseline,
  Switch,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import useTheme from "../../hooks/useTheme";

const Layout = ({ children }) => {
  const { darkMode, toggleDarkMode, theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="fixed"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            >
              BLOG
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={RouterLink} to="/create">
              Create
            </Button>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="secondary"
            />
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ mt: 10, mb: 4, flexGrow: 1 }}>
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

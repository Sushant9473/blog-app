// src/redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    try {
      const parsedTheme = JSON.parse(savedTheme);
      if (typeof parsedTheme === "object" && parsedTheme !== null) {
        return parsedTheme;
      }
    } catch (error) {
      console.error("Error parsing saved theme:", error);
    }
  }
  return { darkMode: true }; // Default to dark mode
};

const initialState = getInitialTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem(
        "theme",
        JSON.stringify({ darkMode: state.darkMode })
      );
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

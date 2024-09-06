// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";
import categoryReducer from "./slices/categorySlice";
import themeReducer from "./slices/themeSlice";

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("blogAppState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("blogAppState", serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    categories: categoryReducer,
    theme: themeReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    blogs: store.getState().blogs,
    categories: store.getState().categories,
    // We might not want to persist the theme state if it's already handled separately
    // theme: store.getState().theme,
  });
});

export default store;

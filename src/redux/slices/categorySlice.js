// src/redux/slices/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialCategories = [
  { id: "technology", name: "Technology" },
  { id: "productivity", name: "Productivity" },
  { id: "lifestyle", name: "Lifestyle" },
];

const initialState = {
  categories: initialCategories,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categorySlice.actions;
export default categorySlice.reducer;

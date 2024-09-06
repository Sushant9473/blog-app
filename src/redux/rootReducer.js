import { combineReducers } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";
import categoryReducer from "./slices/categorySlice";
import themeReducer from "./slices/themeSlice";

const rootReducer = combineReducers({
  blogs: blogReducer,
  categories: categoryReducer,
  theme: themeReducer,
});

export default rootReducer;

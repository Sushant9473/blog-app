// src/components/category/CategoryForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Box } from "@mui/material";
import { addCategory } from "../../redux/slices/categorySlice";

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      dispatch(addCategory(categoryName.trim()));
      setCategoryName("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="categoryName"
        label="New Category"
        name="categoryName"
        autoFocus
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Category
      </Button>
    </Box>
  );
};

export default CategoryForm;

// src/pages/HomePage.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, TextField, Box, MenuItem } from "@mui/material";
import BlogList from "../components/blog/BlogList";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = useSelector((state) => state.categories.categories);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Discover Our Latest Blogs and Insights
      </Typography>
      <Box sx={{ display: "flex", mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search by title or creator"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
        <TextField
          select
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="outlined"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="All">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <BlogList searchTerm={searchTerm} selectedCategory={selectedCategory} />
    </Container>
  );
};

export default HomePage;

// src/components/blog/BlogList.js
import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Box } from "@mui/material";
import BlogCard from "./BlogCard";

const BlogList = ({ searchTerm, selectedCategory }) => {
  const blogs = useSelector((state) => state.blogs.blogs);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (filteredBlogs.length === 0) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No blogs found matching your search or selected category.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredBlogs.map((blog) => (
        <Grid item xs={12} sm={6} md={4} key={blog.id}>
          <BlogCard blog={blog} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogList;

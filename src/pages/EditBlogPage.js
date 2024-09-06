// src/pages/EditBlogPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import BlogForm from "../components/blog/BlogForm";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === id)
  );

  const handleSubmit = () => {
    navigate(`/blog/${id}`);
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container maxWidth="md">
      <BlogForm blog={blog} onSubmit={handleSubmit} />
    </Container>
  );
};

export default EditBlogPage;

// src/pages/CreateBlogPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import BlogForm from "../components/blog/BlogForm";

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <BlogForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default CreateBlogPage;

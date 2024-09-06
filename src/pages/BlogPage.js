// src/pages/BlogPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { formatDate } from "../utils/dateUtils";
import { deleteBlog } from "../redux/slices/blogSlice";

const TruncatedTypography = styled(Typography)({
  overflowWrap: "break-word",
  wordWrap: "break-word",
  hyphens: "auto",
});

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === id)
  );

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    dispatch(deleteBlog(id));
    navigate("/");
  };

  if (!blog) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4">Blog not found</Typography>
      </Container>
    );
  }

  const displayDate = blog.createdAt
    ? formatDate(blog.createdAt)
    : "Date not available";

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <TruncatedTypography variant="h3" component="h1" gutterBottom>
          {blog.title}
        </TruncatedTypography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {displayDate} | {blog.author || "Unknown author"}
        </Typography>
        {blog.image && (
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: 400,
              objectFit: "cover",
              mb: 3,
            }}
            src={blog.image}
            alt={blog.title}
          />
        )}
        <TruncatedTypography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </Paper>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Container>
  );
};

export default BlogPage;

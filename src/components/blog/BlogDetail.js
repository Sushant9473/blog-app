import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Box } from "@mui/material";
import { formatDate } from "../../utils/dateUtils";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((b) => b.id === id)
  );

  if (!blog) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4">Blog not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {formatDate(blog.publicationDate)} | {blog.author}
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
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </Paper>
    </Container>
  );
};

export default BlogDetail;

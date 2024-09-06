// src/components/blog/BlogSearch.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { truncateString } from "../../utils/blogUtils";

const TruncatedListItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "& .MuiListItemText-secondary": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const BlogSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const blogs = useSelector((state) => state.blogs.blogs);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Search Blogs
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List>
        {filteredBlogs.map((blog) => (
          <ListItem
            button
            component={Link}
            to={`/blog/${blog.id}`}
            key={blog.id}
          >
            <TruncatedListItemText
              primary={truncateString(blog.title, 50)}
              secondary={truncateString(blog.content, 100)}
              primaryTypographyProps={{ title: blog.title }}
              secondaryTypographyProps={{ title: blog.content }}
            />
          </ListItem>
        ))}
      </List>
      {searchTerm && filteredBlogs.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No results found.
        </Typography>
      )}
    </Paper>
  );
};

export default BlogSearch;

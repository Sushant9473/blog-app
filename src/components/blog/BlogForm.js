// src/components/blog/BlogForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, updateBlog } from "../../redux/slices/blogSlice";
import { addCategory } from "../../redux/slices/categorySlice";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DEFAULT_BLOG_IMAGE = "https://source.unsplash.com/random/800x600/?blog";
const DEFAULT_AVATAR = "https://source.unsplash.com/random/200x200/?avatar";

const BlogForm = ({ blog, onSubmit }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    content: blog?.content || "",
    author: blog?.author || "",
    category: blog?.category || "",
    image: blog?.image || "",
    authorAvatar: blog?.authorAvatar || "",
  });
  const [openNewCategoryDialog, setOpenNewCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, authorAvatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      ...formData,
      image: formData.image || DEFAULT_BLOG_IMAGE,
      authorAvatar: formData.authorAvatar || DEFAULT_AVATAR,
    };
    if (blog) {
      dispatch(updateBlog({ id: blog.id, ...blogData }));
    } else {
      dispatch(addBlog(blogData));
    }
    onSubmit();
  };

  const handleOpenNewCategoryDialog = () => {
    setOpenNewCategoryDialog(true);
  };

  const handleCloseNewCategoryDialog = () => {
    setOpenNewCategoryDialog(false);
    setNewCategory("");
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj = {
        id: Date.now().toString(),
        name: newCategory.trim(),
      };
      dispatch(addCategory(newCategoryObj));
      setFormData((prev) => ({ ...prev, category: newCategoryObj.id }));
      handleCloseNewCategoryDialog();
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {blog ? "Edit Blog Post" : "Create New Blog Post"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Blog Title"
          name="title"
          autoFocus
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="author"
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={formData.category}
            label="Category"
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
            <MenuItem value="new" onClick={handleOpenNewCategoryDialog}>
              <em>Add New Category</em>
            </MenuItem>
          </Select>
        </FormControl>

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="blog-image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="blog-image-upload">
          <Button variant="contained" component="span" sx={{ mt: 2, mb: 2 }}>
            Upload Blog Image
          </Button>
        </label>
        {formData.image && (
          <Box mt={2}>
            <img
              src={formData.image}
              alt="Blog preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </Box>
        )}

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="avatar-upload"
          type="file"
          onChange={handleAvatarUpload}
        />
        <label htmlFor="avatar-upload">
          <Button
            variant="contained"
            component="span"
            sx={{ mt: 2, mb: 2, ml: 2 }}
          >
            Upload Avatar
          </Button>
        </label>
        {formData.authorAvatar && (
          <Box mt={2}>
            <img
              src={formData.authorAvatar}
              alt="Avatar preview"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </Box>
        )}

        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Content
        </Typography>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {blog ? "Update Blog Post" : "Create Blog Post"}
        </Button>
      </Box>

      <Dialog
        open={openNewCategoryDialog}
        onClose={handleCloseNewCategoryDialog}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-category"
            label="New Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewCategoryDialog}>Cancel</Button>
          <Button onClick={handleAddNewCategory}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogForm;

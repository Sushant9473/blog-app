// src/components/category/CategoryList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCategoryAndBlogs } from "../../redux/slices/categorySlice";
import CategoryForm from "./CategoryForm";

const CategoryList = () => {
  const [open, setOpen] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = React.useState(null);
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const handleClickOpen = (category) => {
    setOpen(true);
    setCategoryToDelete(category);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryToDelete(null);
  };

  const handleDelete = () => {
    if (categoryToDelete) {
      dispatch(removeCategoryAndBlogs(categoryToDelete.id));
    }
    handleClose();
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleClickOpen(category)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
      {categories.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No categories available.
        </Typography>
      )}
      <CategoryForm />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Category?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category? All blogs associated
            with this category will also be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CategoryList;

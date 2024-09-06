// src/components/blog/BlogCard.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  SvgIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import useTheme from "../../hooks/useTheme";

const DEFAULT_AVATAR = "https://source.unsplash.com/random/200x200/?avatar";

const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const BlogCard = ({ blog }) => {
  const { darkMode, theme } = useTheme();
  const categories = useSelector((state) => state.categories.categories);
  const category = categories.find((cat) => cat.id === blog.category);
  const [imageError, setImageError] = useState(!blog.image);

  const handleImageError = () => {
    console.error("Failed to load image:", blog.image);
    setImageError(true);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode ? "#1e1e1e" : theme.palette.background.paper,
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: darkMode
            ? "0 8px 16px rgba(255,255,255,0.1)"
            : "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
      {!imageError ? (
        <CardMedia
          component="img"
          height="140"
          image={blog.image}
          alt={blog.title}
          onError={handleImageError}
          sx={{
            objectFit: "cover",
            width: "100%",
          }}
        />
      ) : (
        <Box
          sx={{
            height: 140,
            backgroundColor: darkMode ? "#2c2c2c" : "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SvgIcon
            sx={{ fontSize: 60, color: darkMode ? "#4a4a4a" : "#9e9e9e" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </SvgIcon>
        </Box>
      )}
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            color: darkMode ? "#ffffff" : theme.palette.text.primary,
            mb: 2,
          }}
        >
          {blog.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            color: darkMode ? "#b0b0b0" : theme.palette.text.secondary,
          }}
        >
          {truncate(stripHtml(blog.content), 100)}
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Chip
            label={category ? category.name : "Uncategorized"}
            size="small"
            sx={{
              mr: 1,
              mb: 1,
              backgroundColor: darkMode ? "#333333" : "#e0e0e0",
              color: darkMode ? "#ffffff" : theme.palette.text.primary,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: darkMode ? "#b0b0b0" : theme.palette.text.secondary,
            }}
          >
            {formatDate(blog.createdAt)}
          </Typography>
        </Box>
      </CardContent>
      <Box
        sx={{
          p: 2,
          pt: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={blog.authorAvatar || DEFAULT_AVATAR}
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Typography
            variant="subtitle2"
            sx={{ color: darkMode ? "#ffffff" : theme.palette.text.primary }}
          >
            {blog.author}
          </Typography>
        </Box>
        <Button
          component={Link}
          to={`/blog/${blog.id}`}
          size="small"
          sx={{
            color: darkMode
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          }}
        >
          Read More
        </Button>
      </Box>
    </Card>
  );
};

export default BlogCard;

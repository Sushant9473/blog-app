// src/redux/slices/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialBlogs = [
  {
    id: uuidv4(),
    title: "Getting Started with React",
    content:
      "<p>React is a popular JavaScript library for building user interfaces. In this blog post, we'll cover the basics of React and how to set up your first React application.</p><p>React's component-based architecture makes it easy to build scalable and maintainable web applications. We'll dive into concepts like JSX, state, and props.</p>",
    author: "Jane Doe",
    category: "technology",
    image: "https://source.unsplash.com/random/800x600/?react",
    authorAvatar: "https://source.unsplash.com/random/200x200/?woman",
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: uuidv4(),
    title: "The Art of Productive Remote Work",
    content:
      "<p>As remote work becomes increasingly common, it's important to develop strategies for staying productive outside of a traditional office environment. This post explores various techniques to maintain focus and efficiency while working from home.</p><p>We'll discuss creating a dedicated workspace, establishing a routine, and utilizing tools for effective communication with your team.</p>",
    author: "John Smith",
    category: "productivity",
    image: "https://source.unsplash.com/random/800x600/?workspace",
    authorAvatar: "https://source.unsplash.com/random/200x200/?man",
    createdAt: new Date("2024-02-01").toISOString(),
  },
  {
    id: uuidv4(),
    title: "Exploring the Wonders of Machine Learning",
    content:
      "<p>Machine Learning is revolutionizing various industries, from healthcare to finance. This blog post provides an overview of key Machine Learning concepts and their real-world applications.</p><p>We'll explore supervised and unsupervised learning, neural networks, and the ethical considerations surrounding AI and Machine Learning.</p>",
    author: "Alice Johnson",
    category: "technology",
    image: "https://source.unsplash.com/random/800x600/?ai",
    authorAvatar: "https://source.unsplash.com/random/200x200/?woman",
    createdAt: new Date("2024-02-15").toISOString(),
  },
];

const initialState = {
  blogs: initialBlogs,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      const newBlog = {
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.blogs.push(newBlog);
    },
    updateBlog: (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs[index] = { ...state.blogs[index], ...action.payload };
      }
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;

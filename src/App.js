// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/create" element={<CreateBlogPage />} />
            <Route path="/edit/:id" element={<EditBlogPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;

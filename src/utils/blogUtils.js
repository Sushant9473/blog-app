// src/utils/blogUtils.js

export const truncateString = (str, length) => {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + "...";
};

export const extractPreview = (content, previewLength = 150) => {
  if (!content) return "";
  // Remove any HTML tags
  const plainText = content.replace(/<[^>]+>/g, "");
  return truncateString(plainText, previewLength);
};

export const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const calculateReadingTime = (text, wordsPerMinute = 200) => {
  const words = text.trim().split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  return Math.ceil(minutes);
};

// src/utils/dateUtils.js

export const formatDate = (dateString) => {
  if (!dateString) return "Date not available";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

export const timeAgo = (dateString) => {
  if (!dateString) return "Time not available";
  const now = new Date();
  const past = new Date(dateString);
  if (isNaN(past.getTime())) return "Invalid date";
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = now - past;

  if (elapsed < msPerMinute) {
    return "just now";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
};

export const sortByDate = (arr, dateKey, ascending = false) => {
  return arr.sort((a, b) => {
    const dateA = new Date(a[dateKey]);
    const dateB = new Date(b[dateKey]);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

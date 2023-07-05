const User = require("../models/user");

const fetchUserCategories = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      return user.categories;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchUrl = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${error.message}`);
  }
};

module.exports = { fetchUserCategories, fetchUrl };

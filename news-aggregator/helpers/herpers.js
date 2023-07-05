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

module.exports = {fetchUserCategories};
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const User = require("../models/user");

const getNewsPreferences = async (req, res) => {};

const updateNewsPreferences = async (req, res) => {

  // Add a category to the user's "categories" field
  User.updateOne(
    { email: userEmail },
    { $addToSet: { categories: req.body.category } }
  )
    .then((result) => {
      console.log("Category added to user:", result);
    })
    .catch((error) => {
      console.error("Error occurred while adding category:", error);
    });
};

const getNewsBasedOnUserPreference = async (req, res) => {};

//----------- Optional -------------//

const markNewsAsRead = async (req, res) => {};

const markNewsAsFavorite = async (req, res) => {};

const findArticlesBasedOnKeyword = async (req, res) => {};

module.exports = {
  getNewsPreferences,
  updateNewsPreferences,
  getNewsBasedOnUserPreference,
  markNewsAsRead,
  markNewsAsFavorite,
  findArticlesBasedOnKeyword,
};

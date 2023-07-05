const path = require("path");
const fs = require("fs");
const { json } = require("express");
const User = require("../models/user");
const {fetchUserCategories} = require("../helpers/herpers")

const getNewsPreferences = async (req, res) => {
  if (!req.user && req.message === null) {
    return res.status(403).json({
      message: "Invalid JWT Token",
    });
  } else if (!req.user && req.message !== null) {
    return res.status(403).json({
      message: req.message,
    });
  }

  try {
    const userId = req.user.id;
    const categories = await fetchUserCategories(userId);
    res.status(200).json({ categories });
    // Handle the categories array as needed
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
    // Handle the error
  }
};

const updateNewsPreferences = async (req, res) => {
  if (!req.user && req.message === null) {
    return res.status(403).json({
      message: "Invalid JWT Token",
    });
  } else if (!req.user && req.message !== null) {
    return res.status(403).json({
      message: req.message,
    });
  }

  const user = await User.findById(req.user.id);
  user.categories.push(req.body.category);
  user
    .save()
    .then((data) => {
      res.status(200).json({
        message: `Category added to user: ${data}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error occurred while adding category: ${err}`,
      });
    });
};

const getNewsBasedOnUserPreference = async (req, res) => {
  if (!req.user && req.message === null) {
    return res.status(403).json({
      message: "Invalid JWT Token",
    });
  } else if (!req.user && req.message !== null) {
    return res.status(403).json({
      message: req.message,
    });
  }

  try {
    const userId = req.user.id;
    const categories = await fetchUserCategories(userId);
    res.status(200).json({ categories });
    // Handle the categories array as needed
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
    // Handle the error
  }
};

//----------- Optional -------------//

const markNewsAsRead = async (req, res) => {
  res.status(201).send("Working on It!")
};

const markNewsAsFavorite = async (req, res) => {
  res.status(201).send("Working on It!")
};

const findArticlesBasedOnKeyword = async (req, res) => {
  res.status(201).send("Working on It!")
};

module.exports = {
  getNewsPreferences,
  updateNewsPreferences,
  getNewsBasedOnUserPreference,
  markNewsAsRead,
  markNewsAsFavorite,
  findArticlesBasedOnKeyword,
};

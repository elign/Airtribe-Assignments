const path = require("path");
const fs = require("fs");
// const { json } = require("express");
const User = require("../models/user");
const { fetchUserCategories, fetchUrl } = require("../helpers/helpers");

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
    const result = [];
    const promises = categories.map(function (category) {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=8ba3722b85da48ba9c22688d7035ce78`;
      return fetchUrl(url)
        .then((data) => {
          // Process the fetched data
          result.push(...data.articles);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch request
          console.error(error);
          throw error;
        });
    });

    Promise.all(promises)
      .then(() => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

//----------- Optional -------------//

const markNewsAsRead = async (req, res) => {
  res.status(201).send("Working on It!");
};

const markNewsAsFavorite = async (req, res) => {
  res.status(201).send("Working on It!");
};

const findArticlesBasedOnKeyword = async (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?q=${req.params.keyword}&apiKey=8ba3722b85da48ba9c22688d7035ce78
  `;
  return fetchUrl(url)
    .then((data) => {
      // Process the fetched data
      res.status(200).json({ data });
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch request
      res.status(500).json({ error });
    });
};

module.exports = {
  getNewsPreferences,
  updateNewsPreferences,
  getNewsBasedOnUserPreference,
  markNewsAsRead,
  markNewsAsFavorite,
  findArticlesBasedOnKeyword,
};

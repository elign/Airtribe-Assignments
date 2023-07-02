const path = require("path");
const fs = require("fs");
const { json } = require("express");

const getNewsPreferences = async (req, res) => {};

const updateNewsPreferences = async (req, res) => {};

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

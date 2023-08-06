const City = require("../models/CityModel");
const Theatre = require("../models/TheatreModel");
const MovieLanguage = require("../models/MovieLanguageModel");
const ShowFeature = require("../models/ShowFeatureModel");
const Movie = require("../models/MovieModel");
const ShowModel = require("../models/ShowModel");

const getListOfAllCities = async (req, res) => {
  res.json("Testing the flow");
};

const getAllTheatresInTheCity = async (req, res) => {
  res.json("Testing the flow");
};

const getAllShowsOnTheGivenDate = async (req, res) => {
  res.json("Testing the flow");
};

module.exports = {
  getListOfAllCities,
  getAllTheatresInTheCity,
  getAllShowsOnTheGivenDate,
};

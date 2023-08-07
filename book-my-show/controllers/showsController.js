const City = require("../models/CityModel");
const Theatre = require("../models/TheatreModel");
const MovieLanguage = require("../models/MovieLanguageModel");
const ShowFeature = require("../models/ShowFeatureModel");
const Movie = require("../models/MovieModel");
const ShowModel = require("../models/ShowModel");
const { Op } = require("sequelize");

const getListOfAllCities = async (req, res) => {
  try {
    const cities = await City.findAll();
    console.log(cities);
    return res.status(200).json(cities);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getAllTheatresInTheCity = async (req, res) => {
  try {
    const cityId = req.params.city;

    const theatres = await Theatre.findAll({
      where: {
        city_id: cityId,
      },
    });

    return res.status(200).json(theatres);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getAllShowsOnTheGivenDate = async (req, res) => {
  try {
    const theatreId = req.params.theatre;
    const desiredDate = req.params.date;

    // Find all shows on the given date for the specified theatre
    const shows = await ShowModel.findAll({
      where: {
        theatre_id: theatreId,
        show_date: {
          [Op.eq]: desiredDate,
        },
      },
      include: [
        {
          model: Movie,
          attributes: ["movie_name"],
        },
        {
          model: Theatre,
          attributes: ["theatre_name"],
        },
        {
          model: City,
          attributes: ["city_name"],
        },
        {
          model: MovieLanguage,
          attributes: ["language"],
        },
        {
          model: ShowFeature,
          attributes: ["feature"],
        },
      ],
    });

    return res.status(200).json(shows);
  } catch (err) {
    console.log(err);
    return res.json(500).json("Internal Server Error!");
  }
};

module.exports = {
  getListOfAllCities,
  getAllTheatresInTheCity,
  getAllShowsOnTheGivenDate,
};

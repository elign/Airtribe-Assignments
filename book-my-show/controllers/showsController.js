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
    const cityToFind = req.params.city;
    const city = await City.findOne({
      where: {
        city_name: cityToFind,
      },
    });

    if (!city) {
      return res.status(404).json({ error: "No theatres in the City" });
    }

    const theatres = await Theatre.findAll({
      where: {
        city_id: city.city_id,
      },
    });

    return res.status(200).json(theatres);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getAllShowsOnTheGivenDate = async (req, res) => {
  try {
    const cityToFind = req.params.city;
    const theatreToFind = req.params.theatre;
    const dateToFind = req.params.date;

    const city = await City.findOne({
      where: {
        city_name: cityToFind,
      },
    });

    if (!city) {
      return res.status(404).json({ error: "No theatres in the City" });
    }

    // / Find the theatre ID based on the theatreName and city ID
    const theatre = await Theatre.findOne({
      where: {
        theatre_name: theatreToFind,
      },
    });

    if (!theatre) {
      return res.send(`Theatre '${theatreName}' not found in '${cityName}'.`);
    }

    // Find all shows on the given date for the specified theatre
    const shows = await ShowModel.findAll({
      where: {
        theatre_id: theatre.theatre_id,
        show_time: {
          [Op.gte]: new Date(dateToFind), // Show time greater than or equal to the desired date
          [Op.lt]: new Date(
            new Date(dateToFind).getTime() + 24 * 60 * 60 * 1000
          ), // Show time less than the next day
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

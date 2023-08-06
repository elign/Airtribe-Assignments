const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./dbconfig");
const app = express();
const port = process.env.PORT || 4000;
const showsRouter = require("./routes/showsRouter");

const City = require("./models/CityModel");
const Theatre = require("./models/TheatreModel");
const MovieLanguage = require("./models/MovieLanguageModel");
const ShowFeature = require("./models/ShowFeatureModel");
const Movie = require("./models/MovieModel");
const Show = require("./models/ShowModel");

app.use(cors());
app.use(bodyParser.json());

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // Sample data for cities
    const sampleCities = [
      { city_name: "Jaipur" },
      { city_name: "Delhi" },
      { city_name: "Mumbai" },
      { city_name: "Bangalore" },
      { city_name: "Kolkata" },
      { city_name: "Chennai" },
      { city_name: "Pune" },
    ];
    // Add sample data to the City table using bulkCreate
    const cities = await City.bulkCreate(sampleCities);

    // Sample theatres for each city
    const theatresData = [];

    let count = 1;
    for (let i = 0; i < cities.length; i++) {
      for (let j = 1; j < 5; j++) {
        theatresData.push({
          theatre_name: `Theatre${j * count++}`,
          city_id: cities[i].city_id,
        });
      }
    }
    // Add sample theatres to the Theatre table
    const theatres = await Theatre.bulkCreate(theatresData);

    // Sample data for movie languages
    const sampleLanguages = [
      { language: "English" },
      { language: "Hindi" },
      { language: "Tamil" },
      { language: "Telugu" },
    ];
    // Add sample data to the MovieLanguage table using bulkCreate
    const languages = await MovieLanguage.bulkCreate(sampleLanguages);

    // Sample data for movie languages
    const sampleFeatures = [
      { feature: "4K Dolby 7.1" },
      { feature: "4K ATMOS enabled" },
      { feature: "Dolby 7.1" },
      { feature: "Playhouse 4K" },
    ];
    // Add sample data to the ShowFeature table using bulkCreate
    const showFeatures = await ShowFeature.bulkCreate(sampleFeatures);

    // Sample movies
    const sampleMovies = [
      {
        movie_name: "Movie A",
        dimension: "2D",
        language: languages[0].language_id,
      },
      {
        movie_name: "Movie B",
        dimension: "3D",
        language: languages[1].language_id,
      },
      {
        movie_name: "Movie C",
        dimension: "2D",
        language: languages[2].language_id,
      },
      {
        movie_name: "Movie D",
        dimension: "2D",
        language: languages[0].language_id,
      },
      {
        movie_name: "Movie E",
        dimension: "3D",
        language: languages[3].language_id,
      },
      {
        movie_name: "Movie A",
        dimension: "2D",
        language: languages[0].language_id,
      },
      {
        movie_name: "Movie B",
        dimension: "3D",
        language: languages[3].language_id,
      },
      {
        movie_name: "Movie C",
        dimension: "2D",
        language: languages[2].language_id,
      },
      {
        movie_name: "Movie D",
        dimension: "2D",
        language: languages[0].language_id,
      },
      {
        movie_name: "Movie E",
        dimension: "3D",
        language: languages[1].language_id,
      },
    ];
    // Add sample movies to the Movie table
    const movies = await Movie.bulkCreate(sampleMovies);

    // Sample show data (randomly selecting movie, theatre, show time, language, and show feature)
    const sampleShows = [];
    const numberOfShows = 100;
    const showTimes = [
      "2023-08-03 9:00 AM",
      "2023-08-03 12:00 PM",
      "2023-08-03 3:00 PM",

      "2023-08-04 9:30 AM",
      "2023-08-04 1:00 PM",
      "2023-08-04 4:30 PM",

      "2023-08-05 10:00 AM",
      "2023-08-05 1:30 PM",
      "2023-08-05 5:00 PM",

      "2023-08-06 11:00 AM",
      "2023-08-06 2:00 PM",
      "2023-08-06 6:00 PM",

      "2023-08-07 10:30 AM",
      "2023-08-07 2:30 PM",
      "2023-08-07 5:30 PM",

      "2023-08-08 11:30 AM",
      "2023-08-08 3:30 PM",
      "2023-08-08 6:30 PM",

      "2023-08-09 10:00 AM",
      "2023-08-09 2:00 PM",
      "2023-08-09 5:00 PM",
    ];

    for (let i = 0; i < numberOfShows; i++) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      const randomTheatre =
        theatres[Math.floor(Math.random() * theatres.length)];
      const randomShowTime =
        showTimes[Math.floor(Math.random() * showTimes.length)];
      const randomLanguage =
        languages[Math.floor(Math.random() * languages.length)];
      const randomShowFeature =
        showFeatures[Math.floor(Math.random() * showFeatures.length)];

      sampleShows.push({
        movie_id: randomMovie.movie_id,
        theatre_id: randomTheatre.theatre_id,
        show_time: randomShowTime,
        show_language_id: randomLanguage.language_id,
        show_feature_id: randomShowFeature.feature_id,
      });
    }
    // Add sample shows to the Show table
    Show.bulkCreate(sampleShows);
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
})();

app.listen(port, () => console.log(`Sadhna app listening on port ${port}!`));
app.use(express.json());

app.use("/", showsRouter);

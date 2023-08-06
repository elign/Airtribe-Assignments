const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./dbconfig");
const app = express();
const port = process.env.PORT || 4000;
const showsRouter = require("./routes/showsRouter");

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
    await City.bulkCreate(sampleCities);

    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
})();

app.listen(port, () => console.log(`Sadhna app listening on port ${port}!`));
app.use(express.json());

app.use("/", showsRouter);

const {getListOfAllCities, getAllTheatresInTheCity, getAllShowsOnTheGivenDate } = require('../controllers/showsController');
const router = require('express').Router();

router.get('/cities', getListOfAllCities);
router.get('/:city/theatres', getAllTheatresInTheCity);
router.get('/theatres/:theatre/:date', getAllShowsOnTheGivenDate);

module.exports = router;
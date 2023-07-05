const router = require("express").Router();
const {
  getNewsPreferences,
  updateNewsPreferences,
  getNewsBasedOnUserPreference,
  markNewsAsRead,
  markNewsAsFavorite,
  findArticlesBasedOnKeyword,
} = require("../controllers/news");

// Middleware to verify Token
const { verifyToken } = require("../middleware/authJWT");

const { registerNewUser, loginUser } = require("../controllers/auth");

router.route("/register").post(registerNewUser);

router.route("/login").post(loginUser);

router
  .route("/preferences")
  .get(verifyToken, getNewsPreferences)
  .put(verifyToken, updateNewsPreferences);

router.route("/news").get(verifyToken, getNewsBasedOnUserPreference);

router.route("/news/:id/read").post(markNewsAsRead);

router.route("/news/:id/favorite").post(markNewsAsFavorite);

router.route("/news/search/:keyword").get(verifyToken, findArticlesBasedOnKeyword);

module.exports = router;

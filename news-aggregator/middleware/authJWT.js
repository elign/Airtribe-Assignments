// It will verify the Token

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    try {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.API_SECRET,
        function (err, decode) {
          console.log(err);
          if (err) {
            req.user = undefined;
            next();
          }

          User.findOne({
            _id: decode.id,
          })
            .then((user) => {
              req.user = user;
              next();
            })
            .catch((err) => {
              //not the right way of handling error, doing it just for the sake of understanding
              res.status(500).send({
                message: err,
              });
            });
        }
      );
    } catch (err) {
      console.log(err);
      req.user = undefined;
      req.message = "Malformed JWT Token";
      next();
    }
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};

module.exports = {
  verifyToken,
};

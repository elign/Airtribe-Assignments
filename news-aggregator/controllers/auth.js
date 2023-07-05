const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const registerNewUser = async (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
    categories: [],
  });

  user
    .save()
    .then((data) => {
      res.status(200).send({
        message: "User registered successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err,
      });
    });
};

const loginUser = async (req, res) => {
  // Check if User already exist
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // if user not found
      if (!user) {
        return res.status(404).send({
          accessToken: null,
          message: "User not found",
        });
      }

      // User exists

      // Password Comparison
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.send(404).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }

      var token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );

      return res.status(200).send({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        },
        message: "Login Successful",
        accessToken: token,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err,
      });
    });
};

module.exports = {
  registerNewUser,
  loginUser,
};

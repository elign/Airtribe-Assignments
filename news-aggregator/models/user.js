const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name not entered"],
  },

  email: {
    type: String,
    unique: [true, "Email already exist in the Database"],
    lowercase: true,
    trim: true,
    required: [true, "Email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Email provided is incorrect",
    },
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, "Please specify user role"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  categories: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model("User", userSchema);

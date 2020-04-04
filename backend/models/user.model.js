const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//only one field to the schema followed by validations
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, //trims whitespace of the end
      minlength: 3,
    },
  },
  {
    timestamps: true, //fields for when created and modified
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

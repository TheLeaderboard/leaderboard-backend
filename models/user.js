const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual("managed_leagues", {
  ref: "League",
  localField: "_id",
  foreignField: "commissioner"
})

module.exports = User = mongoose.model("users", UserSchema);
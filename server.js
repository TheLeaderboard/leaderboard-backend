const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const leagues = require("./routes/api/leagues");
const game_definitions = require("./routes/api/game_definitions");
const authMiddleware = require("./middleware/authentication");

const app = express();

//Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// cors middleware
app.use(cors());

//DB config
const db = process.env.MONGO_URI;

//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true}
  )
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch(err => {
    console.log(err);
  });

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/leagues", authMiddleware.checkToken, leagues);
app.use("/api/gameDefinitions", authMiddleware.checkToken, game_definitions);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
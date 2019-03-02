const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// cors middleware
app.use(cors());

// DB config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((err) => {
    console.log(err);
  });
// load models
require("./models/user");
require("./models/game_definition");
require("./models/invitation");
require("./models/league");
require("./models/season");
require("./models/team");
require("./models/game");

const users = require("./routes/api/users");
const leagues = require("./routes/api/leagues");
const gameDefinitions = require("./routes/api/game_definitions");
const invitations = require("./routes/api/invitations");
const teams = require("./routes/api/teams");
const games = require("./routes/api/games");
const authMiddleware = require("./middleware/authentication");

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/leagues", authMiddleware.checkToken, leagues);
app.use("/api/gameDefinitions", authMiddleware.checkToken, gameDefinitions);
app.use("/api/invitations", authMiddleware.checkToken, invitations);
app.use("/api/teams", authMiddleware.checkToken, teams);
app.use("/api/games", authMiddleware.checkToken, games);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

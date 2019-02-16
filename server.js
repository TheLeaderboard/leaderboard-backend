const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

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
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch(err => {
    console.log(err);
  });
// load models
require("./models/user");
require("./models/game_definition");
require("./models/invitation");
require("./models/league");

const users = require("./routes/api/users");
const leagues = require("./routes/api/leagues");
const game_definitions = require("./routes/api/game_definitions");
const invitations = require("./routes/api/invitations");
const authMiddleware = require("./middleware/authentication");

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/leagues", authMiddleware.checkToken, leagues);
app.use("/api/gameDefinitions", authMiddleware.checkToken, game_definitions);
app.use("/api/invitations", authMiddleware.checkToken, invitations);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
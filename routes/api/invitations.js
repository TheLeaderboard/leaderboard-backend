const express = require("express");
const router = express.Router();


// @route POST /api/invitations/create
// @desc Create invitations for league or team
// @access Public
router.post("/create", (req, res) => {
  console.log("Create invitation");
  res.json({
    success: false,
    message: "This route isn't complete yet"
  });
});

module.exports = router;
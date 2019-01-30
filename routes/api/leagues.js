const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  console.log("Authenticated");
  console.log(req);
});

module.exports = router;
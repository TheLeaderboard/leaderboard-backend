const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers.authorization || "";
  if (token.startsWith("Bearer ")) {
    // remove bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.SECRET_OR_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      }
      // no errors
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
}

module.exports = {
  checkToken,
};
